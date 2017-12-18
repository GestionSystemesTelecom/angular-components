/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs/add/operator/share";
var BusyService = /** @class */ (function () {
    function BusyService() {
        var _this = this;
        this.busyObservable = new Observable(function (observer) {
            _this.busyObserver = observer;
        }).share();
    }
    /**
     * @return {?}
     */
    BusyService.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.busyObserver) {
            this.busyObserver.next(true);
        }
    };
    /**
     * @return {?}
     */
    BusyService.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.busyObserver) {
            this.busyObserver.next(false);
        }
    };
    BusyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BusyService.ctorParameters = function () { return []; };
    return BusyService;
}());
export { BusyService };
function BusyService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BusyService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BusyService.ctorParameters;
    /** @type {?} */
    BusyService.prototype.busyObservable;
    /** @type {?} */
    BusyService.prototype.busyObserver;
}
//# sourceMappingURL=busy.service.js.map