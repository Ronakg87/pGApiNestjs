import { BadRequestException, Post, Body, Controller } from '@nestjs/common';
import { SubscriptionService } from './subscription.service'

@Controller('subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService){}

    // @Post('create-payment-intent')
    // async createPaymentIntent(@Body() createPaymentIntentDto: { amount: number, currency: string }) {
    //     const { amount, currency } = createPaymentIntentDto;
    //     if(!amount || !currency){
    //         throw new BadRequestException("Amount and Currency are Required");
    //     }
    //     return this.subscriptionService.createPaymentIntent(amount, currency);
    // }

    @Post('create-checkout-session')
    async createCheckoutSession(@Body() createCheckoutSessionDto: { amount: number; currency: string; successUrl: string; cancelUrl: string }) {
        const { amount, currency, successUrl, cancelUrl } = createCheckoutSessionDto;
        if (!amount || !currency || !successUrl || !cancelUrl) {
        throw new BadRequestException('Amount, currency, successUrl, and cancelUrl are required');
        }
        return this.subscriptionService.createCheckoutSession(amount, currency, successUrl, cancelUrl);
    }

}
