import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { BusyService } from './busy.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'gst-busy',
    styleUrls: ['./busy.component.css'],
    templateUrl: './busy.component.html',
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
    @Input() private minTTL = 400;
    private startCount = 0;
    private firstStartTime = 0;
    private busy: any;
    public state = 'hide';
    public divStateHide = true;
    public subscription: Subscription;

    constructor(private busyService: BusyService) {  }

    public ngOnInit() {
        this.createServiceSubscription();
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
            const now = Date.now();
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
