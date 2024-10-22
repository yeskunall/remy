// How to handle duplicates in S3: https://aws.amazon.com/blogs/storage/managing-duplicate-objects-in-amazon-s3/
// https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
// NOTE(yeskunall): how to do this with Tigris? _Can you_ do this with Tigris? Or do I need to do something as described in the article

import { nanoid } from "nanoid"
import {
  S3Client,
} from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"

interface PreconditionFailedError {
  $metadata: {
    httpStatusCode: 412
    [key: string]: unknown
  }
  BucketName: string
  Code: "PreconditionFailed"
  [key: string]: unknown
}

export default defineEventHandler(async (event) => {
  const { tigris: { accessKeyId, bucket: Bucket, endpoint, region, secretAccessKey } } = useRuntimeConfig()
  const client = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
    endpoint,
  })

  const form = await readFormData(event)
  const files = form.getAll("files") as File[]

  if (!files) {
    throw createError({ statusCode: 400, message: "Missing files" })
  }

  // Becomes the “directory” name
  const prefix = nanoid()

  const uploads = files.map((Body) => {
    const upload = new Upload({
      client,
      params: {
        Bucket,
        Key: `${prefix}/${Body.name}`,
        Body,
        IfNoneMatch: "*", // Prevent uploading an object with the same name
      },
    })

    upload.on("httpUploadProgress", (progress) => {
      console.log(progress)
    })

    return upload.done()
  })

  try {
    const results = await Promise.allSettled(uploads)
    const successfulResults = results.filter(result => result.status === "fulfilled")
      .map(result => result.value)

    const errors = results.filter(result => result.status === "rejected")
      .map(result => result.reason as PreconditionFailedError)

    return { objects: [...errors, ...successfulResults], prefix }
  }
  catch (cause) {
    throw createError({ cause, message: "Internal Server Error", statusCode: 500 })
  }
})
