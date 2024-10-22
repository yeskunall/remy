import { defineConfig, presetUno as uno, presetTypography as typography } from "unocss"
import icons from "@unocss/preset-icons"

export default defineConfig({
  presets: [
    icons(),
    typography(),
    uno(),
  ],
  rules: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [/^group-(.*)/, ([_, name]) => {
      return ({
        ["&.group"]: {
          [`& .${name}`]: {},
        },
      })
    }],
    [/^wght-(\d)$/, ([, d]) => ({ fontVariationSettings: `"wght" ${d}` }), { layer: "default" }],
  ],
})
