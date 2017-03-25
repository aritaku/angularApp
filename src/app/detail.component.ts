import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
  selector: "detail-dialog",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent{

  @Input() tourData;
  @ViewChild("lgModal") modalRef:ModalDirective;

  constructor(){}

  openDialog() {
    this.modalRef.show();
  }
}
