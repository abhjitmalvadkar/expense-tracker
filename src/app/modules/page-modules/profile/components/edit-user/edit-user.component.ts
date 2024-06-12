import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {CommonService} from "../../../../shared/services/common.service";
import * as fromRoot from "../../../../../state/app.state";
import * as Validation from "../../../../shared/constants/validation.constants";
import {UpdateUserDetailsRequest} from "../../core/profile.actions";


@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() data;
  @ViewChild('thumbnailUploadRef') thumbnailUploadRef: ElementRef;
  validation = Validation;
  userData: any;
  userProfileDetails: any;
  errorMessages = {};
  errorMessageMap = {
    'name': {
      required: 'Required',
    },
    'emailId': {
      required: 'Required',
      pattern: 'Invalid Email'
    }
  }

  thumbnailUrl: string | ArrayBuffer = ''

  form = new FormGroup({
    name: new FormControl({value: null, disabled: false}, [Validators.required]),
    emailId: new FormControl({
      value: null,
      disabled: false
    }, [Validators.required, Validators.pattern(this.validation.email.regex)]),
    logo: new FormControl({value: '', disabled: true}),
  });

  acceptedThumbnailFileTypes = [
    'image/jpeg', // JPG / JPEG
    'image/png', // PNG
  ];
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private store: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    const tempData = JSON.parse(JSON.stringify(this.data))
    if (tempData?.userProfileDetails) {
      this.userProfileDetails = tempData?.userProfileDetails;

      this.form.patchValue({
        name: this.userProfileDetails?.name,
        emailId: this.userProfileDetails?.emailId,
      }, {emitEvent: false});

      this.thumbnailUrl = this.userProfileDetails.imageUrl;

      this.cdRef.detectChanges();
    }
  }

  openFile(id) {
    $(`#${id}`).click();
  }

  save() {
    if (this.form.invalid) {
      this.checkForErrors();
      return;
    }

    const {
      name,
      emailId,
    } = this.form.getRawValue();

    const payload = {
      name,
      emailId,
      imageUrl: this.thumbnailUrl,
    }

    this.store.dispatch(UpdateUserDetailsRequest({payload}));
  }


  checkForErrors(currentField?: string) {
    this.errorMessages = {
      ...this.errorMessages,
      ...(this.commonService.checkFormValidation(this.form, this.errorMessageMap, currentField))
    };
  }

  handleThumbnailUpload(event) {
    const file = event.target.files[0];
    if (file) {
      if (!this.acceptedThumbnailFileTypes.includes(file?.type)) {
        this.commonService.notification('Invalid file type.', 'danger');
        return;
      }

      if (file.size > 100000) {
        this.commonService.notification('File size larger than 50Kb', 'danger');
        return;
      }

      const reader = new FileReader();
      reader.onload = e => this.thumbnailUrl = reader.result;
      reader.readAsDataURL(file);
    }
    this.form.controls.logo.setValue(file.name, {emitEvent: false});
  }


  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
