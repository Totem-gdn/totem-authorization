import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AUTH_ENUM } from "src/app/core/enums/auth.enum";

@Component({
  selector: "app-purchase",
  templateUrl: "./app-purchase.component.html",
  styleUrls: ["./app-purchase.component.scss"],
})
export class AppPurchase {
  appUrl: string = '';
  payment_result: string = '';
  type: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.appUrl = params[AUTH_ENUM.APP_URL];
      this.payment_result = params[AUTH_ENUM.PAYMENT_RESULT];
      this.type = params[AUTH_ENUM.TYPE];
      console.log('APP URL FOUND');
      if (this.appUrl && this.appUrl.length) {
        console.log('APP URL FOUND: ', this.appUrl);
        this.prepareUrlToRedirect(this.appUrl);
      }
    });
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
    if (userAgent.includes("HUAWEI") || userAgent.includes("Android")) {
        // ANdroid
        console.log('INTENT REDIRECT');
        try {
          window.location.replace(androidLink);
        } catch (err) {
          console.log(err);
        }

        setTimeout(() => {
          console.log('9 sec');
          window.location.replace(defaultLink);
        }, 9000);
    } else {
        // PC & ios
        console.log('Other device, starting redirect');

        window.location.replace(defaultLink);
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
