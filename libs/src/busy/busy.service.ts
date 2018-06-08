import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class BusyService {

    public busyObservable: Observable<boolean>;
    private busyObserver: Observer<boolean>;

    constructor() {

        this.busyObservable = (<any> new Observable<boolean>((observer) => {
                this.busyObserver = observer;
            }
        )).pipe(share());
    }

    public show() {
        if (this.busyObserver) {
            this.busyObserver.next(true);
        }
    }

    public hide() {
        if (this.busyObserver) {
            this.busyObserver.next(false);
        }
    }
}
