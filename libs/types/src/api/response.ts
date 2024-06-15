import { JwtToken } from '@app/auth';

export const Success = 200;
export const Failure = 500;

export type Response<T> = {
  code: number;
  message?: string;
  result?: T;
};

export type EmptyResponse = Response<undefined>;

export type SimpleErrorResponse = Response<unknown>;

export type SimpleRegisterResult = {
  uid: number;
};

export type SimpleRegisterResponse =
  | Response<SimpleRegisterResult>
  | SimpleErrorResponse;

export type AuthResponse = Response<JwtToken> | SimpleErrorResponse;
