import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })

export class GameLegacyService {

    constructor(private http: HttpClient) { }

    async createRecord(gameId: string, address: string) {

        if (!gameId) return;
        const data = JSON.stringify(
            {
                'player': address,
                'action': 'login',
                'description': 'Logged in to game'
            }
        )
        const body = {
            'gameAddress': gameId,
            'data': data
        }
        return firstValueFrom(this.http.post(`https://dev-api.totem.gdn/game-legacy`, body));
    }
}