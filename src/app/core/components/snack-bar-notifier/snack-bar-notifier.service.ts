import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackNotifierComponent } from './snack-bar-notifier.component';

@Injectable({providedIn: 'root'})
export class SnackNotifierService {

    constructor(
        private snackbar: MatSnackBar,
    ) {
    }

    open(config?: string) {
        this.snackbar.openFromComponent(SnackNotifierComponent, {
            data: config ? config : undefined,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'totem-snackbar',
            duration: 4600
        })
    }
}
