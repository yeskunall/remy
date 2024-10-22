import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const memoriesTable = sqliteTable(
  "memories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    prefix: text().notNull().unique(),
    fileCount: int().notNull(),
    message: text({ mode: "json" }).notNull(),
    createdAt: int({ mode: "timestamp_ms" }),
    lastUpdatedAt: int({ mode: "timestamp_ms" }),
  },
)
