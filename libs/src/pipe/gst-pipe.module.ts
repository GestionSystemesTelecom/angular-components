import { NgModule } from '@angular/core';
import { ReadOnlyPipe } from './readonly.pipe';

@NgModule({
    declarations: [
        ReadOnlyPipe
    ],
    exports: [
        ReadOnlyPipe
    ]
})
export class GSTPipeModule {
    public static forRoot() {
      return {
          ngModule: GSTPipeModule,
          providers: [],
      };
   }
}
