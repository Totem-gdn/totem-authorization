import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
// import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})

export class TokenGiveawayService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(
    private http: HttpClient,
    readonly matDialog: MatDialog,
    ) {}

  getActivity(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/me`);
  }

  setActivity(activityCode: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/auth/me`, { welcomeTokens: activityCode });
  }

}
