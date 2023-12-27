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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksController = void 0;
const common_1 = require("@nestjs/common");
const networks_service_1 = require("./networks.service");
let NetworksController = class NetworksController {
    constructor(networksService) {
        this.networksService = networksService;
    }
    async getNetworks(name, city) {
        try {
            const networks = await this.networksService.findAll(name, city);
            return networks;
        }
        catch (error) {
            console.error(error);
        }
    }
    async getNetworkDetails(networkId) {
        const networkDetails = await this.networksService.countStationsByCountry(networkId);
        return networkDetails;
    }
};
exports.NetworksController = NetworksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NetworksController.prototype, "getNetworks", null);
__decorate([
    (0, common_1.Get)(':networkId'),
    __param(0, (0, common_1.Param)('networkId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NetworksController.prototype, "getNetworkDetails", null);
exports.NetworksController = NetworksController = __decorate([
    (0, common_1.Controller)('networks'),
    __metadata("design:paramtypes", [networks_service_1.NetworksService])
], NetworksController);
//# sourceMappingURL=networks.controller.js.map