import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormContainerComponent } from '@zaptern-somp-frontend/components';
import {
  ErrorMessageProcessor,
  FormValidator,
} from '@zaptern-somp-frontend/services';
import { ALPHANUMERIC_SPECIAL_REGEX } from '@zaptern-somp-frontend/helpers';

@Component({
  selector: 'somp-health-info-form',
  standalone: true,
  templateUrl: './health-info-form.component.html',
  styleUrls: ['./health-info-form.component.scss'],
  imports: [CommonModule, FormContainerComponent, ReactiveFormsModule],
})
export class HealthInfoFormComponent {
  healthForm!: FormGroup;
  errorMsgs: { [key: string]: string } = {};
  private formErrorMsgProcessor: ErrorMessageProcessor;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      medicalConditions: {
        required: 'Medical conditions are required.',
      },
      medicalConditionsDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
      medications: {
        required: 'Medications are required.',
      },
      medicationsDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
      allergies: {
        required: 'Allergies are required.',
      },
      allergiesDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
      vaccinated: {
        required: 'Vaccinated are required.',
      },
      vaccinatedDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
      surgeries: {
        required: 'Surgeries are required.',
      },
      surgeriesDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
      accommodations: {
        required: 'Accommodations are required.',
      },
      accommodationsDetails: {
        pattern: 'Please use only letters, numbers and special characters.',
      },
    };

    this.formErrorMsgProcessor = FormValidator.intValidator(
      this.validationMessages
    );
  }

  private initForm(): void {
    this.healthForm = this.fb.group({
      medicalConditions: ['', [Validators.required]],
      medicalConditionsDetails: [
        '',
        [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)],
      ],
      medications: ['', [Validators.required]],
      medicationsDetails: [
        '',
        [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)],
      ],
      allergies: ['', [Validators.required]],
      allergiesDetails: ['', [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)]],
      vaccinated: ['', [Validators.required]],
      vaccinatedDetails: ['', [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)]],
      surgeries: ['', [Validators.required]],
      surgeriesDetails: ['', [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)]],
      accommodations: ['', [Validators.required]],
      accommodationsDetails: [
        '',
        [Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)],
      ],
    });

    this.healthForm.valueChanges.subscribe(() => {
      this.errorMsgs = this.formErrorMsgProcessor.processMessages(
        this.healthForm!
      );
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
