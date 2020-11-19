import * as AWS from 'aws-sdk';
import { AppLambda, AppLambdaContext } from '../../core/lambda';
import { SongTrimService } from './song-trim.service';

AWS.config.update({ region: 'eu-west-1' });

const songTrimService = new SongTrimService();

export const main = AppLambda(async (context: AppLambdaContext) => {
  const record = context.event.Records[0];

  songTrimService.trimRecord(record);
});
