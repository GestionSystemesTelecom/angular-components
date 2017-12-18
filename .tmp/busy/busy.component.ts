import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { BusyService } from './busy.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'gst-busy',
    styles: [".ng2-busy { display: none; opacity: 0; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; text-align: center; z-index: 100000; background: rgba(0, 0, 0, 0.2); transition: all 0.5s ease-in-out; } "],
    template: "<div class=\"ng2-busy\" [@getbusy]=\"state\" (@getbusy.start)=\"animation($event)\" (@getbusy.done)=\"animation($event)\" [style.display]=\"divStateHide ? 'none' : 'block'\" [style.opacity]=\"divStateHide ? 0 : 1\" > <ng-content></ng-content> </div>",
    animations: [
        trigger('getbusy', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('* => *', animate('250ms ease-in-out')),
        ])
    ]
})
export class BusyComponent implements OnInit, OnDestroy {

    /**
     * Set the minimum loader display time
     */
    @Input() private minTTL: number = 400;
    private startCount: number = 0;
    private firstStartTime: number = 0;
    private busy: any;
    private state: string = 'hide';
    private divStateHide: boolean = true;
    private subscription: Subscription;

    constructor(private busyService: BusyService) {  }

    public ngOnInit() {
        this.createServiceSubscription();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public startBusy() {
        this.state = 'show';
        this.startCount++;
        if (this.firstStartTime === 0) {
            this.firstStartTime = Date.now();
        }
    }

    public stopBusy() {
        this.startCount--;
        if (this.startCount <= 0) {
            let now = Date.now();
            if (now - this.firstStartTime >= this.minTTL) {
                this.state = 'hide';
                this.firstStartTime = 0;
            } else {
                setTimeout(() => {
                    this.stopBusy();
                }, this.minTTL - (now - this.firstStartTime));
            }
        }
    }

    public animation(event: AnimationEvent) {
        if (event.phaseName === 'done' && event.toState === 'hide') {
            this.divStateHide = true;
        }
        if (event.phaseName === 'start' && event.toState === 'show') {
            this.divStateHide = false;
        }
    }

    private createServiceSubscription() {
        this.subscription = this.busyService.busyObservable.subscribe((show) => {
            if (show) {
                this.startBusy();
            } else {
                this.stopBusy();
            }
        });
    }
}
