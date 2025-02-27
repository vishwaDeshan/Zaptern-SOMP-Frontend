import { createAction, props } from '@ngrx/store';
import { HealthRecordsData } from '@zaptern-somp-frontend/model';

export const loadHealthRecords = createAction(
  '[HealthRecords] Load health records',
  props<{ id: string }>()
);

export const loadHealthRecordsSucess = createAction(
  '[HealthRecords] Load health records sucess',
  props<{ healthRecords: HealthRecordsData }>()
);

export const loadHealthRecordsFailure = createAction(
  '[HealthRecords] Load health records failure',
  props<{ error: string }>()
);

export const saveHealthRecords = createAction(
  '[HealthRecords] Save health records',
  props<{ healthRecords: HealthRecordsData }>()
);

export const saveHealthRecordsSucess = createAction(
  '[HealthRecords] Save health records sucess',
  props<{ healthRecords: HealthRecordsData }>()
);

export const saveHealthRecordsFailure = createAction(
  '[HealthRecords] Save health records failure',
  props<{ error: string }>()
);



