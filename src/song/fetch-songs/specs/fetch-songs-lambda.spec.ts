import { AppLambdaContext } from '../../../core/lambda';
import { fetchSongsCallback } from '../fetch-songs-lambda';
import { FetchSongsService } from '../fetch-songs.service';

describe('fetch songs lamdba', () => {
  const mockResponse = ['song1', 'song2', 'song3', 'song4'];
  let fetchSongsServiceSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSongsServiceSpy = jest
      .spyOn(FetchSongsService.prototype, 'fetchAllSongs')
      .mockImplementation(() => Promise.resolve(mockResponse));
  });

  it('should create an instance of #FetchSongsService service', async () => {
    await fetchSongsCallback({} as AppLambdaContext);

    expect(fetchSongsServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should should return a list of songs', async () => {
    const response = await fetchSongsCallback({} as AppLambdaContext);

    expect(response).toEqual(mockResponse);
  });
});
