import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(nestApplication: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NLW heat')
    .setDescription('NLW heat app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(nestApplication, config);

  SwaggerModule.setup('api', nestApplication, document);
}
