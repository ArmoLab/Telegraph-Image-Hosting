import { defineConfig } from "astro/config";
import fs from "node:fs";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import icon from "astro-icon";

const domain = JSON.parse(fs.readFileSync("./package.json")).homepage;
const CurrentDir = process.cwd();

// https://astro.build/config
export default defineConfig({
  site: domain,
  integrations: [
    sitemap({
      filter: page => page !== `${domain}/404.html` && page !== `${domain}/404/` && page !== `${domain}/404`
    }),
    compress({
      Exclude: [
        (File) => File.startsWith(`${CurrentDir}/dist/functions/`)
      ],
    }),
    icon()
  ]
});
