import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class StripeWebhookMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl === '/webhook') {
        bodyParser.raw({ type: 'application/json' })(req, res, next);
        } else {
        bodyParser.json()(req, res, next);
        }
    }
}
