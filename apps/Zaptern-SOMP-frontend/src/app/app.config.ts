import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SharedStateFeature } from '@zaptern-somp-frontend/shared-data-access';
import { ApplicantEffects } from '@zaptern-somp-frontend/applicants-list';
import { applicantFeature } from '@zaptern-somp-frontend/applicants-list';
import {
  personalDetailsFeature,
  PersonalDetailsEffects,
  educationalDetailsFeature,
  EducationalDetailsEffects,
  HealthRecordsEffects,
  healthRecordsFeature,
} from '@zaptern-somp-frontend/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideStore(),
    provideState(applicantFeature),
    provideState(SharedStateFeature),
    provideState(educationalDetailsFeature),
    provideState(personalDetailsFeature),
    provideState(healthRecordsFeature),
    provideEffects([
      ApplicantEffects,
      PersonalDetailsEffects,
      EducationalDetailsEffects,
      HealthRecordsEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
