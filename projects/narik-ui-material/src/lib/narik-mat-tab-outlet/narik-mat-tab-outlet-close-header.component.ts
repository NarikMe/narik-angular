import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";

@Component({
  selector: "narik-mat-tab-header",
  templateUrl: "narik-mat-tab-outlet-close-header.component.html",
  styleUrls: ["narik-mat-tab-outlet-close-header.component.css"]
})
export class NarikMatTabOutletHeaderComponent implements OnInit {
  isOver = false;

  @Input()
  title: string;

  @Output()
  closeRequest = new EventEmitter<any>();

  @HostListener("mouseover") onHover() {
    this.isOver = true;
  }

  @HostListener("mouseleave")
  onLeave() {
    this.isOver = false;
  }

  constructor() {}

  ngOnInit() {}

  requestClose() {
    this.closeRequest.emit();
  }
}
