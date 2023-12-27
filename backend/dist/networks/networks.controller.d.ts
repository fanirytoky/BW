import { NetworksService } from './networks.service';
export declare class NetworksController {
    private readonly networksService;
    constructor(networksService: NetworksService);
    getNetworks(name?: string, city?: string): Promise<any>;
    getNetworkDetails(networkId: string): Promise<number>;
}
