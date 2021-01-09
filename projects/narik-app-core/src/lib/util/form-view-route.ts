import { Route } from '@angular/router';
import { FormContainerComponent } from '../components/formContainer/form-container.component';

export function FormViewRoute(moduleKey: string): Route[] {
    return [
        {
            path: '**',
            component: FormContainerComponent,
            data: {
                moduleKey: moduleKey,
            },
        },
    ];
}
