import * as AWS from "aws-sdk";
import { AppLambda, AppLambdaContext } from "../../core/lambda";
import { SongTrimService } from "./song-trim.service";

AWS.config.update({ region: process.env.aws_region });

export const trimSong = async (context: AppLambdaContext) => {
  const songTrimService = new SongTrimService();
  const record = context.event.Records[0];

  songTrimService.trimRecord(record);
};

export const main = AppLambda(trimSong);
