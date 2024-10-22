import { drizzle } from "drizzle-orm/libsql"

const { turso: { authToken, url } } = useRuntimeConfig()

export const db = drizzle({
  connection: {
    authToken: process.env.NODE_ENV === "development"
      ? ""
      : authToken,
    url: process.env.NODE_ENV === "development"
      ? "file:.sqld/memory.db"
      : url,
  },
})
