import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NetworksService {
    constructor(private httpService: HttpService) { }


    async findAll(name?: string, city?: string): Promise<any> {
        const response = await this.httpService.get('http://api.citybik.es/v2/networks').toPromise();
        let data = response.data;

        if (name) {
            data.networks = data.networks.filter(network =>
                network.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (city) {
            data.networks = data.networks.filter(network =>
                network.location.city.toLowerCase().includes(city.toLowerCase())
            );
        }

        return data;
    }

    async countStationsByCountry(country: string): Promise<number> {
        try {
            // Fetch data from the API
            const response = await this.httpService.get(`http://api.citybik.es/v2/networks/${country}`).toPromise();
            const networks = response.data;
            let stationCount = 0;
            if (networks && networks.network) {
                stationCount = networks.network.stations.length;
            }
            return stationCount;
        } catch (error) {
            console.error('Error counting stations:', error);
            throw error;
        }
    }
    
}
