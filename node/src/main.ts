import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { setupSwagger } from './Config/Swagger.config';
import { setupCors } from './Config/Cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  setupCors(app);
  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
