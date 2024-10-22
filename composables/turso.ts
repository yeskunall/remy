import type { memoriesTable } from "~/server/db/schema"

type NewMemory = typeof memoriesTable.$inferInsert

export const useSaveMemory = async (data: NewMemory) => {
  const results = await useLazyFetch(
    "/api/memory/save",
    {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  const createdAt = results?.data.value?.results[0]?.createdAt
  const prefix = results?.data.value?.results[0]?.prefix
  const status = results?.status

  return { createdAt, prefix, status }
}
