import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './Modules/AuthUser/Auth.module';
import { MessagesModule } from './Modules/Messages/Messages.module';
import { UserModule } from './Modules/Users/User.module';
import { EventsGateway } from './Modules/Events/Events.gateway';

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
    AuthModule,
    UserModule,
    MessagesModule,
    EventsGateway,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
