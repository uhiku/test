import { config } from 'aws-sdk';
import { Callback, Context } from 'aws-lambda';
import { AppLambdaContext } from './context';

config.update({ region: 'eu-west-1' });

export function AppLambda<TReturn>(
  lambdaBody: (context: AppLambdaContext) => TReturn
) {
  return async (event: any, context: Context, callback: Callback) => {
    const appCtx = new AppLambdaContext(event, callback);
    try {
      const result = await lambdaBody(appCtx);
      callback(null, appCtx.response.success(result));
    } catch (error) {
      if (error instanceof Error) {
        callback(null, appCtx.response.failure(404));
      } else {
        callback(
          null,
          appCtx.response.failure({
            error: { message: error.message, name: error.name }
          })
        );
      }
    }
  };
}
