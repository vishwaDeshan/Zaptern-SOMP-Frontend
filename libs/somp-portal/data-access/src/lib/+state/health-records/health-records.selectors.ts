import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  HealthRecordsState,
  healthRecordsReducer,
} from './health-records.reducer';

export const HealthRecordsFeatureKey = 'healthRecords';

export const selectHealthRecordsState =
  createFeatureSelector<HealthRecordsState>(HealthRecordsFeatureKey);

export const selectHealthRecords = createSelector(
  selectHealthRecordsState,
  (state: HealthRecordsState) => state.healthRecords
);

export const selectHealthRecordsLoading = createSelector(
  selectHealthRecordsState,
  (state: HealthRecordsState) => state.loading
);

export const selectHealthRecordsError = createSelector(
  selectHealthRecordsState,
  (state: HealthRecordsState) => state.error
);

export const healthRecordsFeature = createFeature({
  name: HealthRecordsFeatureKey,
  reducer: healthRecordsReducer,
});
