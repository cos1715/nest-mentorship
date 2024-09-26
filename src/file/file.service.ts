import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fastcsv from 'fast-csv';
import { Readable } from 'stream';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { EducationService } from '../education/education.service';

@Injectable()
export class FileService {
  constructor(
    private readonly educationService: EducationService,
    private readonly httpService: HttpService,
  ) {}
  async parseCSV(buffer: any): Promise<any[]> {
    const results = [];
    const stream = Readable.from(buffer.toString());
    return new Promise((resolve, reject) => {
      stream
        .pipe(fastcsv.parse({ headers: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  async generateCSV(): Promise<Buffer> {
    const educations = await this.educationService.findAll();
    const stream = Readable.from(educations);
    const chunks = [];
    const csvStream = fastcsv.format({ headers: true });

    stream.pipe(csvStream);

    return new Promise((resolve, reject) => {
      csvStream
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', (err) => reject(err));
    });
  }

  async getFromServer(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://dummyjson.com/products?limit=10').pipe(
        catchError((error: AxiosError) => {
          throw `An error happened! ${error.message}`;
        }),
      ),
    );

    return data.products;
  }
}
