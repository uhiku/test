import { S3EventRecord } from "aws-lambda";
import { AppLambdaContext } from "../../../core/lambda";
import { trimSong } from "../song-trim-lambda";
import { SongTrimService } from "../song-trim.service";

describe("trimSong lambda", () => {
  let trimRecordSpy: jest.SpyInstance;
  let recordMock: S3EventRecord;

  beforeEach(() => {
    trimRecordSpy = jest
      .spyOn(SongTrimService.prototype, "trimRecord")
      .mockImplementation(() => Promise.resolve(undefined));
    recordMock = createRecordMock();
  });

  it("getSignedUrl shuld return signed url", async () => {
    await trimSong({
      event: { Records: [recordMock] },
    } as AppLambdaContext);

    expect(trimRecordSpy).toHaveBeenCalledTimes(1);
  });
});

function createRecordMock(): S3EventRecord {
  return {
    eventVersion: "1",
    eventSource: "fake-source",
    awsRegion: process.env.aws_region,
    eventTime: "1605967322",
    eventName: "name",
    userIdentity: {
      principalId: "fake-principa;-id",
    },
    requestParameters: {
      sourceIPAddress: "fake sourceIPAddress",
    },
    responseElements: {
      "x-amz-request-id": "fake x-amz-request-id",
      "x-amz-id-2": "fake x-amz-id-2",
    },
    s3: {
      s3SchemaVersion: "fake s3SchemaVersion",
      configurationId: "fake  configurationId",
      bucket: {
        name: "fake bucket name",
        ownerIdentity: {
          principalId: "fake principalId",
        },
        arn: "fake arn",
      },
      object: {
        key: "fake key",
        size: 54,
        eTag: "fake etag",
        versionId: "fake versionId",
        sequencer: "fake sequencer",
      },
    },
  };
}
