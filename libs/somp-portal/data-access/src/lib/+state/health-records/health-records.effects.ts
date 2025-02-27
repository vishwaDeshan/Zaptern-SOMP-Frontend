import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HealthRecordsService } from '../../api-services/health-records.service';
import {
  LoadingPopupService,
  NotificationsService,
} from '@zaptern-somp-frontend/services';
import * as HealthRecordsActions from './health-records.actions';
import * as SharedStateActions from '@zaptern-somp-frontend/shared-data-access';
import { catchError, finalize, map, switchMap, of } from 'rxjs';

@Injectable()
export class HealthRecordsEffects {
  constructor(
    private actions$: Actions,
    private healthRecordsService: HealthRecordsService,
    private loadingPopupService: LoadingPopupService,
    private notificationsService: NotificationsService
  ) {}

  loadHealthRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HealthRecordsActions.loadHealthRecords),
      switchMap(({ id }) => {
        this.loadingPopupService.openLoadingDialog();
        return this.healthRecordsService.getHealthRecords(id).pipe(
          map((healthRecords) =>
            HealthRecordsActions.loadHealthRecordsSucess({
              healthRecords,
            })
          ),
          catchError((error) => {
            this.notificationsService.showError(
              'Failed to health records details.'
            );
            return of(
              HealthRecordsActions.loadHealthRecordsFailure({
                error,
              })
            );
          }),
          finalize(() => {
            this.loadingPopupService.closeLoadingDialog();
          })
        );
      })
    )
  );

  saveHealthRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HealthRecordsActions.saveHealthRecords),
      switchMap(({ healthRecords }) => {
        return this.healthRecordsService.saveHealthRecords(healthRecords).pipe(
          map(() =>
            HealthRecordsActions.saveHealthRecordsSucess({
              healthRecords,
            })
          ),
          catchError((error) => {
            this.notificationsService.showError(
              'Failed to save health records.'
            );
            return of(
              HealthRecordsActions.saveHealthRecordsFailure({
                error,
              })
            );
          })
        );
      })
    )
  );

  onFormSaveStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthRecordsActions.saveHealthRecords),
      map(() => SharedStateActions.startFormSaving())
    );
  });

  onFormSaveSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthRecordsActions.saveHealthRecordsSucess),
      map(() => SharedStateActions.FormSaved())
    );
  });

  onFormSaveError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthRecordsActions.saveHealthRecordsFailure),
      map(() => SharedStateActions.FormSaveError())
    );
  });
}
