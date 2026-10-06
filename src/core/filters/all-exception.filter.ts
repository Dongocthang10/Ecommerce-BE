import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Response, Request } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { buildApiErrorPayload, extractFromHttpExceptionBody, payloadFromUnknownException } from '../../shared/helpers/api-error-response.js';
@Catch()
@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: PinoLogger) {
        this.logger.setContext(AllExceptionFilter.name)
    }
    catch(exception: unknown, host: ArgumentsHost) {
        if(host.getType() != 'http') return;
        const httpCtx = host.switchToHttp();

        const req = httpCtx.getRequest<Request>();
        const res = httpCtx.getResponse<Response>();

        const ctx = {
            requestId: (req.headers['X-request-id'] as string) ?? '',
            path: req.url
        }

        if(exception instanceof HttpException) {
            const statusCode = exception.getStatus();
            const rawErrorResponse = exception.getResponse();
            
            if (typeof rawErrorResponse === 'string') {
                res.status(statusCode).json(buildApiErrorPayload(statusCode, rawErrorResponse, undefined,ctx));
                return;
            }

            const {message, error} = extractFromHttpExceptionBody(
                rawErrorResponse as Record<string, unknown>,
                exception.message
            )

            if (typeof rawErrorResponse === 'object') {
                res.status(statusCode).json(buildApiErrorPayload(statusCode, message, error, ctx))
                return;
            }


        }

        this.logger.error({
            msg: 'unhandled.exception',
            requestId: ctx.requestId,
            path: ctx.path,
            error: exception instanceof Error ? exception.message: "Unknown Exception",
            stack: exception instanceof Error ? exception.stack: undefined
        });

        const payload = payloadFromUnknownException(exception, ctx);
        res.status(payload.statusCode).json(payload);
        return;

    }
}