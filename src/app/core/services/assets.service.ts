import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Web3AuthService } from "src/app/web3auth.service";
import { environment } from "src/environments/environment";
import Web3 from "web3";
const CommonFiles = require('totem-common-files');

@Injectable({ providedIn: 'root' })

export class AssetsService {

    constructor(private web3Service: Web3AuthService,
                private http: HttpClient) { }

    claimAssets(assetType: string, wallet: string) {
        // const wallet = await this.web3Service.getAccounts();
        const body = {
            ownerAddress: wallet,
            assets: assetType
        }

        return this.http.post<string>(`${environment.TOTEM_API_GDN_URL}/assets/${assetType}/claim`, body)
    }

    async isUserOwnsAssets() {
        const web3 = new Web3(this.web3Service.provider as any);
        const wallet = await this.web3Service.getAccounts();
        const ABI = CommonFiles.totem_asset_abi;

        const addresses = ['0xfC5654489b23379ebE98BaF37ae7017130B45086', '0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35']

        const promiseArray = [];
        for (let address of addresses) {
            const contract = new web3.eth.Contract(ABI, address);
            promiseArray.push(contract.methods.balanceOf(wallet).call());
        }

        const assetsArray = await Promise.all(promiseArray);
        console.log('array', assetsArray)
        let owns: string[] = [];

        if(assetsArray[0] == 0) {
            owns.push('item');
        }
        if(assetsArray[1] == 0) {
            owns.push('avatar');
        }
        if(assetsArray[0] == 0 || assetsArray[1] == 0) {
            return owns;
        } else {
            return null;
        }
    }
}