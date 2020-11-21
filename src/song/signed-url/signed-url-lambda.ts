import * as AWS from "aws-sdk";
import { AppLambda, AppLambdaContext } from "../../core/lambda";
import { S3HelperService } from "../../core/s3/s3-helper.service";

AWS.config.update({ region: process.env.aws_region });

export const getSignedUrl = async (context: AppLambdaContext) => {
  const s3Helper = new S3HelperService(
    `${process.env.stage}-mp3songs-attachments/uploads`
  );

  return s3Helper.putObjectSignedUrl(`${new Date().getTime()}.mp3`);
};

export const main = AppLambda(getSignedUrl);
