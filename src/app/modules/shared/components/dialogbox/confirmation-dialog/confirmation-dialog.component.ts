import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @ViewChild('anchor', {static: true, read: ViewContainerRef}) anchor: any;

  message: string;
  submitText: string;
  handleSubmit: () => void;
  cancelText: string;
  handleCancel: () => void;

  showSubmit = false;
  showCancel = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.message = this.data?.message;
    this.submitText = this.data?.submitText;
    this.handleSubmit = this.data?.handleSubmit;
    this.cancelText = this.data?.cancelText;
    this.handleCancel = this.data?.handleCancel;

    if (this.submitText && this.handleSubmit) {
      this.showSubmit = true;
    }

    if (this.cancelText && this.handleCancel) {
      this.showCancel = true;
    }
  }
}
