import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AUTH_ENUM } from "src/app/core/enums/auth.enum";
import { SocketIoService } from "src/app/core/services/socket-io.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./app-purchase.component.html",
  styleUrls: ["./app-purchase.component.scss"],
})
export class AppPurchase {
  appUrl: string = '';
  payment_result: string = '';
  type: string = '';
  autoClose: boolean = false;

  wsEnabled: string = '';
  roomId: string = '';

  constructor(
    private route: ActivatedRoute,
    private socketIoService: SocketIoService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.appUrl = params[AUTH_ENUM.APP_URL];
      this.payment_result = params[AUTH_ENUM.PAYMENT_RESULT];
      this.type = params[AUTH_ENUM.TYPE];
      if (params[AUTH_ENUM.AUTO_CLOSE]) {
        let flag = params[AUTH_ENUM.AUTO_CLOSE];
        if (flag !== 'true') {
          console.log('AUTO CLOSE IS NOT USED')
          this.autoClose = false;
        } else {
          console.log('AUTO CLOSE ENBALED')
          this.autoClose = true;
        }
      }

      this.wsEnabled = params[AUTH_ENUM.WEBSOCKETS_ENABLED];
      if (this.wsEnabled == 'true') {
        this.roomId = params[AUTH_ENUM.ROOM_ID];
        console.log(this.roomId);
        this.performWsRedirection();
        return;
      }

      if (this.appUrl && this.appUrl.length) {
        console.log('APP URL FOUND: ', this.appUrl);
        this.prepareUrlToRedirect(this.appUrl);
      }
    });
  }

  performWsRedirection() {
    if (!this.roomId) {
      this.prepareUrlToRedirect(this.appUrl);
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
        this.prepareUrlToRedirect(this.appUrl);
        console.log('REDIRECT TO GAME');
        //this.socketIoService.emitData({[AUTH_ENUM.PAYMENT_RESULT]: this.payment_result, ['asset_type']: this.type});
      }
    })
    this.socketIoService.emitRoomConnection(this.roomId);
  }

  prepareUrlToRedirect(url: string) {
    const urlToProcess: string = url;
    if (urlToProcess.includes('http:/')) {
      const urlToRedirect: string = this.appendParams(urlToProcess);
      this.checkDeviceAndRedirect(urlToRedirect, urlToRedirect);
      console.log('END OF HTTP');
      return;
    }
    if (urlToProcess.includes('https:/')) {
      const urlToRedirect: string = this.appendParams(urlToProcess);
      this.checkDeviceAndRedirect(urlToRedirect, urlToRedirect);
      console.log('END OF HTTPS');
      return;
    }
    console.log('START OF ANDROID');
    // for android
    let index: number = urlToProcess.indexOf(':/')
    if (index == -1) {
      console.log('Invalid scheme');
    }
    const scheme: string = urlToProcess.substring(0, index)
    const appName: string = urlToProcess.substring(index + 3);
    const androidLink: string = `intent://${appName}/#Intent;scheme=${scheme};end`;
    console.log(scheme, appName + '\n' + androidLink);
    this.checkDeviceAndRedirect(androidLink, urlToProcess);
  }

  checkDeviceAndRedirect(androidLink: string, defaultLink: string) {
    let userAgent = navigator.userAgent || navigator.vendor;
    if (this.wsEnabled && this.roomId) {
      this.socketIoService.emitData({[AUTH_ENUM.PAYMENT_RESULT]: this.payment_result, ['asset_type']: this.type});
    }
    if (userAgent.includes("HUAWEI") || userAgent.includes("Android")) {
        // ANdroid
        console.log('INTENT REDIRECT');
        try {
          if (this.autoClose) {
            window.close();
          } else {
            window.location.replace(androidLink);
          }
        } catch (err) {
          console.log(err);
        }

        setTimeout(() => {
          console.log('9 sec');
          if (this.autoClose) {
            window.close();
          } else {
            window.location.replace(defaultLink);
          }
        }, 9000);
    } else {
        // PC & ios
        console.log('Other device, starting redirect');
        if (this.autoClose) {
          window.close();
        } else {
          window.location.replace(defaultLink);
        }
    }
  }

  appendParams(url: string): string {
    let prepearedUrl: string = url;
    if (this.payment_result) {
      prepearedUrl += `?${AUTH_ENUM.PAYMENT_RESULT}=${this.payment_result}`;
    }
    if (!this.payment_result && this.type) {
      prepearedUrl += `?${AUTH_ENUM.TYPE}=${this.type}`;
    } else if (this.payment_result && this.type) {
      prepearedUrl += `&${AUTH_ENUM.TYPE}=${this.type}`;
    }
    console.log(prepearedUrl);
    return prepearedUrl;
  }

}
