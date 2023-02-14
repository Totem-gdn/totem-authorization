import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Web3AuthService } from "src/app/web3auth.service";
import { environment } from "src/environments/environment";
import Web3 from "web3";
const CommonFiles = require('totem-common-files');

@Injectable({ providedIn: 'root' })

export class AssetsService {

    constructor(
        private http: HttpClient,
        private web3Auth: Web3AuthService) { }

    private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');

    claimAssets(assetType: string, wallet: string) {
        // const wallet = await this.web3Service.getAccounts();
        const body = {
            ownerAddress: wallet,
            assets: assetType
        }

        return this.http.post<string>(`${environment.TOTEM_API_GDN_URL}/assets/${assetType}/claim`, body)
    }

    async missingAssets() {
        const web3 = new Web3(this.web3Auth.provider as any);
        const wallet = await this.web3Auth.getAccounts();
        const ABI = CommonFiles.totem_asset_abi;

        const addresses = [environment.ITEM_ETH_ADDRESS, environment.AVATAR_ETH_ADDRESS]

        const promiseArray = [];
        for (let address of addresses) {
            const contract = new web3.eth.Contract(ABI, address);
            promiseArray.push(contract.methods.balanceOf(wallet).call());
        }

        const assetsArray = await Promise.all(promiseArray);

        let missingAssets: string[] = [];

        if (assetsArray[0] == 0) {
            missingAssets.push('item');
        }
        if (assetsArray[1] == 0) {
            missingAssets.push('avatar');
        }
        if (missingAssets.length > 0) {
            return missingAssets;
        } else {
            return null;
        }
    }

    // async listenTx(wallet: string, type: string) {

    //     const web3 = this.web3;
    //     const blockNumber = await web3.eth.getBlockNumber();

    //     const assetContract = CommonFiles.totem_asset_abi;
    //     const contractAddress = type === 'item' ? environment.ITEM_ETH_ADDRESS : environment.AVATAR_ETH_ADDRESS;
    //     const contract = new web3.eth.Contract(assetContract, contractAddress);
    //     const signature = web3.utils.sha3('Transfer(address,address,uint256)');

    //     web3.eth.subscribe('logs', {
    //         address: contractAddress,
            
    //         // topics: [signature]
    //     }, (event, err) => {

    //     }).on("connected", function(subscriptionId){

    //     }).on('data', (log: any) => {

    //     })

    //     contract.events.Transfer(
    //         { getPastEvents: (blockNumber - 100), toBlock: 'latest', filter: { to: address } },
    //         (error: any, event: any) => { })
    //         .on("connected", (subscriptionId: any) => {
    //         })
    //         .on('data', (event: any) => {
    //             if (!event) return;

    //         })
    //         .on('error', (error: any, receipt: any) => {
    //             //   this.assetTxState.next('error');
    //         });
    // }
}