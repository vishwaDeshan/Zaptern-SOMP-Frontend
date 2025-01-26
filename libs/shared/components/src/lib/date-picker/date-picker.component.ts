import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'somp-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  imports: [CommonModule, NgbDatepickerModule],
})
export class DatePickerComponent {
  @Input() selectedDate: NgbDateStruct | null = null;
  @Input() label: string = 'Select Date';
  @Input() placeholder: string = 'dd/mm/yyyy';
  @Input() isRequired: boolean = false;
  @Input() errorMessage: string | null = null;
  @Input() isDisabled: boolean = false;

  @Output() dateChange = new EventEmitter<string>();

  isOpen: boolean = false;

  constructor(
    private calendar: NgbCalendar,
    private cdRef: ChangeDetectorRef
  ) {}

  toggleDatePicker(): void {
    this.isOpen = !this.isOpen;
    this.cdRef.detectChanges();
  }

  onDateSelect(date: NgbDateStruct): void {
    this.selectedDate = date;
    const formattedDate = this.formatAsIsoString(date);
    this.dateChange.emit(formattedDate);
    this.isOpen = false;
  }

  get formattedDate(): string {
    if (!this.selectedDate) {
      return '';
    }
    const { year, month, day } = this.selectedDate;
    return `${this.padZero(day)}/${this.padZero(month)}/${year}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private formatAsIsoString(date: NgbDateStruct): string {
    if (!date) {
      return '';
    }
    const { year, month, day } = date;
    return `${year}-${this.padZero(month)}-${this.padZero(day)}T00:00:00`;
  }

  clearDate(): void {
    this.selectedDate = null;
    this.dateChange.emit(undefined);
  }
}
