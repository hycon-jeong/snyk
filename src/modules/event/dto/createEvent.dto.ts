import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  readonly eventType: string;
  @IsNotEmpty()
  readonly eventContent: string;
}
