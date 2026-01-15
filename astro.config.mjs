import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindv4 from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import links from "./links";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Wiki",
      logo: {
        src: "./src/assets/osmu-logo.svg",
      },
      social: [
        {
          label: "Discord",
          href: links.discordInvite,
          icon: "discord",
        },
      ],
      editLink: {
        baseUrl: links.gitEditBase,
      },
      sidebar: [
        {
          label: "OSMU",
          items: [
            {
              label: "About",
              link: "/osmu/about",
            },
          ],
        },
        {
          label: "Bitaxe",
          items: [
            {
              label: "Overview",
              link: "/bitaxe/about",
            },
            {
              label: "100 / Max",
              link: "/bitaxe/100",
            },
            {
              label: "200 / Ultra",
              link: "/bitaxe/200",
            },
            {
              label: "300 / Hex",
              link: "/bitaxe/300",
            },
            {
              label: "400 / Supra",
              link: "/bitaxe/400",
            },
            {
              label: "600 / Gamma",
              link: "/bitaxe/600",
            },
            {
              label: "801 / Gamma Turbo",
              link: "/bitaxe/800",
            },
            {
              label: "900 / Mini",
              link: "/bitaxe/900",
            },
            {
              label: "API",
              link: "/bitaxe/api",
            },
            {
              label: "BAP",
              link: "/bitaxe/bap",
            },
            {
              label: "AxeTester",
              link: "/bitaxe/axetester",
            },
          ],
        },
        {
          label: "Bitaxe Accessories",
          items: [
            {
              label: "BitHalo",
              link: "/bitaxe/bithalo",
            },
          ],
        },
        {
          label: "Nerdminer",
          items: [
            {
              label: "Nerdminer",
              link: "/nerdminer/about",
            },
            {
              label: "NerdNOS",
              link: "/nerdnos/about",
            },
            {
              label: "NerdAxe",
              link: "/nerdaxe/about",
            },
            {
              label: "NerdQAxe+",
              link: "/nerdqaxeplus/about",
            },
            {
              label: "NerdQAxe++",
              link: "/nerdqaxeplusplus/about",
            },
          ],
        },
        {
          label: "Public Pool",
          items: [
            {
              label: "Overview",
              link: "/public-pool/about",
            },
          ],
        },
        {
          label: "AxeOS",
          items: [
            {
              label: "Overview",
              link: "/axeos/about",
            },
            {
              label: "Install onto BitAxe",
              link: "/axeos/install-onto-bitaxe",
            },
            {
              label: "Build from Source",
              link: "/axeos/compile",
            },
          ],
        },
        {
          label: "Bitcrane",
          items: [
            {
              label: "Overview",
              link: "/bitcrane/about",
            },
          ],
        },
        {
          label: "Piaxe",
          items: [
            {
              label: "Overview",
              link: "/piaxe/about",
            },
            {
              label: "Assemble Piaxe",
              link: "/piaxe/assembly",
            },
            {
              label: "Building Piaxe",
              link: "/piaxe/building",
            },
          ],
        },
        {
          label: "Qaxe",
          items: [
            {
              label: "Overview",
              link: "/qaxe/about",
            },
            {
              label: "Assembly",
              link: "/qaxe/assembly",
            },
            {
              label: "Installation",
              link: "/qaxe/installation",
            },
          ],
        },
        {
          label: "Antsniffer",
          items: [
            {
              label: "Overview",
              link: "/antsniffer/about",
            },
          ],
        },
        {
          label: "OSMU Lab",
          items: [
            {
              label: "Overview",
              link: "/osmu-lab/about",
            },
            {
              label: "BM1397",
              link: "/osmu-lab/bm1397",
            },
            {
              label: "BM1366",
              link: "/osmu-lab/bm1366",
            },
            {
              label: "BM1368",
              link: "/osmu-lab/bm1368",
            },
            {
              label: "BM1370",
              link: "/osmu-lab/bm1370",
            },
          ],
        },
        {
          label: "Tips & Tricks",
          items: [
            {
              label: "Building PCBs",
              link: "/tips/building-pcbs",
            },
            {
              label: "Assembly",
              link: "/tips/assembly",
            },
            {
              label: "FAQ",
              link: "/tips/faq",
            },
          ],
        },
      ],
      customCss: ["./src/tailwind.css"],
      components: {
        PageTitle: "./src/components/PageTitle.astro",
      },
    }),
    svelte(),
  ],
  vite: {
    plugins: [tailwindv4()],
  },
});
