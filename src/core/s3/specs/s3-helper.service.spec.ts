import { S3 } from 'aws-sdk';
import { S3HelperService } from '../s3-helper.service';
import { UrlMethods } from '../s3.models';

jest.mock('aws-sdk', () => {
  const mockedS3 = {
    getObject: jest.fn().mockReturnThis(),
    putObject: jest.fn().mockReturnThis(),
    deleteObject: jest.fn().mockReturnThis(),
    getSignedUrlPromise: jest.fn().mockReturnThis(),
    listObjectsV2: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return { S3: jest.fn(() => mockedS3) };
});

describe('s3 helper service', () => {
  let s3HelperService: S3HelperService;
  let s3Mock = new S3() as any;
  beforeEach(() => {
    s3HelperService = new S3HelperService('test-bucket');
  });

  describe('#fetch', () => {
    it('should fetch object from bucket by specified key', async () => {
      const returnedObject = Buffer.from('sample-response');
      s3Mock
        .getObject({
          Bucket: 'test-bucket',
          Key: 'fake-key',
        })
        .promise.mockImplementation(() => Promise.resolve(returnedObject));

      const object = await s3HelperService.fetch('fake-key');

      expect(object).toEqual(returnedObject);
    });
  });
  describe('#put', () => {
    it('should put specified object onto s3 bucket', async () => {
      s3Mock
        .putObject({
          Bucket: 'test-bucket',
          Key: 'key',
        })
        .promise.mockImplementation(() => Promise.resolve('object-uploaded'));

      const response = await s3HelperService.put(
        'fake-key',
        Buffer.from('sample-body')
      );

      expect(response).toEqual('object-uploaded');
    });
  });
  describe('#delete', () => {
    it('should delete s3 object by key', async () => {
      s3Mock
        .deleteObject({
          Bucket: 'test-bucket',
          Key: 'key',
        })
        .promise.mockImplementation(() => Promise.resolve('object-deleted'));

      const response = await s3HelperService.delete('fake-key');

      expect(response).toEqual('object-deleted');
    });
  });
});
