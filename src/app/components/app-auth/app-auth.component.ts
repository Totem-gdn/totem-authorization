import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { BehaviorSubject } from "rxjs";
// import { WelcomeDialogService } from "./core/welcome-dialog/services/welcome-dialog.service";
import { Web3AuthService } from "src/app/web3auth.service";
import { GameLegacyService } from "src/app/core/services/game-legacy.service";
import { WebsocketService } from "src/app/core/services/socket.service";
import { CryptoUtilsService } from "src/app/core/services/crypto-utils.service";
import { AssetsService } from "src/app/core/services/assets.service";
import { PaymentSuccessDialogService } from "src/app/core/payment-success-dialog/services/payment-success-dialog.service";
import { BaseStorageService } from "src/app/core/services/base-storage.service";
import { AUTH_ENUM } from "src/app/core/enums/auth.enum";
import { StorageKey } from "src/app/core/services/assets-transaction.service";
import { OpenLoginUser } from "src/app/core/models/open-login.interface";
import { SocketIoService } from "src/app/core/services/socket-io.service";

@Component({
  selector: "app-auth",
  templateUrl: "./app-auth.component.html",
  styleUrls: ["./app-auth.component.scss"],
})
export class AppAuth implements OnDestroy {
  redirectUrl: string = '';
  appUrl: string = '';
  gameId: string = '';
  loggedIn: boolean = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  wsEnabled: string = '';
  roomId: string = '';

  constructor(
    private route: ActivatedRoute,
    private web3auth: Web3AuthService,
    private legacyService: GameLegacyService,
    private socketService: WebsocketService,
    private assetsService: AssetsService,
    private cryptoUtilsService: CryptoUtilsService,
    private paymentService: PaymentSuccessDialogService,
    private localStorage: BaseStorageService,
    private socketIoService: SocketIoService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.redirectUrl = params[AUTH_ENUM.SUCCESS_URL];
      this.gameId = params[AUTH_ENUM.GAME_ID];
      this.wsEnabled = params[AUTH_ENUM.WEBSOCKETS_ENABLED];

      if (this.wsEnabled == 'true') {
        this.roomId = params[AUTH_ENUM.ROOM_ID];
        console.log(this.roomId);
        this.performWsRedirection();
        return;
      }

      this.login();
      this.events$();
    });

    // this.paymentService.openPaymentSuccessDialog(['asset', 'avatar']).subscribe(res => {
    //   // this.handleJwt(jwt);
    //   // this.loading$.next(false);
    // });
    // this.initAccount();
  }

  performWsRedirection() {
    if (!this.roomId) {
      this.login();
      this.events$();
      return;
    }
    this.socketIoService.initWs();
    this.socketIoService.onWsConnect().subscribe((data: any) => {
      console.log(data?.connected);
      if (data?.connected) {
        this.connectToRoomAndRedirect();
      }
    })
  }

  connectToRoomAndRedirect() {
    this.socketIoService.onEvents().subscribe((data: any) => {
      console.log(data);
      if (data.type === 'user:connected') {
        this.login();
        this.events$();
        console.log('AUTH STARTED');
        //this.socketIoService.emitData({[AUTH_ENUM.PAYMENT_RESULT]: this.payment_result, ['asset_type']: this.type});
      }
    })
    this.socketIoService.emitRoomConnection(this.roomId);
  }

  async login() {
    console.log('login')
    await this.web3auth.init();
    await this.web3auth.login();
    this.loading$.next(true);
    if (!this.web3auth.isLoggedIn()) {

    }
  }

  events$() {
    this.web3auth.web3auth?.on(ADAPTER_EVENTS.ERRORED, () => {

      this.web3auth.login();
    });
    this.web3auth.web3auth?.on(ADAPTER_EVENTS.CONNECTED, () => {

      setTimeout(() => {
        this.processLogin();
      }, 100)
    });
  }
  // web3Modal$() {
  //   this.web3auth.web3.
  // }

  async processLogin() {
    // await this.assetsService.burn();
    // return;
    const jwt = await this.getJwt();

    if(jwt) this.localStorage.setItem(StorageKey.JWT, jwt);

    const missingAssets: string[] | null = await this.assetsService.missingAssets();

    if(missingAssets) {
      console.log('missing assets', missingAssets)
      this.paymentService.openPaymentSuccessDialog(missingAssets).subscribe(res => {
        this.handleJwt(jwt);
        this.loading$.next(false);
      });

    } else {
      this.handleJwt(jwt);
      this.loading$.next(false);
    }
  }

  async handleJwt(jwt?: string) {

    // Create game legacy
    const wallet = await this.web3auth.getAccounts();
    this.legacyService.createRecord(this.gameId, wallet)?.subscribe();

    await this.web3auth.logout();
    localStorage.clear();

    if (!this.redirectUrl) {
      if (this.wsEnabled && this.roomId) {
        this.socketIoService.emitData({loggedIn: false, token: jwt});
      }
      location.reload();
    } else {
      if (this.wsEnabled && this.roomId) {
        this.socketIoService.emitData({loggedIn: true, token: jwt});
      }
      location.replace(this.redirectUrl + `?${AUTH_ENUM.TOKEN}=${jwt}`);
    }
  }

  async getJwt() {
    this.loggedIn = true;
    const userInfo: OpenLoginUser | undefined = await this.web3auth.getUserInfo();

    let token = userInfo?.idToken;
    if (userInfo?.idToken) {
      // Social Wallets
      token = userInfo?.idToken;

    } else {
      // External Wallets
      token = await this.web3auth.walletJWTToken();
    }
    const jwt = token;
    this.loading$.next(false);
    return jwt;
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
    if (!token) return null;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  ngOnDestroy(): void {
    this.socketService.endPingLoop();
  }
}
