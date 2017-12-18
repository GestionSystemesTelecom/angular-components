/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
var GSTModal = /** @class */ (function () {
    function GSTModal(modalService) {
        this.modalService = modalService;
    }
    /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    GSTModal.prototype.open = /**
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        options = $.extend({
            backdrop: false,
            container: '.modal-outer-template-div',
            keyboard: false,
            size: '',
            windowClass: ''
        }, options);
        return this.modalService.open(content, options);
    };
    GSTModal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GSTModal.ctorParameters = function () { return [
        { type: NgbModal, },
    ]; };
    return GSTModal;
}());
export { GSTModal };
function GSTModal_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GSTModal.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GSTModal.ctorParameters;
    /** @type {?} */
    GSTModal.prototype.modalService;
}
//# sourceMappingURL=modal.service.js.map