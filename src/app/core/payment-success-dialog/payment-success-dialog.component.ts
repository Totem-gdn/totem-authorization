import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, map, Observable, of, Subscription, timer } from 'rxjs';
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

  value = 0;
  firstAssetMinted = false;
  interval?: any;

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

    if(this.requiredAssets[1]) {
      this.progress(70)
    } else {
      this.progress(90, 3, 7)
    }

    this.assetsService.claimAssets(this.requiredAssets[0], wallet).subscribe(tx1 => {

      if (this.requiredAssets[1]) {
        this.value = 70;
        this.progress(90)

        this.assetsService.claimAssets(this.requiredAssets[1], wallet).subscribe(tx2 => {

          this.value = 100;
          setTimeout(() => {
            this.dialogRef.close();
          }, 400)
        })

      } else {
        this.value = 100;
        setTimeout(() => {
          this.dialogRef.close();
        }, 400)
      }
    })

    // if (this.requiredAssets[1]) {
    //   this.progress(70);

    //   forkJoin([this.claimAsset(wallet, this.requiredAssets[0]), this.claimAsset(wallet, this.requiredAssets[1])])
    //     .subscribe(([tx1, tx2]) => {
    //       console.log('tx1', tx1, 'tx2', tx2)
    //       this.value = 100;
    //       // this.progress(100)
    //       setTimeout(() => {
    //         this.dialogRef.close();
    //       }, 400)
    //     })

    // } else {
    //   this.progress(90, 4, 7);

    //   this.claimAsset(wallet, this.requiredAssets[0], true)
    //   .subscribe(res => {
    //     this.value = 100;
    //     setTimeout(() => {
    //       this.dialogRef.close();
    //     }, 400)
    //   })
    // }

    }



  claimAsset(wallet: string, asset: string, single = false): Observable<boolean> {
    return this.assetsService.claimAssets(asset, wallet)
    .pipe(map(tx1 => {
      console.log('tx1',tx1)
      if(!this.firstAssetMinted) {
        if(single) return true;
        this.value = 70;
        this.progress(90)
      } 
      this.firstAssetMinted = true;
      return true;
    }))
  }

  progress(maxValue: number, min = 1, max = 4) {
    clearInterval(this.interval);
    this.interval = setInterval(() => {

      if (this.value >= maxValue) return;
      this.value += Math.floor(Math.random() * (min - max) + max) / 10;

    }, 100)
  }

  // async listenToTx(txArr: string[]) {
  //   this.dialogRef.close(true);
  //   // const wallet = await this.web3.getAccounts();
  //   // this.assetsService.listenTx(wallet, 'item').then(res => {

  //   // });
  //   // this.assetsService.listenTx(wallet, 'avatar').then(res => {


  //   // });
  // }

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
