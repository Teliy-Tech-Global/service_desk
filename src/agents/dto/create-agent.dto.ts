import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAgentDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  department: string;
}
