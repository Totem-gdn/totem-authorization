import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Observable, Subscription, timer } from 'rxjs';
import { Web3AuthService } from 'src/app/web3auth.service';
import { AssetsListenerService } from '../services/assets-transaction.service';
import { AssetsService } from '../services/assets.service';


@Component({
  selector: 'payment-success-dialog',
  templateUrl: './payment-success-dialog.component.html',
  styleUrls: ['./payment-success-dialog.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  },
  // animations: Animations.animations
})
export class PaymentSuccessDialogComponent {

  requiredAssets: string[] = [];
  status: string = '';
  assetName: string = '';
  assetNameMultiple: string = '';
  secondsToClose: number = 37;
  counterToCloseSub: Subscription = new Subscription();
  counterSub: Subscription = new Subscription();
  txFinished: null | 'success' | 'error' = null;

  constructor(
    public dialogRef: MatDialogRef<PaymentSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { requiredAssets: string[] },
    private assetsListenerService: AssetsListenerService,
    private web3: Web3AuthService,
    private assetsService: AssetsService
  ) {
    this.requiredAssets = data.requiredAssets;
    // this.asset = data.type;
    // this.status = data.status;
  }

  async ngOnInit() {
    const wallet = await this.web3.getAccounts();
    const subsArray: Observable<any>[] = [];
    for (let asset of this.requiredAssets) {


    }

    this.assetsService.claimAssets(this.requiredAssets[0], wallet).subscribe(tx1 => {
      if (this.requiredAssets[1]) {
        console.log('tx1', tx1)
        this.assetsService.claimAssets(this.requiredAssets[1], wallet).subscribe(tx2 => {
          this.listenToTx([tx1, tx2])
          console.log('tx2', tx2)

        })
      } else {
        this.listenToTx([tx1])
      }
    })
    // forkJoin(subsArray).subscribe((res: any) => {
    //   // this.getUserAndListenAssetTx();
    // })


  }

  async listenToTx(txArr: string[]) {
    this.dialogRef.close(true);
    const wallet = await this.web3.getAccounts();
    this.assetsListenerService.listenTx(wallet, 'item').then(res => {
      console.log('item success', res)
    });
    this.assetsListenerService.listenTx(wallet, 'avatar').then(res => {
      console.log('avatar success', res)

    });
  }

  getUserAndListenAssetTx() {
    this.assetsListenerService.assetTxState.subscribe((state: string | null) => {
      if (state == 'success') {
        /* this.txFinished = 'success';
        this.dialogRef.close(true); */
        this.startCounterToSuccessClose();
      }
      if (state == 'error') {
        this.txFinished = 'error';
      }
    })
    this.startCounter();
    // this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
    //   if (user) {
    //     this.assetsListenerService.listenTx(user.wallet!, this.asset);

    //   }
    // })
  }

  startCounter() {
    this.counterSub = timer(1000, 1000).subscribe(() => {
      this.secondsToClose -= 1;
      if (this.secondsToClose == 0) {
        this.counterSub.unsubscribe();
      }
    })
  }

  startCounterToSuccessClose() {
    let count: number = 7;
    this.counterToCloseSub = timer(1000, 1000).subscribe(() => {
      count -= 1;
      if (count == 0) {
        this.txFinished = 'success';
        this.dialogRef.close(true);
      }
    })
  }

  ngOnDestroy(): void {
    this.counterToCloseSub.unsubscribe();
    this.counterSub.unsubscribe();
    this.secondsToClose = 37;
  }

}
