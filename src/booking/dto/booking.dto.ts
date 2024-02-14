import { IsString,IsNumber,IsOptional } from 'class-validator';

export class BookingDto {
    @IsOptional()
    userId:string;

    @IsString()
    bookingName: string;

    @IsOptional()
    @IsString()
    bookingDate: string;

    @IsOptional()
    @IsString()
    bookingTime: string;

    @IsOptional()
    bookedDate:string;
}