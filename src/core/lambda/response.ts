export class AppLambdaResponse {
    success<TBody>(body: TBody) {
      return this.buildResponse(200, body);
    }
  
    failure<TBody>(body: TBody, statusCode: number = 500) {
      return this.buildResponse(statusCode, body);
    }
  
    private buildResponse<TBody>(statusCode: number, body: TBody) {
      return {
        statusCode: statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(body)
      };
    }
  }
  