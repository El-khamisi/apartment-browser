import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import environment from './environment';
import { GlobalModule } from './global/global.module';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [environment],
        }),
        GlobalModule,
        ApartmentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
