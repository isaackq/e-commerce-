import { Paginated } from '@application/pagination/interfaces/paginated.interface';
import { Product } from '@domain/entities/Product';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ProductFilter, ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { ProductMapper } from '@infrastructure/mappers/product.mapper';
import { PaginationProvider } from '@infrastructure/providers/pagination.provider';
import { ProductDocument, Product as productSchema } from '@infrastructure/schemas/product.schema';
import { ProductCategory, ProductCategoryDocument } from '@infrastructure/schemas/products-categories.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('Product')
@Injectable(/*{ scope: Scope.REQUEST }*/)
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectModel(productSchema.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductCategory.name)
    private readonly ProductCategoryModel: Model<ProductCategoryDocument>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async save(product: Product): Promise<Product> {
    const existingProduct = await this.productModel.findOne({ name: product.name }).exec();

    if (existingProduct) {
      throw new ConflictException('A product with the same name already exists.');
    }

    const createdProduct = await this.productModel.create({
      ...product,
      category: product.category.id,
      admin: product.admin ? product.admin.id : '',
      seller: product.seller ? product.seller.id : '',
    });

    const populateFeilds = this.populateFeilds(createdProduct);
    return ProductMapper.map(await createdProduct.populate(populateFeilds));
  }

  async findOne(id: string): Promise<Product> {
    const productDocument = await this.productModel.findById(id).exec();

    if (!productDocument) {
      return null;
    }
    const populateFeilds = this.populateFeilds(productDocument);
    return ProductMapper.map(await productDocument.populate(populateFeilds));
  }

  private populateFeilds(productDocument: ProductDocument) {
    const populateFeilds = ['category'];
    if (productDocument.admin) {
      populateFeilds.push('admin');
    }
    if (productDocument.seller) {
      populateFeilds.push('seller');
    }
    return populateFeilds.join(' ');
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }

  async findMany(productFilter?: Partial<ProductFilter>, page?: number, limit?: number): Promise<Paginated<Product>> {
    const { params, sort, select } = await this.buildParams(productFilter);
    const paginated = await this.paginationProvider.paginateQuery<ProductDocument>(
      this.productModel,
      params,
      page,
      limit,
      sort,
      select,
    );

    return { ...paginated, data: paginated.data.map((data) => ProductMapper.map(data as any)) };
  }

  private async buildParams(productFilter?: Partial<ProductFilter>) {
    const params = {};
    let sort: any = { createdAt: -1 }; // defualt
    let select: any | undefined = undefined;

    if (productFilter) {
      const { category, status, seller, q } = productFilter;
      if (category) {
        const categories = await this.ProductCategoryModel.findOne({ category: productFilter.category });
        params['category'] = categories.id;
      }
      if (status) {
        params['status'] = status;
      }
      if (seller) {
        params['seller'] = seller;
      }
      if (q && typeof q === 'string') {
        params['$text'] = { $search: q };
        sort = { score: { $meta: 'textScore' }, createdAt: -1 }; // رتّب حسب التطابق ثم الأحدث// الي بطابق اكتر بياخد سكور اعلى
        select = { score: { $meta: 'textScore' } };
      }
    }

    return { params, sort, select };
  }

  async activePendingProduct(id: string, adminId: string): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { status: ProductStatusEnum.ACTIVE, admin: adminId },
      { new: true },
    );
    return ProductMapper.map(updatedProduct);
  }
}
