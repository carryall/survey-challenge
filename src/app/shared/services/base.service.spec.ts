import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('BaseService', () => {
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('#post', () => {
    describe('Given a valid data', () => {
      it('returns an Observable<any>', () => {
        const mockResponse = {
          data: {
            id: 10,
            type: 'token',
            attributes: {
              access_token: 'lbxD2K2BjbYtNzz8xjvh2FvSKx838KBCf79q773kq2c',
              token_type: 'Bearer',
              expires_in: 7200,
              refresh_token: '3zJz2oW0njxlj_I3ghyUBF7ZfdQKYXd2n0ODlMkAjHc',
              created_at: 1597169495
            }
          }
        };

        const data = {
          grant_type: 'password',
          email: 'dev@nimblehq.co',
          password: '12345678',
          client_id: environment.apiClientID,
          client_secret: environment.apiClientSecret
        };

        service.post('oauth/token', data).subscribe(response => {
          expect(response).toBe(mockResponse);
        });

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');
        request.flush(mockResponse);
      });
    });

    describe('Given an INVALID data', () => {
      it('throws error', () => {
        const data = {
          grant_type: 'password',
          email: 'invalid_email@nimblehq.co',
          password: '12345678',
          client_id: environment.apiClientID,
          client_secret: environment.apiClientSecret
        };

        service.post('oauth/token', data).subscribe(
          _ => fail('Should have failed with 400 error'),
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.error).toContain('400 Unprocessable Entity');
          }
        );

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');
        request.error(new ErrorEvent('HttpError'), { status: 400, statusText: 'Unprocessable Entity' });
      });
    });
  });
});
