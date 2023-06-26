import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { AssetsABI } from './assets-abi'
import Web3 from "web3";

@Injectable({ providedIn: 'root' })

export class AssetsListenerService {

  public assetTxState: BehaviorSubject<null | 'error' | 'success'> = new BehaviorSubject<null | 'error' | 'success'>(null);
  private web3 = new Web3('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx');
  itemEthAddress: string = '';
  avatarEthAddress: string = '';

  constructor(
    ) {}

  async listenTx(address: string, type: string) {
    const assetContract = AssetsABI;
    //console.log(assetContract);
    console.log(type);
    console.log(address);
    const contractAddress = type === 'item' ? environment.ITEM_ETH_ADDRESS : environment.AVATAR_ETH_ADDRESS;
    const contract = new this.web3.eth.Contract(assetContract, contractAddress);
    //console.log(contract);


    const blockNumber = await this.web3.eth.getBlockNumber();

    contract.events.Transfer(
          {fromBlock: (blockNumber - 1000), filter: {to: address}},
          (error: any, event: any) => { console.log(event)}
        )
        .on("connected", (subscriptionId: any) => {
          console.log('CONNECTED');

        })
        .on('data', (event: any) => {
          console.log(event);

            if (!event) return;
            this.processEvent(event, type);
        })
        .on('changed', (event: any) => {
          console.log(event);
        })
        .on('error', (error: any, receipt: any) => {
            this.assetTxState.next('error');
        });
  }

  processEvent(response: any, type: string) {
    const mintEvent: any = response;

    const currentTokenId: string = mintEvent?.returnValues?.tokenId || mintEvent?.returnValues?.['2'];

    if (currentTokenId) {
      this.assetTxState.next('success');
    }

  }

}
