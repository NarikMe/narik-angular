import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import {
    ConfigService,
    DataInfo,
    RemoteDataProviderService,
} from '@narik/infrastructure';
import { from, Observable } from 'rxjs';

@Injectable()
export class NarikFirestoreDataProviderService extends RemoteDataProviderService {
    private entityKeyField: string;
    constructor(private db: AngularFirestore, configService: ConfigService) {
        super();
        this.entityKeyField =
            configService.getConfig('entityKeyField') || 'viewModelId';
    }
    handleData(dataInfo: DataInfo): Observable<any> {
        if (dataInfo.actionType === 'LIST') {
            return this.list(dataInfo);
        } else if (dataInfo.actionType === 'POST') {
            return dataInfo.dataMethod === 'POST'
                ? this.add(dataInfo)
                : this.update(dataInfo);
        } else if (dataInfo.actionType === 'GET') {
            return this.get(dataInfo);
        } else if (dataInfo.actionType === 'DELETE') {
            return this.delete(dataInfo);
        }

        throw new Error(`Not implemented yet: ${dataInfo.actionType}`);
    }
    getDataStream<T = any>(dataInfo: any): Observable<T> {
        return null;
    }

    private list(dataInfo: DataInfo): Observable<any> {
        return this.db
            .collection(dataInfo.dataKey)
            .get()
            .pipe(
                map((data: any) => {
                    return data.docs.map((item) => ({
                        ...item.data(),
                        [this.entityKeyField]: item.id,
                    }));
                })
            );
    }

    private add(dataInfo: DataInfo): Observable<any> {
        return from(
            this.db
                .collection(dataInfo.dataKey)
                .add(dataInfo.dataParameters?.Entity)
                .then((data) => {
                    return {
                        ...dataInfo.dataParameters?.Entity,
                        [this.entityKeyField]: data.id,
                    };
                })
        );
    }

    private update(dataInfo: DataInfo): Observable<any> {
        return from(
            this.db
                .collection(dataInfo.dataKey)
                .doc(dataInfo.dataParameters?.Entity[this.entityKeyField])
                .set(dataInfo.dataParameters?.Entity)
                .then((data) => {
                    return dataInfo.dataParameters?.Entity;
                })
        );
    }

    private get(dataInfo: DataInfo): Observable<any> {
        return from(
            this.db
                .collection(dataInfo.dataKey)
                .doc(dataInfo.urlParameters)
                .get()
                .pipe(
                    map((data: DocumentSnapshot<any>) => {
                        return data.exists
                            ? {
                                  ...data.data(),
                                  [this.entityKeyField]: data.id,
                              }
                            : undefined;
                    })
                )
        );
    }

    private delete(dataInfo: DataInfo): Observable<any> {
        const promises = dataInfo.dataParameters.items.map((i) => {
            return this.db.collection(dataInfo.dataKey).doc(i.id).delete();
        });
        return from(Promise.all(promises));
    }
}
