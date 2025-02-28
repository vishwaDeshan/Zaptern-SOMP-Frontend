import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HealthInfoFormComponent } from './health-info-form/health-info-form.component';
import { Store } from '@ngrx/store';
import {
  setPageTitle,
  showBorderLine,
  showSideBar,
  showTopToolBar,
} from '@zaptern-somp-frontend/shared-data-access';
import { loadHealthRecords } from '@zaptern-somp-frontend/data-access';

@Component({
  selector: 'somp-health-info',
  standalone: true,
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss'],
  imports: [CommonModule, HealthInfoFormComponent],
})
export class HealthInfoComponent implements OnInit {
  applicantId: string = '83502019-57ad-08dd-1f71-0012bd8c392e';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadHealthRecords({ id: this.applicantId }));
    this.store.dispatch(showBorderLine());
    this.store.dispatch(showSideBar());
    this.store.dispatch(showTopToolBar());
    this.store.dispatch(setPageTitle({ pageTitle: 'Health Records' }));
  }
}
