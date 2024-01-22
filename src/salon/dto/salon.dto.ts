import { IsNotEmpty, IsNumber, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsNumber()
    phoneNumber:number;

    @IsNotEmpty()
    @IsString()
    password:string;
}

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}