import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { GSTModal } from './modal.service';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        AngularDraggableModule
    ],
    providers: [], // leave empty to avoid multiple instances
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [NgbModule, GSTModal]
        };
    }
}
