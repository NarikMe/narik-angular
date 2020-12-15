import { ReplaySubject } from 'rxjs';

import {
  ElementRef,
  TemplateRef,
  Type,
  ViewContainerRef,
  StaticProvider,
  EventEmitter,
  ComponentFactoryResolver,
  ComponentFactory,
} from '@angular/core';

import { EntityField, FieldTypes } from '../interfaces/meta-data.model';

/**
 * Message type
 */
export enum MessageType {
  Success = 'Success',
  Error = 'Error',
  Warn = 'Warn',
  Info = 'Info',
}

/**
 * Dialog container
 */
export interface DialogContainer {
  readonly contentContainerRef: ViewContainerRef;
  options: DialogOption;
  actions: DialogAction[];
  title: string;
  dialogRef: DialogRef<any>;
  isOpen: boolean;
  closeAnimationCompleted: EventEmitter<any>;
}

/**
 * Dialog overlay container
 */
export interface DialogOverlayContainer {
  readonly contentContainerRef: ViewContainerRef;
  options: DialogOption;
  dialogRef: DialogRef<any>;
}

/**
 * Dialog action
 * Dialog Buttons that should be shown in dialog.
 */
export interface DialogAction {
  /**
   * result returned when button click
   */
  dialogResult: string;

  /**
   * label of button
   */
  label?: string;

  /**
   * icon of button.
   */
  icon?: string;

  /**
   * color of button
   */
  color?: string;
}

/**
 * Dialog option
 */
export interface DialogOption {
  /**
   * a css class that added to dialog ui root element
   */
  dialogCssClass?: string;

  /**
   * width of dialog
   */
  width?: string;

  /**
   * Height of dialog
   */
  height?: string;

  /**
   * the button that must be focus.
   */
  defaultAction?: string;

  /**
   * Is dialog FullScreen
   */
  isFullScreen?: boolean;

  /**
   * show Backdrop
   */
  showBackdrop?: boolean;

  /**
   * close dialog automatically
   */
  disableAutoClose?: boolean;

  /**
   * dialog open animation
   */
  animation?: string;
}

/**
 * Dialog result
 * Result returns when dialog close.
 */
export interface DialogResult<T> {
  /**
   * component Instance that has been displayed in dialog.
   */
  componentInstance: T;

  /**
   * dialog Result
   */
  dialogResult?: string;

  /**
   * data
   */
  data?: any;
}

/**
 * Dialog input content
 */
export interface DialogInputContent {
  entity: any;
  fields: any[];
}

/**
 * Dialog event
 */
export interface DialogEvent {
  eventType: string;
  eventData?: any;
  eventSource?: 'DIALOG' | 'CONTENT';
}

/**
 * Dialog ref
 */
export interface DialogRef<T> {
  /**
   * Unique id of dialog
   */
  readonly id: string;

  /**
   *  component Instance that has been displayed in dialog.
   */
  readonly componentInstance: T;

  /**
   * closed promise of dialog.
   */
  readonly closed: Promise<DialogResult<T>>;

  /**
   * event subject of dialog.
   */
  readonly events: ReplaySubject<DialogEvent>;

  /**
   * dialogResultTransformer
   */
  dialogResultTransformer: (result: DialogResult<T>) => DialogResult<T>;
  element: ElementRef<any>;
  container: DialogContainer;
  /**
   * close the dialog
   * @param [dialogResult]  result that should be returned
   * @param [eventSource] who call the close.
   */
  close(dialogResult?: DialogResult<any>, eventSource?: 'DIALOG' | 'CONTENT');
}

/**
 * Dialog service
 * abstract class that contains all methods of dialog service.
 */
export abstract class DialogService {
  /**
   * return active dialog id
   * @returns active dialog id
   */
  abstract activeDialogId(): string;

  /**
   * check element is inside active dialog
   * @returns boolean
   */
  abstract isElementInActiveDialog(el: ElementRef): boolean;

  /**
   * show an error
   * @param message error message.
   * @param [title] title of error
   * @param [options] options of message
   * @returns error
   */
  abstract error(
    message: string | string[] | any,
    title?: string,
    options?: any
  ): any;

  /**
   * show an message
   * @param message  message.
   * @param [title] title of message
   * @param [options] options of message
   * @returns error
   */

  abstract showMessage(
    message: string | string[],
    title?: string,
    type?: MessageType,
    options?: any
  ): any;

  /**
   * Shows an component or template inside dialog.
   * @param content component or dialog.
   * @param [title] title of dialog.
   * @param [data] data that should send to component inside dialog.
   * @param [actions] actions of dialog.
   * @param [options] options of dialog.
   * @param [validateOnClose] call before dialog close.
   * @param [onClose] call when dialog close.
   * @param [providers] use when it's necessary that dialog use specific providers.
   * @returns dialog dialog
   */
  abstract showDialog<T>(
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
  ): DialogRef<T>;

  /**
   * Shows confirm message
   * @param message message
   * @param [title] title of confirm dialog
   * @param [actions] actions of dialog.
   * @param [onResult] call after select one action
   * @returns confirm confirm dialog
   */
  abstract showConfirm(
    message: string,
    title?: string,
    actions?: DialogAction[],
    onResult?: (dialogResult: DialogResult<any>) => void
  ): DialogRef<any>;

  /**
   * Shows message box
   * @param message message
   * @param [title] title of dialog
   * @returns message box dialog
   */
  abstract showMessageBox(message: string, title?: string): DialogRef<any>;

  /**
   * Shows input dialog (a dialog that contains dynamic form elements)
   * @param message message
   * @param [title] title of dialog
   * @param [fields] fields that display on dialog
   * @param [entity] entity that bind to fields elements
   * @param [onResult]  call after select one action
   * @param [actions] actions of dialog.
   * @param [options] options of dialog.
   * @returns input  dialog
   */
  abstract showInput(
    message: string,
    title?: string,
    fields?: EntityField[],
    entity?: any,
    onResult?: (dialogResult: DialogResult<DialogInputContent>) => void,
    actions?: DialogAction[],
    options?: DialogOption
  ): DialogRef<DialogInputContent>;

  /**
   * Shows text input dialog (a dialog that contains a text box)
   * @param message message
   * @param [title] title of dialog
   * @param [placeHolder] placeHolder of text box
   * @param [defaultValue] defaultValue of text box
   * @param [fieldType] fieldType of text box
   * @param [entity] entity that bind to fields elements
   * @param [onResult]  call after select one action
   * @param [actions] actions of dialog.
   * @param [options] options of dialog.
   * @returns input  dialog
   */
  abstract showTextInput(
    message: string,
    title?: string,
    placeHolder?: string,
    fieldType?: FieldTypes,
    defaultValue?: any,
    onResult?: (dialogResult: DialogResult<DialogInputContent>) => void,
    actions?: DialogAction[],
    options?: DialogOption
  ): DialogRef<any>;

  /**
   * Shows content show a html content in dialog
   * @param content  content of dialog
   * @param [title] title of dialog
   * @returns content  dialog
   */
  abstract showContent(content: string, title?: string): DialogRef<any>;

  /**
   * Closes dialog
   * @param dialog  dialog
   * @param [dialogResult]  dialog result
   * @param [eventSource] dialog event source
   */
  abstract close(
    dialog: DialogRef<any> | string,
    dialogResult?: DialogResult<any>,
    eventSource?: 'DIALOG' | 'CONTENT'
  );

  /**
   * Closes all open dialogs
   * @param [force] force
   */
  abstract closeAll(force?: boolean);
}
