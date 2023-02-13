import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'totem-spinner',
  templateUrl: './totem-spinner.component.html',
  styleUrls: ['./totem-spinner.component.scss']
})
export class TotemSpinnerComponent implements OnInit {
  @Input() size: string = '24';

  constructor() { }

  
  ngOnInit(): void {
  }

}
