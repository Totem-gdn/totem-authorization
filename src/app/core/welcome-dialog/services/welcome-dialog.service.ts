import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { WelcomeDialogComponent } from "../welcome-dialog.component";

@Injectable({providedIn: 'root'})

export class WelcomeDialogService {

  constructor(readonly matDialog: MatDialog,) {}

  openWelcomeDialog(): Observable<any> {
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'welcome-dialog-panel',
        backdropClass: 'blurred-backdrop',
        data: null,
        autoFocus: false
    };
    return this.matDialog.open(WelcomeDialogComponent, options).afterClosed();
  }

}
