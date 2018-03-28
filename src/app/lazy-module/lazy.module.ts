import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyComponent } from './lazy.component';
import { LazyModalComponent } from './lazy-modal.component';

import { LazyRoutingModule } from './lazy-routing.module';
import { ModalModule } from '../modules';

@NgModule({
    imports: [
        CommonModule,
        LazyRoutingModule,
        ModalModule.forRoot()
    ],
    declarations: [
        LazyComponent,
        LazyModalComponent
    ],
    entryComponents: [
        LazyModalComponent
    ]
})
export class LazyModule { }
