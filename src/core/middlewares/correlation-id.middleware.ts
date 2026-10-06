import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export const CORRELATION_ID_HEADER = 'x-request-id';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const existing = req.headers[CORRELATION_ID_HEADER] as string | undefined;

        const requestId = existing ?? crypto.randomUUID();

        req.headers[CORRELATION_ID_HEADER] = requestId;
        res.setHeader(CORRELATION_ID_HEADER, requestId);

        next();
    }
}