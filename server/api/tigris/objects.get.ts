import {
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3"

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const { tigris: { accessKeyId, bucket: Bucket, endpoint, region, secretAccessKey } } = config

  const S3 = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
    endpoint,
  })

  const { Contents: contents, IsTruncated: isTruncated, KeyCount: keyCount } = await S3.send(new ListObjectsV2Command({ Bucket }))

  return { contents, isTruncated, keyCount }
})
