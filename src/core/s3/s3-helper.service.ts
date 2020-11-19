import { S3 } from 'aws-sdk';
import { UrlMethods } from './s3.models';

const BUCKET_NAME = `${process.env.stage}-mp3songs-attachments`;

export class S3HelperService {
  private readonly _bucket: string;
  private readonly _s3 = new S3({ httpOptions: { timeout: 2000 } });

  constructor(bucket: string = BUCKET_NAME) {
    this._bucket = bucket;
  }

  async fetch(key: string) {
    return this._s3
      .getObject({
        Bucket: this._bucket,
        Key: key,
      })
      .promise();
  }

  async put(key: string, body: Buffer) {
    return this._s3
      .putObject({
        Bucket: this._bucket,
        Key: key,
        Body: body,
      })
      .promise();
  }

  async delete(key: string) {
    return this._s3.deleteObject({ Bucket: this._bucket, Key: key }).promise();
  }

  async putObjectSignedUrl(key: string, expiration: number = 120) {
    return this._s3.getSignedUrlPromise(UrlMethods.PutObject, {
      Bucket: this._bucket,
      Key: key,
      Expires: expiration,
      ContentType: 'audio/mpeg',
    });
  }

  async getObjectSignedUrl(key: string, expiration: number = 360) {
    return this._s3.getSignedUrlPromise(UrlMethods.GetObject, {
      Bucket: this._bucket,
      Key: key,
      Expires: expiration,
    });
  }

  async getBucketFiles(prefix: string) {
    return this._s3
      .listObjectsV2({
        Bucket: this._bucket,
        Prefix: prefix,
        Delimiter: '/',
      })
      .promise();
  }
}
