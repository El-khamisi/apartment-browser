import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class GlobalModule {}
