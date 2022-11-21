import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Web3AuthService } from "./web3auth.service";
import { BehaviorSubject } from "rxjs";
import { OpenLoginUser } from "./core/models/open-login.interface";
import { AUTH_ENUM } from "./core/enums/auth.enum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    redirectUrl: string = '';
    loggedIn: boolean = false;
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
      private route: ActivatedRoute,
      private web3auth: Web3AuthService,
      ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        console.log(params);

        this.redirectUrl = params[AUTH_ENUM.SUCCESS_URL];
      });
      this.initAccount();
    }

    async initAccount() {
      this.loading$.next(true);
      await this.web3auth.init();
      const isLoggedIn = this.web3auth.isLoggedIn();
      console.log('data', isLoggedIn);
      if (isLoggedIn) {
        await this.getUserInfoViaWeb3();
        this.loading$.next(false);
        return;
      }
      await this.login();
    }

    async login() {
      await this.web3auth.login();
      document.getElementById('w3a-container')!.style.visibility = 'hidden';
      this.loading$.next(true);
      await this.getUserInfoViaWeb3();
      this.loading$.next(false);
    }

    async getUserInfoViaWeb3() {
      this.loggedIn = true;
      const userInfo: OpenLoginUser | undefined = await this.web3auth.getUserInfo();
      console.log(userInfo);

      let token = userInfo?.idToken;
      if(userInfo?.idToken) {
        // Social Wallets
        token = userInfo?.idToken;
        console.log('USER ID TOKEN: ', token);

      } else {
        // External Wallets
        token = await this.web3auth.walletJWTToken();
        console.log('meta token', token)
        //publicKey = this.parseJwt(token).wallets[0].address;
      }
      const jwt = token;
      /* const jwtExpired = await this.checkJwtFreshness(jwt); */
      this.loading$.next(false);
      /* if (jwtExpired) {
        await this.web3auth.logout();
        await this.login();
        return;
      } */
      await this.web3auth.logout();
      localStorage.clear();
      console.log(this.redirectUrl + `?${AUTH_ENUM.TOKEN}=${jwt}`);
      location.replace(this.redirectUrl + `?${AUTH_ENUM.TOKEN}=${jwt}`);

    }

    async checkJwtFreshness(jwt: string | undefined): Promise<boolean> {
      const jwtInfo = this.parseJwt(jwt);
      const expDate = new Date(+(jwtInfo!.exp + '000'));
      if (expDate < new Date()) {
        return true;
      } else {
        return false;
      }
    }

    parseJwt(token: string | undefined): { exp: string } | null {
      if(!token) return null;
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    };

}
