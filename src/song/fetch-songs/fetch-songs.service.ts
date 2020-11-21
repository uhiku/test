import { S3HelperService } from '../../core/s3/s3-helper.service';

export class FetchSongsService {
  private readonly _s3Helper = new S3HelperService();
  constructor() {}

  async fetchAllSongs(): Promise<string[]> {
    const { Contents } = await this._s3Helper.getBucketFiles('trimmed/');

    const urls = [];

    for (const { Key } of Contents) {
      urls.push(await this._s3Helper.getObjectSignedUrl(Key, 240));
    }

    return urls;
  }
}
