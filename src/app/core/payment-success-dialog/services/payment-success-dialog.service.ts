import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { PaymentSuccessDialogComponent } from "../payment-success-dialog.component";

interface MintResult {
  avatar?: boolean;
  item?: boolean;
}
@Injectable({providedIn: 'root'})

export class PaymentSuccessDialogService {

  constructor(readonly matDialog: MatDialog,) {}

  mintSuccess = new BehaviorSubject<boolean>(false);

  openPaymentSuccessDialog(assets: string[]): Observable<any> {
    const options: MatDialogConfig = {
      disableClose: true,
      panelClass: 'payment-dialog-panel',
      data: {
        requiredAssets: assets
      },
      autoFocus: false
  };
    return this.matDialog.open(PaymentSuccessDialogComponent, options).afterClosed();
  }

}
