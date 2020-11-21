import { S3EventRecord } from 'aws-lambda';
import { S3HelperService } from '../../../core/s3/s3-helper.service';
import { SongTrimService } from '../song-trim.service';
import * as ffmpegTrimModule from '../../../shared/utils/trim-song.util';

describe('fetch songs service', () => {
  let songTrimService: SongTrimService;
  let recordMock: S3EventRecord;
  let trimmedFileMock: Buffer;

  let fetchSpy: jest.SpyInstance;
  let deleteSpy: jest.SpyInstance;
  let putSpy: jest.SpyInstance;

  beforeEach(() => {
    trimmedFileMock = Buffer.from('sample-buffer-trimmed');
    fetchSpy = jest
      .spyOn(S3HelperService.prototype, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ Body: Buffer.from('sample-buffer') } as any)
      );
    deleteSpy = jest
      .spyOn(S3HelperService.prototype, 'delete')
      .mockImplementation(() => Promise.resolve(undefined));
    putSpy = jest
      .spyOn(S3HelperService.prototype, 'put')
      .mockImplementation((contents) => Promise.resolve(undefined));

    jest.spyOn(ffmpegTrimModule, 'ffmpegTrim').mockReturnValue(trimmedFileMock);

    recordMock = createRecordMock();

    songTrimService = new SongTrimService();
  });

  describe('#fetchAllSongs', () => {
    it('should fetch all songs rom bucket', async () => {
      await songTrimService.trimRecord(recordMock);
      const fileName = 'object-filname'; //split, taken from record

      expect(ffmpegTrimModule.ffmpegTrim).toHaveBeenCalledWith(
        fileName,
        Buffer.from('sample-buffer'), // Returned by s3Helper.fetch method
        0,
        5
      );

      await expect(fetchSpy).toHaveBeenCalledWith(recordMock.s3.object.key);
      await expect(deleteSpy).toHaveBeenCalledWith(recordMock.s3.object.key);
      await expect(putSpy).toHaveBeenCalledWith(
        `trimmed/${fileName}`,
        trimmedFileMock
      );
    });
  });
});

function createRecordMock(): S3EventRecord {
  return {
    eventVersion: '1',
    eventSource: 'fake-source',
    awsRegion: 'eu-west-1',
    eventTime: '1605967322',
    eventName: 'name',
    userIdentity: {
      principalId: 'fake-principa;-id',
    },
    requestParameters: {
      sourceIPAddress: 'fake sourceIPAddress',
    },
    responseElements: {
      'x-amz-request-id': 'fake x-amz-request-id',
      'x-amz-id-2': 'fake x-amz-id-2',
    },
    s3: {
      s3SchemaVersion: 'fake s3SchemaVersion',
      configurationId: 'fake  configurationId',
      bucket: {
        name: 'fake bucket name',
        ownerIdentity: {
          principalId: 'fake principalId',
        },
        arn: 'fake arn',
      },
      object: {
        key: 'fake/object-filname',
        size: 54,
        eTag: 'fake etag',
        versionId: 'fake versionId',
        sequencer: 'fake sequencer',
      },
    },
  };
}
