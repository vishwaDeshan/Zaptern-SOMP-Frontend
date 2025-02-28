import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  loadPersonalDetails,
  selectPersonalDetails,
} from '@zaptern-somp-frontend/data-access';
import { PersonalDetailsFormComponent } from '@zaptern-somp-frontend/feature';
import { PersonalDetails } from '@zaptern-somp-frontend/model';
import { Observable } from 'rxjs';
import { AccordionComponent } from '@zaptern-somp-frontend/components';

@Component({
  selector: 'somp-info-summary-form',
  standalone: true,
  templateUrl: './info-summary-form.component.html',
  styleUrls: ['./info-summary-form.component.scss'],
  imports: [CommonModule, PersonalDetailsFormComponent, AccordionComponent],
})
export class InfoSummaryFormComponent implements OnInit {
  @Input() personalDetails: PersonalDetails | undefined;

  applicantId: string = '83502019-57ad-08dd-1f71-0012bd8c392e';
  personalDetails$: Observable<PersonalDetails>;

  constructor(private store: Store) {
    this.personalDetails$ = this.store.pipe(select(selectPersonalDetails));
  }
  ngOnInit(): void {
    this.store.dispatch(loadPersonalDetails({ id: this.applicantId }));
  }
}
