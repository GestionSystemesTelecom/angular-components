# Modal

Modal provider based on [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) modal.

# Installation

* install library: `npm install gst-components`
* add module import declaration

```typescript
  import { AppComponent } from './app.component';
  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  import { ModalModule } from 'gst-components';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      NgbModule.forRoot(),
      ModalModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
```

* Define jQuery for Webpack:

```js
module.exports = function (options) {
    // ...
    plugins: [
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ]
 // ...
```

# Usage

* Add modals container to AppComponent (outer div is mandatory)

```html
<div class="modal-outer-template-div"></div>
```

## Creation of the inner modal component (ex: MyInnerModalComponent)

* Template of MyInnerModalComponent must be surrounded by by the following code

```html
<gst-modal id="AnExpliciteId" [title]="modalTitle">
<!--...-->
</gst-modal>
```

* If you want to close modal from MyInnerModalComponent, you must add `NgbActiveModal` to constructor

```typescript
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class MyInnerModalComponent {
    // Add NgbActiveModal
    constructor(public activeModal: NgbActiveModal) { }
}
```

* Add all modals to the entryComponents section in AppModule

```typescript
entryComponents: [ // Components that be included in the modal
    MyInnerModalComponent
]
```

## Open the inner modal component (ex: MyInnerModalComponent)

* If you want to open the modal, you need to access the modal service

```typescript
import { GSTModal } from 'gst-components';
import { MyInnerModalComponent } from './MyInnerModal.component';

@Component({
  // ...
})
export class HomeComponent {
    constructor(private gstModal: GSTModal) {}

    public openModal() {
        // Use the open function from the NgbModal service whith the MyInnerModalComponent as first parameter
        // To see the list of all secondary parameters, see https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/modal/modal.ts
        const modalRef = this.gstModal.open(MyInnerModalComponent, { size: 'sm' });
        // Set a custom field defined in the MyInnerModalComponent
        modalRef.componentInstance.CustomField = 'value';

        modalRef.result
            // Launch with the function close() of NgbActiveModal
            .then((res) => {
                console.log(res);
            })
            // Launch with the function dismiss() of NgbActiveModal
            .catch((res) => {
                console.error(res);
            });
    }
}
```

