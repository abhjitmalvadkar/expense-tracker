import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  @ViewChild('anchor', {static: true, read: ViewContainerRef}) anchor: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxComponent>
  ) {
  }

  ngOnInit(): void {
    this.anchor.clear();
    const {component} = this.data;
    delete this.data?.component;
    const componentRef = this.anchor.createComponent(component);
    componentRef.instance.data = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
