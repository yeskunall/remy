import {
  ListBucketsCommand,
  S3Client,
} from "@aws-sdk/client-s3"

export default defineEventHandler(async () => {
  const { tigris: { accessKeyId, endpoint, region, secretAccessKey } } = useRuntimeConfig()

  const S3 = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
    endpoint,
  })

  const { Buckets: buckets = [] } = await S3.send(new ListBucketsCommand())

  return { buckets }
})
