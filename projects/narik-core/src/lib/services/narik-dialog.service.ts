import {
  EntityField,
  DialogInputContent,
  ModuleManager,
  PARAMETERS,
} from '@narik/infrastructure';
import { UUID } from 'angular2-uuid';

import {
  DialogService,
  MessageType,
  DialogOption,
  DialogResult,
  DialogRef,
  DialogAction,
  DIALOG_CONTAINER,
  DialogContainer,
  EventAggregatorService,
  ModuleInfo,
  DIALOG_OVERLAY_CONTAINER,
  DialogOverlayContainer,
  DialogEvent,
  DIALOG_MESSAGE_COMPONENT,
  DIALOG_CONTENT_COMPONENT,
  DIALOG_INPUT_COMPONENT,
  FieldTypes,
  DIALOG_REF,
} from '@narik/infrastructure';
import {
  Injectable,
  Type,
  TemplateRef,
  Inject,
  ComponentFactoryResolver,
  ApplicationRef,
  ComponentRef,
  Injector,
  ComponentFactory,
  NgModuleRef,
  ElementRef,
  StaticProvider,
  Renderer2,
  RendererFactory2,
  Optional,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { isString, isArray, isFunction } from '@narik/common';
import { filter } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import {
  NarikInject,
  NarikGlobalInject,
} from '../decorators/narik-inject.decorator';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';
import { TOASTR_OPTION } from '../injectionTokens';

@Injectable({
  providedIn: 'root',
})
export class NarikDialogService extends DialogService {
  private openDialogs = new Map<string, DialogRef<any>>();
  private injectors: Injector[] = [];
  nextUniqueId = 1;
  @NarikInject(ToastrService)
  private toastrService: ToastrService;

  @NarikInject(TranslateService)
  private translateService: TranslateService;

  @NarikGlobalInject(DIALOG_MESSAGE_COMPONENT)
  messageComponent: Type<any>;

  @NarikGlobalInject(DIALOG_INPUT_COMPONENT)
  inputComponent: Type<DialogInputContent>;

  @NarikInject(DIALOG_CONTENT_COMPONENT)
  contentComponent: Type<any>;

  @NarikGlobalInject(DIALOG_CONTAINER)
  dialogContainerType: Type<DialogContainer>;

  @NarikInject(RendererFactory2)
  rendererFactory: RendererFactory2;

  constructor(
    private injector: Injector,
    @Inject(DIALOG_OVERLAY_CONTAINER)
    private dialogOverlayContainerType: Type<DialogOverlayContainer>,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventAggregatorService: EventAggregatorService,
    private moduleManager: ModuleManager,
    moduleRef: NgModuleRef<any>,
    @Inject(DOCUMENT) private document,
    @Optional()
    @Inject(TOASTR_OPTION)
    private toastrOption: GlobalConfig
  ) {
    super();
    this.registerModule(moduleRef, componentFactoryResolver, injector);
    this.moduleManager.narikLoaded.subscribe(() => {
      this.eventAggregatorService
        .listen<{ moduleKey: string }>('MODULE_LOAD_COMPLETELY')
        .subscribe((module: { moduleKey: string; moduleInfo: ModuleInfo }) => {
          if (module.moduleInfo && module.moduleInfo.module) {
            this.registerModule(
              module.moduleInfo.module,
              module.moduleInfo.module.componentFactoryResolver,
              module.moduleInfo.module.injector
            );
          }
        });
    });
  }

  private registerModule(
    moduleRef: NgModuleRef<any>,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    if (injector) {
      this.injectors.push(injector);
    }
  }

  activeDialogId(): string {
    const itemKeys = this.openDialogs.entriesArray();
    if (itemKeys.length > 0) {
      return itemKeys[itemKeys.length - 1].key;
    }
    return undefined;
  }

  isElementInActiveDialog(el: ElementRef): boolean {
    const activeDialogId = this.activeDialogId();
    if (!activeDialogId) {
      return true;
    }
    const parent = el.nativeElement.closest(
      `[narik-dialog-id="${activeDialogId}"]`
    );
    return !!parent;
  }

  error(message: string | string[] | any, title?: string, options?: any) {
    this.showMessage(message, title, MessageType.Error, {
      ...this.toastrOption,
      ...options,
    });
  }
  showMessage(
    message: string | string[],
    title?: string,
    type?: MessageType,
    options?: any
  ) {
    options = {
      ...this.toastrOption,
      ...options,
    };
    if (isArray(message)) {
      message = (message as string[])
        .map((x) => this.translateService.instant(x))
        .join(' ');
    } else if (isString(message)) {
      message = this.translateService.instant(message);
    } else {
      message = Object.keys(message)
        .map((x) => this.translateService.instant(message[x]))
        .join(' ');
    }
    type = type || MessageType.Success;
    switch (type) {
      case MessageType.Success: {
        this.toastrService.success(message as string, title, options);
        break;
      }
      case MessageType.Info: {
        this.toastrService.info(message as string, title, options);
        break;
      }
      case MessageType.Warn: {
        this.toastrService.warning(message as string, title, options);
        break;
      }
      case MessageType.Error: {
        this.toastrService.error(message as string, title, options);
        break;
      }
      default:
        this.toastrService.success(message as string, title, options);
    }
  }

  showDialog<T>(
    content: Type<any> | TemplateRef<any> | ComponentFactory<any>,
    title?: string,
    data?: any,
    actions?: DialogAction[],
    options?: DialogOption,
    validateOnClose?: (
      dialogResult: DialogResult<T>
    ) => boolean | Promise<boolean>,
    onClose?: (dialogResult: DialogResult<T>) => void,
    providers?: StaticProvider[]
  ): DialogRef<T> {
    options = options || {};
    const containers = this.createDialogContainer(options, actions, title);
    const dialogContainerRef = containers.container;
    const dialogOverlayContainerRef = containers.overLaycontainer;

    const result = new NarikDialogRef<T>('dialog-' + UUID.UUID(), null);
    const renderer = this.rendererFactory.createRenderer(null, null);
    renderer.setAttribute(
      dialogContainerRef.location.nativeElement,
      'narik-dialog-id',
      result.id
    );
    result.container = dialogContainerRef.instance;
    if (content instanceof TemplateRef) {
      const dialogContent = dialogContainerRef.instance.contentContainerRef.createEmbeddedView(
        content,
        data || {}
      );
    } else if (content instanceof Type || content instanceof ComponentFactory) {
      const factory =
        content instanceof ComponentFactory
          ? content
          : this.componentFactoryResolver.resolveComponentFactory(
              content as Type<T>
            );
      providers = providers || [];
      providers.push({ provide: DIALOG_REF, useValue: result });
      providers.push({ provide: PARAMETERS, useValue: data });

      let parentInjector: Injector = this.injector;

      if ((factory as any).ngModule) {
        parentInjector = ((factory as any).ngModule as NgModuleRef<any>)
          .injector;
      }

      const localInjector = Injector.create({
        providers: providers,
        parent: parentInjector,
      });

      const dialogContent = dialogContainerRef.instance.contentContainerRef.createComponent(
        factory,
        undefined,
        localInjector
      );

      // apply data on component inputs
      if (data) {
        for (const input of factory.inputs) {
          if (Object.prototype.hasOwnProperty.call(data, input.propName)) {
            dialogContent.instance[input.propName] = data[input.propName];
          }
        }
      }

      result.componentInstance = dialogContent.instance;
    }
    result.element = dialogOverlayContainerRef.location.nativeElement;
    const overlayContainer = this.injector.get(OverlayContainer, undefined);
    if (overlayContainer) {
      const host = overlayContainer.getContainerElement();
      const pane = this.document.createElement('div');
      pane.id = `cdk-overlay-dialog-${this.nextUniqueId++}`;
      pane.classList.add('cdk-overlay-pane');
      host.appendChild(pane);
      pane.appendChild(dialogOverlayContainerRef.location.nativeElement);
    } else {
      this.document.body.appendChild(
        dialogOverlayContainerRef.location.nativeElement
      );
    }

    setTimeout(() => {
      dialogContainerRef.instance.isOpen = true;
    }, 100);
    dialogOverlayContainerRef.instance.dialogRef = result;
    dialogContainerRef.instance.dialogRef = result;

    result.dialogOverlayContainerRef = dialogOverlayContainerRef;

    this.openDialogs.set(result.id, result);

    if (onClose) {
      result.closed.then((x) => {
        onClose(x);
      });
    }
    result.events
      .pipe(filter((x) => x.eventType === 'CLOSE_REQUEST'))
      .subscribe((e: DialogEvent) => {
        if (
          result.componentInstance &&
          isFunction((<any>result.componentInstance).onCloseRequest)
        ) {
          (<any>result.componentInstance).onCloseRequest(e);
        }
        if (validateOnClose) {
          const validateResult = validateOnClose(e.eventData);
          if (validateResult instanceof Promise) {
            (validateResult as Promise<boolean>).then((x) => {
              if (x) {
                this.close(result, e.eventData, e.eventSource);
              }
            });
          } else if (validateResult === true) {
            this.close(result, e.eventData, e.eventSource);
          }
        } else {
          this.close(result, e.eventData, e.eventSource);
        }
      });
    return result;
  }

  showConfirm(
    message: string,
    title?: string,
    actions?: DialogAction[],
    onResult?: (dialogResult: DialogResult<any>) => void
  ): DialogRef<any> {
    return this.showDialog(
      this.messageComponent,
      title,
      {
        message: message,
      },
      actions || [...DialogActions.yes_no],
      undefined,
      undefined,
      onResult
    );
  }
  showMessageBox(message: string, title?: string): DialogRef<any> {
    return this.showDialog(
      this.messageComponent,
      title,
      {
        message: message,
      },
      [DialogActions.ok]
    );
  }
  showInput(
    message: string,
    title?: string,
    fields?: EntityField[],
    entity?: any,
    onResult?: (dialogResult: DialogResult<DialogInputContent>) => void,
    actions?: DialogAction[],
    options?: DialogOption
  ): DialogRef<any> {
    const dialogRef = this.showDialog(
      this.inputComponent,
      title,
      {
        message: message,
        fields: fields,
        entity: entity,
      },
      actions || [...DialogActions.ok_cancel],
      options || {
        showBackdrop: true,
        disableAutoClose: true,
      },
      undefined,
      onResult
    );
    dialogRef.dialogResultTransformer = (
      dr: DialogResult<DialogInputContent>
    ) => {
      return {
        componentInstance: dr.componentInstance,
        data: dr.componentInstance.entity,
        dialogResult: dr.dialogResult,
      };
    };
    return dialogRef;
  }
  showTextInput(
    message: string,
    title?: string,
    placeHolder?: string,
    fieldType?: FieldTypes,
    defaultValue?: any,
    onResult?: (dialogResult: DialogResult<DialogInputContent>) => void,
    actions?: DialogAction[],
    options?: DialogOption
  ): DialogRef<any> {
    return this.showInput(
      message,
      title,
      [
        {
          name: 'input',
          fieldType: fieldType || FieldTypes.Text,
          options: {
            plaveHolder: placeHolder,
          },
        },
      ],
      {
        input: defaultValue,
      },
      onResult,
      actions,
      options
    );
  }
  showContent(content: string, title?: string): DialogRef<any> {
    return this.showDialog(
      this.contentComponent,
      title,
      {
        content: content,
      },
      [DialogActions.ok]
    );
  }

  closeAll(force?: boolean) {
    for (const dialog of this.openDialogs.valuesArray()) {
      dialog.close();
    }
  }
  close(
    dialog: DialogRef<any> | string,
    dialogResult?: DialogResult<any>,
    eventSource?: 'DIALOG' | 'CONTENT'
  ) {
    let _dialog: DialogRef<any>;
    if (isString(dialog)) {
      _dialog = this.openDialogs.get(dialog as string);
    } else {
      _dialog = dialog as DialogRef<any>;
    }
    if (_dialog.container.closeAnimationCompleted) {
      _dialog.container.closeAnimationCompleted.pipe(take(1)).subscribe((x) => {
        this.doClose(_dialog, dialogResult, eventSource);
      });
      _dialog.container.isOpen = false;
    } else {
      this.doClose(_dialog, dialogResult, eventSource);
    }
  }

  private doClose(
    _dialog: DialogRef<any>,
    dialogResult?: DialogResult<any>,
    eventSource?: 'DIALOG' | 'CONTENT'
  ) {
    _dialog.events.next({
      eventType: 'CLOSED',
      eventData: dialogResult,
      eventSource: eventSource,
    });
    const parentElement =
      (<any>_dialog.element).parentElement || this.document.body;
    parentElement.removeChild(_dialog.element);
    this.openDialogs.delete(_dialog.id);
  }

  private createDialogContainer(
    options: DialogOption,
    actions: DialogAction[],
    title: string
  ): {
    overLaycontainer: ComponentRef<DialogOverlayContainer>;
    container: ComponentRef<DialogContainer>;
  } {
    const overlayRef = this.createOverlay(options);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.dialogContainerType
    );

    const containerRef = overlayRef.instance.contentContainerRef.createComponent(
      factory
    );

    containerRef.instance.options = options || {};
    containerRef.instance.title = title;
    containerRef.instance.actions = actions;

    return {
      overLaycontainer: overlayRef,
      container: containerRef,
    };
  }

  createOverlay(options: DialogOption): ComponentRef<DialogOverlayContainer> {
    const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.dialogOverlayContainerType
    );
    const componentRef = overlayFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.instance.options = options || {};
    return componentRef;
  }
}

