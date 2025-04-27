import type { Config } from "tailwindcss";

const tailwindConfig: Pick<
  Config,
  "content" | "presets" | "darkMode" | "theme" | "plugins"
> = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};

export default tailwindConfig;
