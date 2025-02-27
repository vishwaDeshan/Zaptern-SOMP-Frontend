import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from '@zaptern-somp-frontend/components';

@Component({
  selector: 'somp-health-info-form',
  standalone: true,
  templateUrl: './health-info-form.component.html',
  styleUrls: ['./health-info-form.component.scss'],
  imports: [CommonModule, FormContainerComponent, ReactiveFormsModule],
})
export class HealthInfoFormComponent {
  healthForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.healthForm = this.fb.group({
      medicalConditions: [''],
      medicalConditionsDetails: [''],
      medications: [''],
      medicationsDetails: [''],
      allergies: [''],
      allergiesDetails: [''],
      vaccinated: [''],
      vaccinatedDetails: [''],
      surgeries: [''],
      surgeriesDetails: [''],
      accommodations: [''],
      accommodationsDetails: [''],
    });
  }
}
