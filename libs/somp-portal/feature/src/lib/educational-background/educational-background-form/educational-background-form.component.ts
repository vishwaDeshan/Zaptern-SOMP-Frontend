import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  TimeLineComponent,
  FormContainerComponent,
  DatePickerComponent,
} from '@zaptern-somp-frontend/components';
import { ErrorMessageProcessor } from '@zaptern-somp-frontend/services';
import { ALPHANUMERIC_SPECIAL_REGEX } from '@zaptern-somp-frontend/helpers';
import { end, start } from '@popperjs/core';

@Component({
  selector: 'somp-educational-background-form',
  standalone: true,
  templateUrl: './educational-background-form.component.html',
  styleUrls: ['./educational-background-form.component.scss'],
  imports: [
    CommonModule,
    TimeLineComponent,
    FormContainerComponent,
    ReactiveFormsModule,
    DatePickerComponent,
  ],
})
export class EducationalBackgroundFormComponent {
  educationForm: FormGroup | undefined;
  isModalOpen: boolean = false;
  isDoing: boolean = false;
  editEducationDetailsId: string | undefined;
  errorMsgs: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private formErrorMsgProcessor: ErrorMessageProcessor | undefined;

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      instituteName: {
        required: 'Institution/school/Unversity name is required',
        pattern: 'Please use only letters, numbers and special characters.',
      },
      startDate: {
        required: 'Start date is required',
        pattern: 'Please enter valid date.',
      },
      endDate: {
        pattern: 'Please enter valid date.',
      },
      description: {
        maxlength: 'Description cannot exceed 250 characters.',
        pattern: 'Please use only letters, numbers and special characters.',
      },
      isDoing: {},
    };
  }

  private initForm(): void {
    this.educationForm = this.fb.group({
      instituteName: [
        '',
        [Validators.required, Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX)],
      ],
      startDate: ['', [Validators.required]],
      endDate: [''],
      description: [
        '',
        [
          Validators.maxLength(250),
          Validators.pattern(ALPHANUMERIC_SPECIAL_REGEX),
        ],
      ],
      isDoing: ['true'],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onResetForm() {
    this.educationForm?.reset();
  }

  onSubmit() {
    if (this.educationForm?.invalid) {
      return;
    }

    console.log('Form Data:', this.educationForm?.value);
    this.closeModal();
    this.educationForm?.reset();
  }

  timelineData = [
    {
      id: '1',
      title: 'Joined University',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateRange: '2015 Aug - 2020 Sep',
      name: 'Vishwa W.',
    },
    {
      id: '2',
      title: 'Started Internship',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateRange: '2021 Jan - 2021 Dec',
      name: 'Vishwa W.',
    },
    {
      id: '3',
      title: 'Full-time Job',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dateRange: '2022 Jan - Present',
      name: 'Vishwa W.',
    },
  ];

  onStartDateChange(date: string | undefined): void {
    const dateControl = this.educationForm?.get('startDate');
    if (dateControl) {
      dateControl.setValue(date);
      dateControl.markAsDirty();
      dateControl.markAsTouched();
    }
  }

  onEndDateChange(date: string | undefined): void {
    const dateControl = this.educationForm?.get('endDate');
    if (dateControl) {
      dateControl.setValue(date);
      dateControl.markAsDirty();
      dateControl.markAsTouched();
    }
  }

  convertToNgbDateStruct(isoString: string): NgbDateStruct | null {
    if (!isoString) {
      return null;
    }
    const [year, month, day] = isoString.split('T')[0].split('-').map(Number);
    return { year, month, day };
  }
}
