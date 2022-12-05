import { Injectable } from "@angular/core";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./web3rpc";
import { environment } from "src/environments/environment";
const clientId = environment.WEB3AUTH_ID;

@Injectable({ providedIn: 'root' })

export class Web3AuthService {
  web3auth: Web3Auth | null = null;
  provider: SafeEventEmitterProvider | null = null;
  isModalLoaded = false;


    init = async () => {
      this.web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: environment.BLOCKCHAIN_CONFIG.chainId,
          rpcTarget: environment.BLOCKCHAIN_CONFIG.rpcTarget
        }
      });
      const web3auth = this.web3auth;
      const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
              network: 'testnet'
          },
      })
      web3auth.configureAdapter(openloginAdapter);
      await web3auth.initModal();
      if (web3auth.provider) {
        this.provider = web3auth.provider;
      }
      this.isModalLoaded = true;
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
        console.log("web3auth not initialized yet");
        return;
      }
      const web3auth = this.web3auth;
      this.provider = await web3auth.connect();
      console.log("logged in");
    };

    getUserInfo = async () => {
      if (!this.web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await this.web3auth.getUserInfo();
      console.log(user);
      return user;
    };

    logout = async () => {
      if (!this.web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await this.web3auth.logout();
      this.provider = null;
      console.log("logged out");
    };

    getChainId = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const chainId = await rpc.getChainId();
      console.log(chainId);
    };
    getAccounts = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const address = await rpc.getAccounts();
      console.log(address);
      return address;
    };

    getBalance = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const balance = await rpc.getBalance();
      console.log(balance);
    };

    sendTransaction = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const receipt = await rpc.sendTransaction();
      console.log(receipt);
    };

    signMessage = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const signedMessage = await rpc.signMessage();
      console.log(signedMessage);
    };

    getPrivateKey = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const privateKey = await rpc.getPrivateKey();
      console.log(privateKey);
    };

}
