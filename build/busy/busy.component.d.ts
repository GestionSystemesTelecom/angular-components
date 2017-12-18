import { OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BusyService } from './busy.service';
export declare class BusyComponent implements OnInit, OnDestroy {
    private busyService;
    /**
     * Set the minimum loader display time
     */
    private minTTL;
    private startCount;
    private firstStartTime;
    private busy;
    private state;
    private divStateHide;
    private subscription;
    constructor(busyService: BusyService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    startBusy(): void;
    stopBusy(): void;
    animation(event: AnimationEvent): void;
    private createServiceSubscription();
}
