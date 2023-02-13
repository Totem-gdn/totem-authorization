import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  faucetUrl: string = environment.TOTEM_FAUCET_API_URL;
  baseUrl: string = environment.TOTEM_BASE_API_URL;
  applicationUrl: string = environment.TOTEM_WEB_EXPLORER_URL;

  constructor(private http: HttpClient) { }

  getMaticViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas`);
  }

  getMaticBalanceViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
  }


}
