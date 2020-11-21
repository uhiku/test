import * as AWS from "aws-sdk";
import { AppLambda, AppLambdaContext } from "../../core/lambda";
import { FetchSongsService } from "./fetch-songs.service";

AWS.config.update({ region: process.env.aws_region });

export const fetchSongsCallback = async (context: AppLambdaContext) => {
  const fetchSongsService = new FetchSongsService();

  return fetchSongsService.fetchAllSongs();
};

export const main = AppLambda(fetchSongsCallback);
