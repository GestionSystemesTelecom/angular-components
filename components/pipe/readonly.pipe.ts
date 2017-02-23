import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'rxjs/util/isObject';

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
@Pipe({
    name: 'readOnly',
    // pure: false
})
export class ReadOnlyPipe implements PipeTransform {

    private result;

    public transform(value: any, args: any[] = []): Object[] {
        if (value == null) {
            return null;
        }

        if (value instanceof Map) {
            return this.manageMapObject(value);
        } else if (Array.isArray(value) || typeof value === 'object') {
            return this.manageArray(value, args);
        }

        return value;
    }

    private manageMapObject(value: Map<any, any>): Object[] {
        this.result = [];

        value.forEach((obj, key) => {
            if (obj instanceof Object) {
                obj = this.manageObjectList(obj, 1);

                this.result = this.result.concat(obj);

            } else {
                this.result.push({ key, obj });
            }
        });

        return this.result;
    }

    private manageObjectList(objList, depth = 0, into = 0) {
        let keyArr = Object.keys(objList);
        let arrRes = {};

        keyArr.forEach((key) => {

            if (this.isCyclic(objList[key])) {

                if (into <= depth) {
                    into++;
                    arrRes[key] = this.manageObjectList(objList[key], depth, into);
                }

            } else {
                arrRes[key] = objList[key];
            }
        });

        return arrRes;
    }

    private isCyclic(obj) {
        let seenObjects = [];

        let detect = (o) => {
            if (typeof o === 'object') {
                if (seenObjects.indexOf(o) !== -1) {
                    return true;
                }
                seenObjects.push(o);
                for (let key in o) {
                    if (o.hasOwnProperty(key) && detect(o[key])) {
                        return true;
                    }
                }
            }
            return false;
        };

        return detect(obj);
    }

    private manageArray(value: any, args: any[] = []): Object[] {
        let keyArr = Object.keys(value);
        let dataArr = [];
        let keyName = args[0] ? args[0] : 'key';

        keyArr.forEach((key) => {
            if (!isObject(value[key])) {
                value[key] = { value: value[key] };
            }
            value[key][keyName] = key;
            dataArr.push(value[key]);
        });

        if (args[1]) {
            dataArr.sort((a: Object, b: Object): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }

        return dataArr;
    }
}
