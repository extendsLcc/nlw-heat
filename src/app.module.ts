import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
