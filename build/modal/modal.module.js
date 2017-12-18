/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";
import { GSTModal } from "./modal.service";
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    /**
     * @return {?}
     */
    ModalModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: ModalModule,
            providers: [NgbModule, GSTModal]
        };
    };
    ModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgbModule
                    ],
                    providers: [],
                    // leave empty to avoid multiple instances
                    declarations: [ModalComponent],
                    exports: [ModalComponent]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());
export { ModalModule };
function ModalModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ModalModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ModalModule.ctorParameters;
}
//# sourceMappingURL=modal.module.js.map