import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Web3AuthService } from "src/app/web3auth.service";
import { environment } from "src/environments/environment";
import Web3 from "web3";
import { BaseStorageService } from "./base-storage.service";
const CommonFiles = require('totem-common-files');



export enum StorageKey {
  ITEMS = 'items',
  JWT = 'jwt',
  GAMES = 'games',
  AVATARS = 'avatars',
  OPEN_LOGIN = 'openlogin_store',
  TOTEM_REDIRECT = 'totem_redirect',
  ADAPTER = 'Web3Auth-cachedAdapter',
  USER_INFO = 'user-info',
  SELECTED_GAME = 'selected-game',
  RECENT_MINTED_TOKEN = 'Totem_RecentTokenMinted'
}

@Injectable({ providedIn: 'root' })

export class AssetsListenerService {

  public assetTxState: BehaviorSubject<null | 'error' | 'success'> = new BehaviorSubject<null | 'error' | 'success'>(null);
  private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');

  constructor(private baseStorage: BaseStorageService,
              private web3Service: Web3AuthService,
              private http: HttpClient) {}



  async listenTx(address: string, type: string) {

    const blockNumber = await this.web3.eth.getBlockNumber();

    return new Promise((resolve, reject) => {
      const assetContract = CommonFiles.totem_asset_abi;
      const contractAddress = type === 'item' ? '0xfc5654489b23379ebe98baf37ae7017130b45086' : '0xee7ff88e92f2207dbc19d89c1c9ed3f385513b35';
      const contract = new this.web3.eth.Contract(assetContract, contractAddress);
  

  
      contract.events.Transfer(
        {fromBlock: (blockNumber - 100), toBlock: 'latest', filter: {to: address}},
        (error: any, event: any) => {  })
          .on("connected", (subscriptionId: any) => {
          })
          .on('data', (event: any) => {
              if (!event) return;
              if(this.processEvent(event, type) == true) {
                console.log('event', event)
                resolve(true);
              }
          })
          .on('changed', (event: any) => {
  
          })
          .on('error', (error: any, receipt: any) => {
              this.assetTxState.next('error');
          });
    })
  }

  processEvent(response: any, type: string) {
    const mintEvent: any = response;

    const currentTokenId: string = mintEvent?.returnValues?.tokenId || mintEvent?.returnValues?.['2'];

    if (this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type)) {
      const recentMintedToken: string = this.baseStorage.getItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type)!;
      if (Number(currentTokenId) > Number(recentMintedToken)) {
        return true;
        this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type, currentTokenId);
      }
      return false;
    }

    if (currentTokenId) {
      return true;
      this.baseStorage.setItem(StorageKey.RECENT_MINTED_TOKEN + '-' + type, currentTokenId);
    }

    return false;
  }

}