export class NarikDialogRef<T> implements DialogRef<T> {
  _closed: Promise<DialogResult<T>>;
  dialogResultTransformer: (result: DialogResult<T>) => DialogResult<T>;

  public eventSubject = new ReplaySubject<DialogEvent>(10);
  id: string;
  componentInstance: T;
  container: DialogContainer;
  dialogOverlayContainerRef: ComponentRef<any>;
  get closed(): Promise<DialogResult<T>> {
    return this._closed;
  }
  element: ElementRef<any>;
  get events(): ReplaySubject<DialogEvent> {
    return this.eventSubject;
  }

  constructor(id: string, componentInstance: T) {
    this.id = id;
    this.componentInstance = componentInstance;
    this._closed = new Promise((resolve, reject) => {
      this.events
        .pipe(
          filter((x) => x.eventType === 'CLOSED'),
          first()
        )
        .subscribe((e: DialogEvent) => {
          resolve(
            this.dialogResultTransformer
              ? this.dialogResultTransformer(e.eventData)
              : e.eventData
          );
          if (this.dialogOverlayContainerRef) {
            this.dialogOverlayContainerRef.destroy();
          }
        });
    });
  }

  close(dialogResult?: DialogResult<any>, eventSource?: 'DIALOG' | 'CONTENT') {
    this.eventSubject.next({
      eventType: 'CLOSE_REQUEST',
      eventData: dialogResult,
      eventSource: eventSource,
    });
  }
}

export class DialogActions {
  static ok: DialogAction = {
    label: 'ok',
    dialogResult: 'ok',
  };
  static cancel: DialogAction = {
    label: 'cancel',
    dialogResult: 'cancel',
  };
  static yes: DialogAction = {
    label: 'yes',
    dialogResult: 'yes',
  };
  static no: DialogAction = {
    label: 'no',
    dialogResult: 'no',
  };

  static ok_cancel = [DialogActions.ok, DialogActions.cancel];
  static yes_no = [DialogActions.yes, DialogActions.no];
}
