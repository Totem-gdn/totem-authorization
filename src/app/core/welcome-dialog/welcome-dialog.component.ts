import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, catchError, of, Subscription, take } from 'rxjs';
import { Web3AuthService } from 'src/app/web3auth.service';
import { Animations } from '../animations/animations';
import { SnackNotifierService } from '../components/snack-bar-notifier/snack-bar-notifier.service';
import { CryptoUtilsService } from '../services/crypto-utils.service';
import { TokenGiveawayService } from '../services/token-giveaway.service';
import { TransactionsService } from '../services/transactions.service';
export enum TOKEN {
  MATIC = 'MATIC',
  USDC = 'USDC'
}

export enum GIVEAWAY_STATUS {
REJECTED = 'rejected',
ACCEPTED = 'accepted'
}

@Component({
  selector: 'totem-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
  animations: [
    Animations.animations
  ]
})
export class WelcomeDialogComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  slideInterval: any;
  slideStep: 'first' | 'second' | 'third' | 'fourth' = 'first';

  closeInterval: any;
  secondsToClose: number = 5;
  buttonCaption: string = "Let's start";
  tokensClaimed: { MATIC: boolean, USDC: boolean } = { MATIC: false, USDC: false };
  steps: any = [
    {
      step: false,
      loading: false,
    },
    {
      step: false,
      loading: true,
    },
    {
      step: false,
      loading: false,
    },
    {
      step: false,
      loading: false,
    },
  ];
  stepIndex: number = 1;
  maticHash: string | null = null;
  usdcHash: string | null = null;

  errorMessage: string = '';
  errorState: boolean = false;
  showCounter: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private web3Service: Web3AuthService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    private cryptoUtilsService: CryptoUtilsService,
    private giveawayService: TokenGiveawayService
  ) { }

  ngOnInit() {
    this.slideInterval = setInterval(()=>{
      if (this.slideStep == 'first') {
        this.slideStep = 'second';
        return;
      }
      if (this.slideStep == 'second') {
        this.slideStep = 'third';
        return;
      }
      if (this.slideStep == 'third') {
        this.slideStep = 'fourth';
        return;
      }
      if (this.slideStep == 'fourth') {
        this.slideStep = 'first';
        return;
      }
    }, 2400);
    this.listenTxAndGetFunds();
  }

  // transaction

  listenTxAndGetFunds() {
    this.subs.add(
      this.web3Service.maticTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          this.snackService.open('Error while processing your request');
          this.errorMessage = 'There was an error while processing your request.';
          this.errorState = true;
        }
        if (data && data != 'error') {
          if (!data.status) {
            this.snackService.open('Error while processing your request');
            this.errorMessage = 'There was an error while processing your request.';
            this.errorState = true;
            return;
          }
          this.tokensClaimed.MATIC = true;
          if (this.tokensClaimed.USDC) {
            this.nextStep();
          }
        }
      })
    );
    this.subs.add(
      this.web3Service.usdcTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          this.snackService.open('Error while processing your request');
          this.errorMessage = 'There was an error while processing your request.';
          this.errorState = true;
        }
        if (data && data != 'error') {
          if (!data.status) {
            this.snackService.open('Error while processing your request');
            this.errorMessage = 'There was an error while processing your request.';
            this.errorState = true;
            return;
          }
          this.tokensClaimed.USDC = true;
          if (this.tokensClaimed.MATIC) {
            this.nextStep();
          }
        }
      })
    );
    this.getMatics();
  }

  nextStep() {
    if (this.stepIndex < 3) {
      this.steps[this.stepIndex].step = true;
      this.steps[this.stepIndex].loading = false;
      this.steps[this.stepIndex + 1].loading = true;
      this.stepIndex++;
    }
    if (this.stepIndex == 3) {
      this.steps[this.stepIndex].step = true;
      this.steps[this.stepIndex].loading = false;
      this.cryptoUtilsService.updateBalance();
      this.setAsAccept();
    }
  }

  getMatics() {
    this.subs.add(
      this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
        next: (response: any) => {
          if (response.status == 'Accepted') {
            this.nextStep();
            this.maticHash = response.MATIC;
            this.usdcHash = response.USDC;
            this.web3Service.isReceiptedMatic(response.MATIC);
            setTimeout(() => {
              this.web3Service.isReceiptedUsdc(response.USDC);
            }, 400);
          }
        },
        error: (error: any) => {
          if (error.error.statusCode == 403) {
            this.snackService.open('Please Login');
          }
          if (error.error.statusCode == 500) {
            this.errorMessage = 'Your authentication token has expired. Please relogin.';
            this.snackService.open('Your auth token has expired');
            this.errorState = true;
          }
          if (error.error.statusCode == 400) {
            this.errorMessage = 'You have already claimed the tokens recently. Please try again\n after 24 hours from your original request.';
            this.snackService.open('You have already claimed the tokens recently');
            this.errorState = true;
          }
        }
      }
      )
    )
  }

  startCountToClose() {
    this.showCounter = true;
    this.closeInterval = setInterval(()=>{
      this.secondsToClose -= 1;
      if (this.secondsToClose == 0) {
        this.close();
        clearInterval(this.closeInterval);
      }
    }, 1000);
  }

  //

  setAsAccept() {
    this.subs.add(
      this.giveawayService.setActivity(1).pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackService.open(err.error?.message || err.message);
          //this.errorMessage = err.error?.message || err.message;
          //this.errorState = true;
          return of();
        })
      ).subscribe((response: any) => {
        if (response && response.welcomeTokens == 1) {
          this.startCountToClose();
        } else {
          this.snackService.open('Error while processing your request');
          //this.errorMessage = 'There was an error while processing your request.';
          //this.errorState = true;
        }
      })
    );
  }

  closeWithAccept() {
    this.subs.add(
      this.giveawayService.setActivity(1).subscribe((response: any) => {
        if (response && response.welcomeTokens == 1) {
          this.dialogRef.close({status: GIVEAWAY_STATUS.ACCEPTED});
          return;
        }
        this.dialogRef.close('default');
      })
    );
  }
  closeWithReject() {
    this.subs.add(
      this.giveawayService.setActivity(2).subscribe((response: any) => {
        if (response && response.welcomeTokens == 2) {
          this.dialogRef.close({status: GIVEAWAY_STATUS.REJECTED});
          return;
        }
        this.dialogRef.close('default');
      })
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    clearInterval(this.slideInterval);
    this.web3Service.resetUsdcAndMaticResponse();
  }

}
