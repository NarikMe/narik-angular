export abstract class  BusyIndicator {
  isBusy: boolean;
  busyMessage: string;
  abstract setBusy(busyStatus: boolean, msg?: string);
}
