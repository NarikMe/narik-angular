import { NarikInject } from '@narik/core';
import {
  CommandInfo,
  DIALOG_REF,
  DialogRef,
  NarikEntity,
  CommandHost,
  ParameterResolver,
  MODULE_DATA_KEY,
  NarikComponent,
  MODULE_UI_KEY,
  CommandProcessor,
  PARAMETERS,
} from '@narik/infrastructure';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';

import {
  ChangeDetectorRef,
  Injector,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Type,
} from '@angular/core';

import { PARAMETER_RESOLVER } from '../injectionTokens';
import { BusyIndicator } from '../interfaces/busy-indicator';
import { NarikParameterResolver } from '../services/narik-parameter-resolver';
import { QueryService } from '../services/queryService';
import { QUERY_SERVICE_TYPE } from '../internal-injectionTokens';

/**
 * Narik general form
 */
export class NarikGeneralForm<TE extends NarikEntity>
  extends NarikComponent
  implements CommandHost, OnChanges {
  private changeSubject = new ReplaySubject(1);

  change$: Observable<any>;

  get isInDialog(): boolean {
    return !!this.dialogRef;
  }

  protected parameterResolver: ParameterResolver;
  protected queryService: QueryService<TE>;

  @NarikInject(CommandProcessor)
  commandProcessor: CommandProcessor;

  @NarikInject(DIALOG_REF)
  dialogRef: DialogRef<NarikGeneralForm<any>>;

  @NarikInject(ChangeDetectorRef)
  protected changeDetectorRef: ChangeDetectorRef;

  @NarikInject(QUERY_SERVICE_TYPE)
  protected queryServiceType: Type<QueryService<any>>;

  @NarikInject(MODULE_DATA_KEY)
  moduleDataKey: string;

  @NarikInject(MODULE_UI_KEY)
  moduleUiKey: string;

  @NarikInject(PARAMETERS, null)
  parameters: any;

  _isBusy: boolean;
  set isBusy(value: boolean) {
    if (this.busyIndicator) {
      this.busyIndicator.isBusy = value;
    }
    this._isBusy = value;
  }
  get isBusy(): boolean {
    return this._isBusy;
  }

  @ViewChild(BusyIndicator, { static: true }) busyIndicator: BusyIndicator;

  constructor(private injector: Injector) {
    super();

    const localInjector = Injector.create({
      parent: injector,
      providers: [
        { provide: NarikGeneralForm, useValue: this },
        {
          provide: PARAMETER_RESOLVER,
          useClass: NarikParameterResolver,
          deps: [Injector, NarikGeneralForm],
        },
        {
          provide: QueryService,
          useClass: this.queryServiceType,
          deps: [Injector],
        },
      ],
    });

    this.parameterResolver = localInjector.get(PARAMETER_RESOLVER);
    this.queryService = localInjector.get(QueryService);
    this.change$ = this.changeSubject.asObservable();
    this.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.detectChanges();
  }

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'close' && this.dialogRef) {
      this.dialogRef.close(
        {
          componentInstance: this,
          dialogResult: 'close',
        },
        'CONTENT'
      );
    } else {
      this.commandProcessor.processCommand(this, cmd);
    }

    this.detectChanges();
  }

  protected detectChanges() {
    this.changeSubject.next();
  }
}
