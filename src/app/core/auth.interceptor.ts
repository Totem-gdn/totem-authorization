import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Web3AuthService } from "../web3auth.service";
import { StorageKey } from "./services/assets-transaction.service";
import { BaseStorageService } from "./services/base-storage.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private web3: Web3AuthService,
    private baseStorageService: BaseStorageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuth()) {
      if (
        request.url.includes(environment.TOTEM_BASE_API_URL) ||
        request.url.includes(environment.TOTEM_FAUCET_API_URL) ||
        request.url.includes(environment.TOTEM_API_GDN_URL)
        // request.url.includes(environment.TOTEM_STATIC_API_URL)
      ) {
        return next.handle(this.transformRequest(request));
      }
      //if (request.url.includes('s3')) {
      //  return next.handle(this.transformRequest2(request));
      //}
    }
    return next.handle(request);
  }

  transformRequest(request: HttpRequest<any>) {
    let jwt: any = localStorage.getItem(StorageKey.JWT);
    const creds: any = this.web3.parseJwt(jwt);

    const authorization: string = `Bearer ${jwt}`;
    if (request.url.includes(environment.TOTEM_BASE_API_URL)) {
      return request.clone({
        setHeaders: {
          Authorization: authorization,
          'X-App-PubKey': creds.wallets[0].public_key
        }
      })
    } else {
      return request.clone({
        setHeaders: {
          Authorization: `${authorization} ${creds.wallets[0].public_key}`
        }
      })
    }
  }

  isAuth(): boolean {
    const isAuthenticated = this.web3.isLoggedIn();
    return isAuthenticated;
  }

}
