import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const memories = sqliteTable("memories", {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  prefix: text().notNull(),
  fileCount: integer().notNull(),
  message: text().notNull(),
  createdAt: integer(),
  lastUpdatedAt: integer(),
},
(table) => {
  return {
    prefixUnique: uniqueIndex("memories_prefix_unique").on(table.prefix),
  }
})

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
})
