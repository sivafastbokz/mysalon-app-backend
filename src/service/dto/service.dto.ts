import { IsString,IsNumber, IsOptional } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    serviceImage: string;

    @IsString()
    serviceName: string;

    @IsNumber()
    servicePrice: number;
}

export class UpdateServiceDto {
    @IsString()
    @IsOptional()
    serviceImage: string;

    @IsString()
    @IsOptional()
    serviceName: string;

    @IsNumber()
    @IsOptional()
    servicePrice: number;
}