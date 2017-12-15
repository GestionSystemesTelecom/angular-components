import { NgModule } from '@angular/core';
import { BusyComponent } from './busy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    providers: [], // leave empty to avoid multiple instances
    imports: [ BrowserAnimationsModule ],
    declarations: [ BusyComponent ],
    exports: [ BusyComponent ]
})
export class BusyModule {
}
