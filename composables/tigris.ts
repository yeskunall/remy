export const useGetBuckets = async () => {
  const results = await $fetch("/api/tigris/buckets")
  const buckets = results?.buckets ?? []

  return { buckets }
}

export const useGetObjects = async () => {
  const { data: { value }, status } = useLazyFetch("/api/tigris/objects")

  const contents = value?.contents ?? []
  const isTruncated = value?.isTruncated ?? false
  const keyCount = value?.keyCount

  return { contents, isTruncated, keyCount, status }
}

export const usePutObjects = async (data: FormData) => {
  const results = await $fetch(
    "/api/tigris/upload",
    {
      method: "POST",
      body: data,
    },
  )

  const objects = results?.objects
  const prefix = results?.prefix

  return { objects, prefix }
}
