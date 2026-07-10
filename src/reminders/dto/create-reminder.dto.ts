import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaVencimiento!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;
}
