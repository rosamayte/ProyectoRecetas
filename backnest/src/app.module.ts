import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RecipesModule, 
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27.0.17/recipes', 
    {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}), UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
