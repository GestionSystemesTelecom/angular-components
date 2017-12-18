import { PipeTransform } from '@angular/core';
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
export declare class ReadOnlyPipe implements PipeTransform {
    private result;
    transform(value: any, args?: any[]): any;
    private manageMapObject(value);
    private manageObjectList(objList, depth?, into?);
    private isCyclic(obj);
    private manageArray(value, args?);
}
