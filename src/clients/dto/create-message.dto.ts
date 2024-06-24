import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

 export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    text: string;
  
    @IsString()
    @IsNotEmpty()
    agent: string;

    @IsDateString()
    @IsNotEmpty()
    sentAt:Date;
}