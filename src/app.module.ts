import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthUserModule } from './Modules/AuthUser/AuthUser.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['info', 'query'],
        },
      },
    }),
    AuthUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
