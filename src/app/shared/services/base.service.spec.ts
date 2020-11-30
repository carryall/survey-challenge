import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';


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
    describe('Given a valid request payload', () => {
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

        const deserializedResponse = {
          id: 10,
          accessToken: 'lbxD2K2BjbYtNzz8xjvh2FvSKx838KBCf79q773kq2c',
          tokenType: 'Bearer',
          expiresIn: 7200,
          refreshToken: '3zJz2oW0njxlj_I3ghyUBF7ZfdQKYXd2n0ODlMkAjHc',
          createdAt: 1597169495
        };

        const postRequestPayload = {
          grant_type: 'password',
          email: 'dev@nimblehq.co',
          password: '12345678',
          client_id: environment.apiClientID,
          client_secret: environment.apiClientSecret
        };

        service.post('oauth/token', postRequestPayload).subscribe(response => {
          expect(response).toEqual(deserializedResponse);
        });

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');
        request.flush(mockResponse);
      });
    });

    describe('Given an INVALID request payload', () => {
      it('throws an error', () => {
        const mockErrorResponse = {
          errors: [
            {
              source: 'Doorkeeper::OAuth::Error',
              detail: 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.',
              code: 'invalid_grant'
            }
          ]
        };

        const postRequestPayload = {
          grant_type: 'password',
          email: 'invalid_email@nimblehq.co',
          password: '12345678',
          client_id: environment.apiClientID,
          client_secret: environment.apiClientSecret
        };

        service.post('oauth/token', postRequestPayload).subscribe(
          _ => fail('Should have failed with 400 error'),
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.message).toContain('400');
          }
        );

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');

        const mockError = new ErrorEvent('HttpError', {
          error: mockErrorResponse
        });
        request.error(mockError, {status: 400, statusText: 'Bad Request'});
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
