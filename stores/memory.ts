import type { JSONContent } from "@tiptap/vue-3"

export const useMemoryStore = defineStore("memory", {
  actions: {
    setFiles(files: File[]) {
      this.files = files
    },
    setMessage(message: JSONContent) {
      this.message = message
    },
  },
  getters: {},
  state: () => ({
    files: [] as File[],
    message: {} as JSONContent,
  }),
})
