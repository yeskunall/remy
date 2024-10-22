<script lang="ts">
import { BubbleMenu, Editor, FloatingMenu, EditorContent } from "@tiptap/vue-3"
import CharacterCount from "@tiptap/extension-character-count"
import History from "@tiptap/extension-history"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"

import { useMemoryStore } from "~/stores/memory"

export default {
  components: {
    BubbleMenu,
    EditorContent,
    FloatingMenu,
  },
  setup() {
    const editor = ref<Editor | null>(null)
    const store = useMemoryStore()
    const { files } = storeToRefs(store)
    const uploadState = useState<"error" | "idle" | "pending" | "success">("uploadState", () => "idle")

    // TODO(yeskunall): convert this to use a custom fetcher with `useAsyncFetch`
    async function handleSubmission() {
      if (!editor.value) return

      store.setMessage(editor.value.getJSON())

      if (files.value.length < 1) return

      const formData = new FormData()
      for (const file of files.value) {
        formData.append("files", file)
      }

      const { prefix } = await usePutObjects(formData)
      const { status, ...returnedMemory } = await useSaveMemory({
        prefix,
        fileCount: files.value.length,
        message: store.message,
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
      })

      if (returnedMemory.prefix === prefix) {
        files.value.length = 0
        editor.value.commands.setContent("")
      }
    }

    return {
      editor,
      handleSubmission,
      limit: 365,
      store,
      uploadState,
    }
  },
  beforeUnmount() {
    if (this.editor)
      (this.editor as Editor).destroy()
  },
  mounted() {
    this.editor = new Editor({
      content: "",
      editorProps: {
        attributes: {
          class: "prose prose-lg focus:outline-none max-w-full",
        },
      },
      extensions: [
        CharacterCount.configure({
          limit: this.limit,
        }),
        History,
        Link.configure({
          openOnClick: false,
          defaultProtocol: "https",
          HTMLAttributes: {
            class: "text-gray-6 underline underline-offset-2 hover:text-gray-9 transition-colors cursor-pointer",
            rel: "nofollow noopener noreferrer",
          },
        }),
        Placeholder.configure({
          placeholder: "Write something …",
        }),
        StarterKit.configure({
          history: false,
          listItem: {
            HTMLAttributes: {
              class: "leading-normal -mb-2",
            },
          },
        }),
        Underline,
      ],
    })
  },
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="editor">
      <bubble-menu
        v-if="editor"
        class="inline-flex items-center gap-2 rounded-full text-gray-6 tracking-tight font-semibold bg-gray-1 p-2 px-4"
        :tippy-options="{ duration: 100 }"
        :editor="(editor as Editor)"
      >
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <span class="i-tabler-bold block size-4" />
        </button>
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <span class="i-tabler-italic block size-4" />
        </button>
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <span class="i-tabler-strikethrough block size-4" />
        </button>
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()"
        >
          <span class="i-tabler-underline block size-4" />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('link') }"
          @click="editor.chain().focus().setLink"
        >
          <span class="i-tabler-link block size-4" />
        </button>
      </bubble-menu>

      <floating-menu
        class="inline-flex items-center mt-16 -ml-4 gap-2 bg-gray-1 font-semibold tracking-tight text-gray-6 rounded-full p-2 px-4"
        :tippy-options="{ duration: 100 }"
        :editor="(editor as Editor)"
      >
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          h1
        </button>
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          h2
        </button>
        <button
          :class="{ 'bg-black text-gray-1 rounded-md p-1 inline-flex transition-colors ease-in-out duration-300 justify-center items-center': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          h3
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <span class="i-tabler-list block text-gray-6 size-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <span class="i-tabler-list-numbers block text-gray-6 size-4" />
        </button>
      </floating-menu>

      <div
        class="flex items-center justify-end gap-2"
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
        >
          <circle
            r="10"
            cx="10"
            cy="10"
            fill="#e9ecef"
          />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            stroke-width="10"
            :stroke-dasharray="`calc(${Math.round((100 / limit) * editor.storage.characterCount.characters())} * 31.4 / 100) 31.4`"

            transform="rotate(-90) translate(-20)"
          />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="white"
          />
        </svg>
        <small class="leading-none font-semibold text-gray-4 tracking-tight">{{ editor.storage.characterCount.characters() }} / {{ limit }} characters</small>
      </div>
    </div>

    <editor-content
      :editor="(editor as Editor)"
      class="relative min-h-32 w-full border border-gray-2 rounded-lg bg-white shadow-sm shadow-gray-2 p-4"
    />
    <div
      v-if="editor"
      class="flex items-center justify-end"
    >
      <button
        v-motion-pop-visible-once
        :delay="700"
        class="p-2.5 px-4 inline-flex items-center disabled:bg-gray-4 disabled:pointer-events-none select-none gap-2 rounded-full bg-black text-gray-1"
        :disabled="editor.storage.characterCount.characters() === 0 || store.files.length === 0"
        @click="handleSubmission"
      >
        <span
          v-if="uploadState === 'pending'"
          class="i-tabler-loader-2 inline-block size-4 text-gray-3 animate-spin"
        />
        <span
          v-if="uploadState === 'idle'"
          class="i-tabler-cloud-upload hover:scale-[.99] scale-[.95] size-4 hover:text-gray-4 text-gray-3 transition-colors ease-in-out duration-300"
        />
        <small class="font-semibold tracking-tight leading-none">Upload memory</small>
      </button>
    </div>
  </div>
</template>

<style>
.tiptap {
  :first-child {
    margin-top: 0;
  }

  p.is-empty::before {
    color: #9ca3af;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

  strong {
    font-variation-settings: "wght" 700;
  }
}
</style>
