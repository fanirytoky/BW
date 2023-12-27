import { Controller, Get, Post, Body, Query, Res, Param } from '@nestjs/common';
import { NetworksService } from './networks.service';
import { Response } from 'express';

@Controller('networks')
export class NetworksController {
    constructor(private readonly networksService: NetworksService) { }

    @Get()
    async getNetworks(@Query('name') name?: string, @Query('city') city?: string) {
        try {
            const networks = await this.networksService.findAll(name, city);
            return networks;
        } catch (error) {
            console.error(error);
        }
    }

    @Get(':networkId')
    async getNetworkDetails(@Param('networkId') networkId: string) {
        const networkDetails = await this.networksService.countStationsByCountry(networkId);
        
        return networkDetails;
    }
}

