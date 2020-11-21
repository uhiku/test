import { ListObjectsV2Output } from 'aws-sdk/clients/s3';
import { S3HelperService } from '../../../core/s3/s3-helper.service';
import { FetchSongsService } from '../fetch-songs.service';

describe('fetch songs service', () => {
  const expectedUrls = ['URL1', 'URL2', 'URL3', 'URL4'];
  let fetchSongsService: FetchSongsService;
  let listS3response: ListObjectsV2Output;
  let getBucketFilesSpy: jest.SpyInstance;
  let getObjectSignedUrlSpy: jest.SpyInstance;

  beforeEach(() => {
    listS3response = {
      Contents: expectedUrls.map((url) => ({
        Key: url,
      })),
    };

    getBucketFilesSpy = jest
      .spyOn(S3HelperService.prototype, 'getBucketFiles')
      .mockImplementation(() => Promise.resolve(listS3response) as any);
    getObjectSignedUrlSpy = jest
      .spyOn(S3HelperService.prototype, 'getObjectSignedUrl')
      .mockImplementation((contents) => Promise.resolve(contents));

    fetchSongsService = new FetchSongsService();
  });

  describe('#fetchAllSongs', () => {
    it('should fetch all songs rom bucket', async () => {
      const result = await fetchSongsService.fetchAllSongs();

      expect(result).toEqual(expectedUrls);
      expect(getBucketFilesSpy).toHaveBeenCalledTimes(1);
      expect(getObjectSignedUrlSpy).toHaveBeenCalledTimes(expectedUrls.length);
    });
  });
});
