import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthRecordsData } from '@zaptern-somp-frontend/model';
import { environment } from 'apps/Zaptern-SOMP-frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordsService {
  constructor(private http: HttpClient) {}

  getHealthRecords(id: string): Observable<HealthRecordsData> {
    return this.http.get<HealthRecordsData>(
      `${environment.apiUrl}/health-records?Id=${id}`
    );
  }

  saveHealthRecords(
    healthRecords: HealthRecordsData
  ): Observable<HealthRecordsData> {
    return this.http.post<HealthRecordsData>(
      `${environment.apiUrl}/health-records`,
      healthRecords
    );
  }
}
