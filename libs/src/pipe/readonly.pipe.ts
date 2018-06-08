import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'util';

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

    private result: any;

    public transform(value: any, args: any[] = []): any {
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

    private manageObjectList(objList: any, depth: number = 0, into: number = 0) {
        let keyArr: any = Object.keys(objList);
        let arrRes: any = {};

        keyArr.forEach((key: any) => {

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

    private isCyclic(obj: any) {
        let seenObjects: any = [];

        let detect: any = (o: any) => {
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

    private manageArray(value: any, args: any[] = []): any {
        let keyArr: any = Object.keys(value);
        let dataArr: any = [];
        let keyName: any = args[0] ? args[0] : 'key';

        keyArr.forEach((key: any) => {
            if (!isObject(value[key])) {
                value[key] = { value: value[key] };
            }
            value[key][keyName] = key;
            dataArr.push(value[key]);
        });

        if (args[1]) {
            dataArr.sort((a: any, b: any): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }

        return dataArr;
    }
}
