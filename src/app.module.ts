import { Module, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { StripeWebhookMiddleware } from './middleware/stripe.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SubscriptionModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StripeWebhookMiddleware)
      .forRoutes({ path: 'subscription/webhook', method: RequestMethod.POST });
  }
}
