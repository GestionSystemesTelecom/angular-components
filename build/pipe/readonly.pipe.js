/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe, PipeTransform } from "@angular/core";
import { isObject } from "rxjs/util/isObject";
/**
 * Allow ngFor to iterate on object collection
 *
 * ref = {
 *  a1: "valeur,
 *  a2: "valeur,
 *  a3: "valeur,
 *  }
 *
 *  ou encore
 *
 * ref = {
 *  a1: {foo:'bar', foo1:'bar1'},
 *  a2: {foo:'bar', foo1:'bar1'},
 *  a3: {foo:'bar', foo1:'bar1'}
 *  }
 *
 * exemple
 * <select class="form__input" type="text" ngControl="situationZoneClimatique">
 * <option *ngFor="let c of references?.climat | readOnly" value="{{ c.key }}">{{ c.value }}</option>
 * </select>
 *
 */
var ReadOnlyPipe = /** @class */ (function () {
    function ReadOnlyPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ReadOnlyPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (args === void 0) { args = []; }
        if (value == null) {
            return null;
        }
        if (value instanceof Map) {
            return this.manageMapObject(value);
        }
        else if (Array.isArray(value) || typeof value === 'object') {
            return this.manageArray(value, args);
        }
        return value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ReadOnlyPipe.prototype.manageMapObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.result = [];
        value.forEach(function (obj, key) {
            if (obj instanceof Object) {
                obj = _this.manageObjectList(obj, 1);
                _this.result = _this.result.concat(obj);
            }
            else {
                _this.result.push({ key: key, obj: obj });
            }
        });
        return this.result;
    };
    /**
     * @param {?} objList
     * @param {?=} depth
     * @param {?=} into
     * @return {?}
     */
    ReadOnlyPipe.prototype.manageObjectList = /**
     * @param {?} objList
     * @param {?=} depth
     * @param {?=} into
     * @return {?}
     */
    function (objList, depth, into) {
        var _this = this;
        if (depth === void 0) { depth = 0; }
        if (into === void 0) { into = 0; }
        var /** @type {?} */ keyArr = Object.keys(objList);
        var /** @type {?} */ arrRes = {};
        keyArr.forEach(function (key) {
            if (_this.isCyclic(objList[key])) {
                if (into <= depth) {
                    into++;
                    arrRes[key] = _this.manageObjectList(objList[key], depth, into);
                }
            }
            else {
                arrRes[key] = objList[key];
            }
        });
        return arrRes;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ReadOnlyPipe.prototype.isCyclic = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var /** @type {?} */ seenObjects = [];
        var /** @type {?} */ detect = function (o) {
            if (typeof o === 'object') {
                if (seenObjects.indexOf(o) !== -1) {
                    return true;
                }
                seenObjects.push(o);
                for (var /** @type {?} */ key in o) {
                    if (o.hasOwnProperty(key) && detect(o[key])) {
                        return true;
                    }
                }
            }
            return false;
        };
        return detect(obj);
    };
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    ReadOnlyPipe.prototype.manageArray = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (args === void 0) { args = []; }
        var /** @type {?} */ keyArr = Object.keys(value);
        var /** @type {?} */ dataArr = [];
        var /** @type {?} */ keyName = args[0] ? args[0] : 'key';
        keyArr.forEach(function (key) {
            if (!isObject(value[key])) {
                value[key] = { value: value[key] };
            }
            value[key][keyName] = key;
            dataArr.push(value[key]);
        });
        if (args[1]) {
            dataArr.sort(function (a, b) {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }
        return dataArr;
    };
    ReadOnlyPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'readOnly',
                },] },
    ];
    /** @nocollapse */
    ReadOnlyPipe.ctorParameters = function () { return []; };
    return ReadOnlyPipe;
}());
export { ReadOnlyPipe };
function ReadOnlyPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReadOnlyPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReadOnlyPipe.ctorParameters;
    /** @type {?} */
    ReadOnlyPipe.prototype.result;
}
//# sourceMappingURL=readonly.pipe.js.map