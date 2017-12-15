import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class BusyService {

    public busyObservable: Observable<boolean>;
    private busyObserver: Observer<boolean>;

    constructor() {
        this.busyObservable = new Observable<boolean>((observer) => {
                this.busyObserver = observer;
            }
        ).share();
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
