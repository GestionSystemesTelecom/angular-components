/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { trigger, state, style, animate, transition, AnimationEvent } from "@angular/animations";
import { BusyService } from "./busy.service";
import { Subscription } from "rxjs/Rx";
var BusyComponent = /** @class */ (function () {
    function BusyComponent(busyService) {
        this.busyService = busyService;
        /**
         * Set the minimum loader display time
         */
        this.minTTL = 400;
        this.startCount = 0;
        this.firstStartTime = 0;
        this.state = 'hide';
        this.divStateHide = true;
    }
    /**
     * @return {?}
     */
    BusyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createServiceSubscription();
    };
    /**
     * @return {?}
     */
    BusyComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    BusyComponent.prototype.startBusy = /**
     * @return {?}
     */
    function () {
        this.state = 'show';
        this.startCount++;
        if (this.firstStartTime === 0) {
            this.firstStartTime = Date.now();
        }
    };
    /**
     * @return {?}
     */
    BusyComponent.prototype.stopBusy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.startCount--;
        if (this.startCount <= 0) {
            var /** @type {?} */ now = Date.now();
            if (now - this.firstStartTime >= this.minTTL) {
                this.state = 'hide';
                this.firstStartTime = 0;
            }
            else {
                setTimeout(function () {
                    _this.stopBusy();
                }, this.minTTL - (now - this.firstStartTime));
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    BusyComponent.prototype.animation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.phaseName === 'done' && event.toState === 'hide') {
            this.divStateHide = true;
        }
        if (event.phaseName === 'start' && event.toState === 'show') {
            this.divStateHide = false;
        }
    };
    /**
     * @return {?}
     */
    BusyComponent.prototype.createServiceSubscription = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.busyService.busyObservable.subscribe(function (show) {
            if (show) {
                _this.startBusy();
            }
            else {
                _this.stopBusy();
            }
        });
    };
    BusyComponent.decorators = [
        { type: Component, args: [{
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
                },] },
    ];
    /** @nocollapse */
    BusyComponent.ctorParameters = function () { return [
        { type: BusyService, },
    ]; };
    BusyComponent.propDecorators = {
        "minTTL": [{ type: Input },],
    };
    return BusyComponent;
}());
export { BusyComponent };
function BusyComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BusyComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BusyComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    BusyComponent.propDecorators;
    /**
     * Set the minimum loader display time
     * @type {?}
     */
    BusyComponent.prototype.minTTL;
    /** @type {?} */
    BusyComponent.prototype.startCount;
    /** @type {?} */
    BusyComponent.prototype.firstStartTime;
    /** @type {?} */
    BusyComponent.prototype.busy;
    /** @type {?} */
    BusyComponent.prototype.state;
    /** @type {?} */
    BusyComponent.prototype.divStateHide;
    /** @type {?} */
    BusyComponent.prototype.subscription;
    /** @type {?} */
    BusyComponent.prototype.busyService;
}
//# sourceMappingURL=busy.component.js.map