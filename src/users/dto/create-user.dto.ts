import { IsEmail, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/roles/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: Role,
    example: Role.User,
    description: 'Role assigned to the user',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for user authentication',
  })
  @IsString()
  password: string;
}
