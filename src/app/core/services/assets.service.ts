import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Web3AuthService } from "src/app/web3auth.service";
import { environment } from "src/environments/environment";
import Web3 from "web3";
const CommonFiles = require('totem-common-files');

@Injectable({ providedIn: 'root' })

export class AssetsService {

    async burn() {
        const web3 = new Web3(this.web3Auth.provider as any);
        const wallet = await this.web3Auth.getAccounts();
        const ABI = CommonFiles.totem_asset_abi;

        const contract = new web3.eth.Contract(ABI, environment.AVATAR_ETH_ADDRESS);
        console.log('contact', contract.methods)
        const ids = await contract.methods.balanceOf(wallet).call();
        console.log('total nfts', ids)
        for(let i = 0; i < ids; i++) { 
            const id = await contract.methods.tokenOfOwnerByIndex(wallet, i).call();
            console.log('burning', id)
            await contract.methods.safeTransferFrom(wallet, '0x000000000000000000000000000000000000dEaD', id).send({from: wallet})
        }

        const contract1 = new web3.eth.Contract(ABI, environment.ITEM_ETH_ADDRESS);
        const ids1 = await contract1.methods.balanceOf(wallet).call();
        console.log('total nfts', ids1)
        for(let i = 0; i < ids1; i++) { 
            console.log('i', i)
            const id = await contract1.methods.tokenOfOwnerByIndex(wallet, i).call();
            console.log('burning', id)
            await contract1.methods.safeTransferFrom(wallet, '0x000000000000000000000000000000000000dEaD', id).send({from: wallet})
        }

        console.log('after burn', ids)
        // const ids = await contract.methods.tokenOfOwnerByIndex(wallet).call();
        console.log(ids)

    }

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