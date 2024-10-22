import { memoriesTable } from "~/server/db/schema"
import { db } from "~/server/utils/drizzle"

type NewMemory = typeof memoriesTable.$inferInsert

export default defineEventHandler(async (event) => {
  const { createdAt, lastUpdatedAt, ...rest } = await readBody(event) as NewMemory

  const results = await db.insert(memoriesTable)
    .values({ ...rest, createdAt: new Date(createdAt as Date), lastUpdatedAt: new Date(lastUpdatedAt as Date) })
    .returning({ createdAt: memoriesTable.createdAt, prefix: memoriesTable.prefix })

  return { results }
})
