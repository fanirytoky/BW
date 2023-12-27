"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let NetworksService = class NetworksService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findAll(name, city) {
        const response = await this.httpService.get('http://api.citybik.es/v2/networks').toPromise();
        let data = response.data;
        if (name) {
            data.networks = data.networks.filter(network => network.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (city) {
            data.networks = data.networks.filter(network => network.location.city.toLowerCase().includes(city.toLowerCase()));
        }
        return data;
    }
    async countStationsByCountry(country) {
        try {
            const response = await this.httpService.get(`http://api.citybik.es/v2/networks/${country}`).toPromise();
            const networks = response.data;
            let stationCount = 0;
            if (networks && networks.network) {
                stationCount = networks.network.stations.length;
            }
            return stationCount;
        }
        catch (error) {
            console.error('Error counting stations:', error);
            throw error;
        }
    }
};
exports.NetworksService = NetworksService;
exports.NetworksService = NetworksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], NetworksService);
//# sourceMappingURL=networks.service.js.map