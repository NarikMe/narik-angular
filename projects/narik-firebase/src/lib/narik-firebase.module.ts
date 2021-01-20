import { NgModule } from '@angular/core';
import { RemoteDataProviderService } from '@narik/infrastructure';
import { NarikFirestoreDataProviderService } from './narik-firestore-data-provider.service';

@NgModule({
    providers: [
        {
            provide: RemoteDataProviderService,
            useClass: NarikFirestoreDataProviderService,
        },
    ],
})
export class NarikFirebaseModule {}
