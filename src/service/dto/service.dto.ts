import { IsString,IsNumber } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    serviceImage: string;

    @IsString()
    serviceName: string;

    @IsNumber()
    servicePrice: number;
}
