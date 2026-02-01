import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    // En Docker no necesitas envFilePath; en local sí puedes usarlo si quieres.
    ConfigModule.forRoot({
      isGlobal: true,
      // Si quieres soporte local sin docker, puedes dejar:
      // envFilePath: ['.env', '../infra/.env'],
      // pero no es obligatorio si usarás compose.
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI') || process.env.MONGO_URI,
      }),
    }),

    CompaniesModule,

    SuppliersModule,

    OffersModule,
  ],
})
export class AppModule {}
