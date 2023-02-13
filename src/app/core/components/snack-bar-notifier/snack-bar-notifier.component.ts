import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'totem-snack-bar-notifier',
  templateUrl: './snack-bar-notifier.component.html',
  styleUrls: ['./snack-bar-notifier.component.scss'],
})
export class SnackNotifierComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<SnackNotifierComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    ) { }

  ngOnInit(): void {
  }

  closeSnack() {
    this.snackBarRef.dismiss();
  }

}
