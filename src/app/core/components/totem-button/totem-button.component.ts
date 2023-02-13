import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'totem-button',
  templateUrl: './totem-button.component.html',
  styleUrls: ['./totem-button.component.scss']
})
export class TotemButtonComponent implements OnInit {
  @Input() width: string = '220px';
  @Input() height: string = '50px';
  @Input() caption: string = 'Join community';
  @Input() customId: string = 'totemJoinButton';
  @Input() set disabled(isDisabled: boolean) {
    this.buttonDisabled = isDisabled;
    if (isDisabled) {
      this.hovered = false;
    } else {
      this.hovered = true;
    }
  };
  @ViewChild('button') button!: ElementRef;

  @Output() clicked = new EventEmitter<MouseEvent>();

  x: number = Number(this.width) / 2;
  buttonDisabled: boolean = false;
  hovered: boolean = false;
  disableRipple: boolean = false;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 1000) {
      this.disableRipple = true;
    } else {
      this.disableRipple = false;
    }
  }

  ngOnInit(): void {
    this.disableRipple = window.innerWidth < 1000 ? true : false;
  }

  clickEvent(event: MouseEvent) {
    this.clicked.emit(event)
  }

  onMouseOver(event: MouseEvent) {
    const el = this.button.nativeElement;
    this.x = event.pageX - el!.getBoundingClientRect().left + 30;
  }

  onMouseLeave() {
    this.hovered = false;
  }
  onMouseEnter() {
    this.hovered = true;
  }

}
