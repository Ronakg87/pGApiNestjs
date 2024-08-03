import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
    private stripe: Stripe;
    private readonly logger = new Logger(SubscriptionService.name);

    constructor(private configService: ConfigService){
        const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
        // console.log('Stripe Secret Key:', secretKey); // Add this line to debug
        if (!secretKey) {
            this.logger.error('Stripe secret key is not defined');
            throw new Error('Stripe secret key is not defined');
        }
        this.stripe = new Stripe(secretKey, {
            apiVersion: '2024-06-20',
        });
    }

    // async createPaymentIntent( amount: number, currency: string) {
    //     try {
    //         const paymentIntent = await this.stripe.paymentIntents.create({
    //             amount,
    //             currency
    //         });
    //         return paymentIntent;
    //     } catch (error) {
    //         this.logger.error('Error creating payment intent', error);
    //         throw error;
    //     }
    // }

    async createCheckoutSession(amount: number, currency: string, successUrl: string, cancelUrl: string) {
        try {
          const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency,
                  product_data: {
                    name: 'Subscription',
                  },
                  unit_amount: amount,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
          });
          return session;
        } catch (error) {
          this.logger.error('Error creating checkout session', error);
          throw error;
        }
      }
}
