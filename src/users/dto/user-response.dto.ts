import { Exclude } from 'class-transformer';

export class UserResponseDto {
  _id!: string;

  name!: string;

  surname!: string;

  email!: string;

  @Exclude()
  password!: string;

  number!: string;

  role!: string;
}
