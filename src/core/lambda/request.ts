export class AppLambdaRequest {
  constructor(private _event: any) {}

  get httpMethod() {
    return this._event.httpMethod;
  }

  get headers() {
    return this._event.headers;
  }

  get pathParameters() {
    return this._event.pathParameters || {};
  }

  get queryParameters() {
    return this._event.queryStringParameters || {};
  }

  get nativeEvent() {
    return this._event;
  }

  get cognitoIdentityId() {
    return this._event.requestContext.identity.cognitoIdentityId;
  }

  getBody<TBody>(): TBody {
    return JSON.parse(this._event.body) as TBody;
  }

  getRawBody(): string {
    return this._event.body;
  }
}
