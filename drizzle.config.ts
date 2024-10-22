import "dotenv/config"
import { defineConfig } from "drizzle-kit"

const authToken = process.env.NODE_ENV === "development"
  ? ""
  : process.env.NUXT_TURSO_AUTH_TOKEN
const url = process.env.NODE_ENV === "development"
  ? "file:.sqld/memory.db"
  : process.env.NUXT_TURSO_URL

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url,
    authToken,
  },
  out: "./migrations",
  schema: "./server/db/schema.ts",
})
