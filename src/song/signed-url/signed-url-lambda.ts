import * as AWS from 'aws-sdk';
import { AppLambda, AppLambdaContext } from '../../core/lambda';
import { S3HelperService } from '../../core/s3/s3-helper.service';
import { UrlMethods } from '../../core/s3/s3.models';

AWS.config.update({ region: 'eu-west-1' });

export const main = AppLambda(async (context: AppLambdaContext) => {
  const s3Helper = new S3HelperService(
    `${process.env.stage}-mp3songs-attachments/uploads`
  );

  return s3Helper.putObjectSignedUrl(`${new Date().getTime()}.mp3`);
});
