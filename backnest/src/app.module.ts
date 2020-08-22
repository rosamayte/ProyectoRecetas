import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RecipesModule, 
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/recipes', 
    {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
