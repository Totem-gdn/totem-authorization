import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";


@Component({
    selector: 'bg-circle',
    template:
    `
    <div #circle class="circle"></div>
    `,
    styleUrls: ['./bg-circle.component.scss'],
    host: {
        class: 'absolute'
    }
})

export class BackgroundCircleComponent implements AfterViewInit {

    @Input() width: string | null = null;
    @Input() height: string | null = null;
    @Input() background: string | null = 'green';
    @Input() move: string | null = null;
    @Input() delay = '0';
    @ViewChild('circle') circle!: ElementRef;

    ngAfterViewInit() {
        const circle = this.circle.nativeElement.style;

        if(this.width) {
            circle.width = this.width;
            circle.height = this.height ? this.height : this.width;
        }
        if(this.background) circle.background = this.background;

        if(this.move) {
            circle.animationDelay = this.delay;
            circle.animation = 'MoveUpDown 10s linear infinite';
        }
    }
}
