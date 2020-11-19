import { Callback } from 'aws-lambda';

import { AppLambdaResponse } from './response';
import { AppLambdaRequest } from './request';

export class AppLambdaContext {
  readonly response: AppLambdaResponse;
  readonly request: AppLambdaRequest;
  readonly event: any;

  constructor(event: any, private _callback: Callback) {
    this.response = new AppLambdaResponse();
    this.request = new AppLambdaRequest(event);
    this.event = event;
  }

  callback(...args: any[]) {
    return this._callback(null, ...args);
  }

  getEnvVariable(name: string) {
    if (!name) {
      throw new Error('Not provided argument: "name"');
    }
    if (!process.env[name]) {
      throw new Error(`Not available env variable: ${name}`);
    }

    return process.env[name];
  }
}
