import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyComponent } from './lazy.component';
import { LazyModalComponent } from './lazy-modal.component';

import { LazyRoutingModule } from './lazy-routing.module';

import { ModalModule } from '../../../../components';

@NgModule({
    imports: [
        CommonModule,
        LazyRoutingModule,
        ModalModule
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
