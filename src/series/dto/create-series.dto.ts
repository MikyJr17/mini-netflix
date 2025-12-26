import { IsString } from "class-validator";

export class CreateSeriesDto {
    @IsString()
    titulo: string;

    @IsString()
    genero: string;

    @IsString()
    sinopsis: string;

    @IsString()
    urlPortada: string;
}
