import { createReducer, on } from '@ngrx/store';
import { HealthRecordsData } from '@zaptern-somp-frontend/model';
import * as HealthRecordsActions from './health-records.actions';

export interface HealthRecordsState {
  healthRecords: HealthRecordsData;
  loading: boolean;
  error: string | null;
}

export const initialHealthRecordsState: HealthRecordsState = {
  healthRecords: {
    medicalConditions: false,
    allergies: false,
    medications: false,
    surgeries: false,
    accommodations: false,
    vaccinated: false,
    accommodationsDetails: '',
    medicalConditionsDetails: '',
    allergiesDetails: '',
    medicationsDetails: '',
    surgeriesDetails: '',
    vaccinatedDetails: '',
  },
  loading: false,
  error: null,
};

export const healthRecordsReducer = createReducer(
  initialHealthRecordsState,
  on(HealthRecordsActions.loadHealthRecords, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    HealthRecordsActions.loadHealthRecordsSucess,
    (state, { healthRecords }) => ({
      ...state,
      healthRecords: healthRecords,
      loading: false,
      error: null,
    })
  ),
  on(HealthRecordsActions.loadHealthRecordsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(HealthRecordsActions.saveHealthRecords, (state, { healthRecords }) => ({
    ...state,
    healthRecords: {
      ...state.healthRecords,
      ...healthRecords,
    },
  })),
  on(
    HealthRecordsActions.saveHealthRecordsSucess,
    (state, { healthRecords }) => ({
      ...state,
      healthRecords: healthRecords,
    })
  ),
  on(HealthRecordsActions.saveHealthRecordsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
