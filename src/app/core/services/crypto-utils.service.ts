import { Injectable } from "@angular/core";
// import { CONTRACT_ADDRESS } from "@app/core/models/enums/contract-address.enum";
// import { TOKEN } from "@app/core/models/enums/token.enum";
// import { TokenBalance } from "@app/core/models/interfaces/token-balance.modle";
// import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
// import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import { Web3AuthService } from "src/app/web3auth.service";
import Web3 from "web3";
const CommonFiles = require('totem-common-files');


export interface TokenBalance {
    matic: string | undefined;
    usdc: string | undefined;
}

@Injectable({ providedIn: 'root' })

export class CryptoUtilsService
{
    constructor(private web3: Web3AuthService) {}

    private _tokenBalance = new BehaviorSubject<TokenBalance>({ matic: '0', usdc: '0' });

    get tokenBalance$() {
        return this._tokenBalance.asObservable();
    }

    updateBalance() {
        this.getUSDCBalance().then(usdcBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.usdc = usdcBalance;
            this._tokenBalance.next(tokenBalance);
        });
        /* this.getMaticBalance().then(maticBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.matic = maticBalance;
            this._tokenBalance.next(tokenBalance);
        }); */
    }

    async checkAddressValidity(address: string | undefined | null) {
        if (!this.web3.provider || !address) return;
        const web3 = new Web3(this.web3.provider as any);
        return web3.utils.isAddress(address);
    }

    // async getDecimals(token: TOKEN): Promise<number> {
    //     const web3 = new Web3(this.web3.provider as any);
    //     const address = token == TOKEN.MATIC ? CONTRACT_ADDRESS.MATIC : CONTRACT_ADDRESS.USDC;
    //     const contract = new web3.eth.Contract(GetTokensABI, address);
    //     return await contract.methods.decimals().call();
    // }

    async estimateMaticGasFee(to: string, amount: number) {
        if (!amount) return;
        const web3 = new Web3(this.web3.provider as any);
        const myWallet = await this.web3.getAccounts();
        const gasPrice = await web3.eth.getGasPrice();

        const transactionReceipt = {
            from: myWallet,
            to: to,
            gasPrice: gasPrice,
        };
        const gasLimit = await web3.eth.estimateGas(transactionReceipt);
        const fee = gasLimit * +gasPrice;
        const gasFee = web3.utils.fromWei(fee.toString());
        return gasFee;
    }
    // async estimateUSDCGasFee(to?: string, amount?: string) {
    //     if(to == undefined || amount == undefined) return;
    //     const web3 = new Web3(this.web3.provider as any);
    //     const wallet = await this.web3.getAccounts();

    //     const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b'
    //     const tokenContract = GetTokensABI;
    //     const contract = new web3.eth.Contract(tokenContract, contractAddress);


    //     const contractGas = await contract.methods.transfer(to, amount).estimateGas({ from: wallet });
    //     const gasPrice = await web3.eth.getGasPrice();
    //     const fee = +contractGas * +gasPrice;
    //     const gasFee = web3.utils.fromWei(fee.toString());
    //     return gasFee;
    // }

    async getMaticBalance() {
        return await this.web3.getBalance();
    }

    async getUSDCBalance():Promise<string> {
        const ABI = CommonFiles.totem_asset_abi;

        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress = '0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0]
        const tokenContract = ABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const balance = await contract.methods.balanceOf(wallet).call();

        return balance;
    }
}
