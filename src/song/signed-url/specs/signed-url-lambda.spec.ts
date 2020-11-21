import { AppLambdaContext } from '../../../core/lambda';
import { S3HelperService } from '../../../core/s3/s3-helper.service';
import { getSignedUrl } from '../signed-url-lambda';

describe('getSigneUrl lambda', () => {
  const url = 'SIGNED-URL-MOCK';
  let putObjectSignedUrlSpy: jest.SpyInstance;

  beforeEach(() => {
    putObjectSignedUrlSpy = jest
      .spyOn(S3HelperService.prototype, 'putObjectSignedUrl')
      .mockImplementation(() => Promise.resolve(url));
  });

  it('getSignedUrl shuld return signed url', async () => {
    const result = await getSignedUrl({} as AppLambdaContext);
    
    expect(result).toEqual(url);
    expect(putObjectSignedUrlSpy).toHaveBeenCalledTimes(1);
  });
});
