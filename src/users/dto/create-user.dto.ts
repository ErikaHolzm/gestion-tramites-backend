import {
  IsEmail,
  //IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  surname!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  number!: string;

  //@IsEnum(['user', 'admin'])
  //@IsNotEmpty()
  //role!: string;
  // ⬆ comentado hasta que se implementen grupos con admin
}
