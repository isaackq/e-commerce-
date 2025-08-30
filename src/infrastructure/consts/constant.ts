import { MongooseModule } from '@nestjs/mongoose';

export const MongooseConnection = MongooseModule.forRoot('mongodb://localhost:27017/eco');
