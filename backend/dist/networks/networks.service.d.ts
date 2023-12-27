import { HttpService } from '@nestjs/axios';
export declare class NetworksService {
    private httpService;
    constructor(httpService: HttpService);
    findAll(name?: string, city?: string): Promise<any>;
    countStationsByCountry(country: string): Promise<number>;
}
