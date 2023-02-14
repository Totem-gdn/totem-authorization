import { Injectable } from "@angular/core";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./web3rpc";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import Web3 from "web3";
const clientId = environment.WEB3AUTH_ID;

@Injectable({ providedIn: 'root' })

export class Web3AuthService {
  web3auth: Web3Auth | null = null;
  provider: SafeEventEmitterProvider | null = null;
  isModalLoaded = false;
  web3?: Web3;


    init = async () => {
      this.web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: environment.BLOCKCHAIN_CONFIG.chainId,
          rpcTarget: environment.BLOCKCHAIN_CONFIG.rpcTarget
        },
        uiConfig: {
          theme: 'dark'
      }
      });
      const web3auth = this.web3auth;
      const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
              network: 'mainnet'
          },
      })
      web3auth.configureAdapter(openloginAdapter);
      await web3auth.initModal();
      if (web3auth.provider) {
        this.provider = web3auth.provider;
      }
      this.isModalLoaded = true;
      console.log('INIT')
    }

    isLoggedIn(): boolean {
      if (this.provider) {
          return true;
      } else {
          return false;
      }
    }

    walletJWTToken = async() => {
      if(!this.web3auth) return;
      const web3 = this.web3auth;
      const key = await web3.authenticateUser();
      return key.idToken;
    }

    login = async () => {
      if (!this.web3auth) {
        return;
      }
      const web3auth = this.web3auth;
      this.provider = await web3auth.connect();
      console.log('LLGIN')

    };

    getUserInfo = async () => {
      if (!this.web3auth) {
        return;
      }
      const user = await this.web3auth.getUserInfo();
      return user;
    };
    isReceiptedUsdc(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx'));
      const interval2 = setInterval( async () => {
        if(!this.web3) return;
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.usdcClaimed.next('error');
            clearInterval(interval2);
          }
          if (res) {
            this.usdcClaimed.next(res);
            clearInterval(interval2);
          }
        });
      }, 1000);
    }
    resetUsdcAndMaticResponse() {
      this.usdcClaimed.next(null);
      this.maticClaimed.next(null);
    }
    isReceiptedMatic(hash: string) {
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx'));
      const interval1 = setInterval( async () => {
        if(!this.web3) return;
        await this.web3.eth.getTransactionReceipt(hash, (err: any, res: any) => {
          if (err) {
            this.maticClaimed.next('error');
            clearInterval(interval1);
          }
          if (res) {
            this.maticClaimed.next(res);
            clearInterval(interval1);
          }
        });
      }, 1000);
    }

    maticTransactionListener(): Observable<any> {
      return this.maticClaimed.asObservable();
    }
    usdcTransactionListener(): Observable<any> {
      return this.usdcClaimed.asObservable();
    }
    usdcClaimed: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    maticClaimed: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

    logout = async () => {
      if (!this.web3auth) {
        return;
      }
      await this.web3auth.logout();
      this.provider = null;
    };

    getChainId = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const chainId = await rpc.getChainId();
    };
    getAccounts = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const address = await rpc.getAccounts();
      return address;
    };

    getBalance = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const balance = await rpc.getBalance();
      return balance;
    };

    sendTransaction = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const receipt = await rpc.sendTransaction();
    };

    signMessage = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const signedMessage = await rpc.signMessage();
    };

    getPrivateKey = async () => {
      if (!this.provider) {
        return;
      }
      const rpc = new RPC(this.provider);
      const privateKey = await rpc.getPrivateKey();
    };

    parseJwt(token: string | undefined): string | null {
      if (!token) return null;
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    };
}
