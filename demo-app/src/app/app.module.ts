import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ModalModule, ModalComponent } from '../../../components';

import { InsideModalComponent } from './home/insidemodal.component';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';

import { NgbModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    InsideModalComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS
  ],
  entryComponents: [ // Components that be included in the modal
    InsideModalComponent
  ]
})
export class AppModule {}
