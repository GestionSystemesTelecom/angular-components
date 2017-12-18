import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
export declare class BusyService {
    busyObservable: Observable<boolean>;
    private busyObserver;
    constructor();
    show(): void;
    hide(): void;
}
