import * as AWS from 'aws-sdk';
import { AppLambda, AppLambdaContext } from '../../core/lambda';
import { FetchSongsService } from './fetch-songs.service';

AWS.config.update({ region: 'eu-west-1' });

export const main = AppLambda(async (context: AppLambdaContext) => {
  const fetchSongsService = new FetchSongsService();

  return fetchSongsService.fetchAllSogs();
});

