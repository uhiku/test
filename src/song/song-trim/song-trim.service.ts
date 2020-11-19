import { S3EventRecord } from 'aws-lambda';
import { S3HelperService } from '../../core/s3/s3-helper.service';
import { ffmpegTrim } from '../../shared/utils/trim-song.util';

export class SongTrimService {
  private readonly _s3Helper = new S3HelperService();

  constructor() {}

  async trimRecord(record: S3EventRecord): Promise<void> {
    const obj = await this._s3Helper.fetch(record.s3.object.key);
    const fileName = this.getFileName(record);

    const trimmedFile = ffmpegTrim(fileName, obj.Body as Buffer, 0, 5);

    await this._s3Helper.delete(record.s3.object.key);
    await this._s3Helper.put(`trimmed/${fileName}`, trimmedFile);
  }

  private getFileName(record: S3EventRecord): string {
    return record.s3.object.key.split('/').slice(1).join('');
  }
}
