import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NetworksService } from './networks/networks.service';
import { HttpModule } from '@nestjs/axios';
import { NetworksController } from './networks/networks.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController,NetworksController],
  providers: [AppService,NetworksService],
})
export class AppModule {}
