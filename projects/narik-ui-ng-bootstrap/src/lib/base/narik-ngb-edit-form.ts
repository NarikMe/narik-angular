import { NarikEditForm } from '@narik/app-core';
import { NarikInject } from '@narik/core';
import { NarikEntity } from '@narik/infrastructure';

import { Injector, Renderer2 } from '@angular/core';

export class NarikUiEditForm<T extends NarikEntity> extends NarikEditForm<T> {
    @NarikInject(Renderer2)
    renderer: Renderer2;

    constructor(injector: Injector) {
        super(injector);
    }

    submit() {
        if (this.formElement) {
            this.renderer.addClass(
                this.formElement.nativeElement,
                'was-validated'
            );
        }
        super.submit();
    }
}
