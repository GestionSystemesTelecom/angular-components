import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { InsideModalComponent } from './home/insidemodal.component';
import { SecondModalComponent } from './home/secondmodal.component';

import { AppRoutingModule } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';

import { GSTModal, BusyService, ModalModule, BusyModule } from './modules';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        InsideModalComponent,
        SecondModalComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        ModalModule.forRoot(),
        AppRoutingModule,
        BusyModule,
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        GSTModal,
        BusyService
    ],
    entryComponents: [ // Components that be included in the modal
        InsideModalComponent,
        SecondModalComponent
    ]
})
export class AppModule {}
