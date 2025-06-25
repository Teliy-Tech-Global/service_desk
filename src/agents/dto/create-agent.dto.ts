import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with the agent',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'IT Support',
    description: 'The department the agent belongs to',
  })
  @IsString()
  @IsNotEmpty()
  department: string;
}
