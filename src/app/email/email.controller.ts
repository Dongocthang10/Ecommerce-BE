import { Controller } from '@nestjs/common';
import { EmailService } from './email.service.js';

@Controller('internal/email')
export class InternalEmailController {
  constructor(private readonly emailService: EmailService) {}
}
