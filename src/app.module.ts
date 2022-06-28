import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://brunovallim:<bru256300>@cluster0.ybst6.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
         useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
      },
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
