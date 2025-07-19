# A Multi-Page Vanilla HTML Template with Modern DX
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-0984e3?style=flat)
![Live Reload](https://img.shields.io/badge/Live%20Reload-6c5ce7?style=flat)
![NPM Packages](https://img.shields.io/badge/NPM%20Packages-c0392b?style=flat)
![File-Based Routing](https://img.shields.io/badge/File--Based%20Routing-d35400?style=flat)
![Components](https://img.shields.io/badge/Components-10ac84?style=flat)

**vanilla-html** is unopinionated and uses file-based routing (similar to the good old web).

You can write plain HTML, JS, and CSS, or use frontend frameworks like React, Vue, Alpine, etc. if you prefer.

Tailwind CSS is included by default. You can install additional UI component libraries like DaisyUI if desired.

  * [Getting Started](#getting-started)
  * [Routing](#routing)
  * [File Paths](#file-paths)
  * [Public Folder](#public-folder)
  * [HTML Components / Partials](#html-components--partials)
  * [Tailwind CSS](#tailwind-css)
  * [NPM Packages](#npm-packages)
  * [Deployment](#deployment)

## Getting Started

Create a new multi-page vanilla html site:  
```bash
npm create vanilla-html-site@latest
```

Start dev server with live reloading:  
```bash
npm run dev
```

Build for production, output to `dist` folder:  
```bash
npm run build
```

Preview `dist` folder:  
```bash
npm run preview
```

## Routing

**vanilla-html** uses file-based routing. Your `src` folder structure defines the URLs, similar to the good old web.  
Organize your HTML, scripts, styles, and assets (images, videos) however you see fit within `src` and its subfolders.

For example: this [About page](https://vani.b95.dev/other/about.html) resides in the `src/other/` folder.

```html
<a href="./other/about.html">About page</a>
```

Note the `./` at the beginning - it's a relative path.

## File Paths

**vanilla-html** supports both relative and absolute paths, just like traditional web development:

- **Relative paths** (e.g., `./images/hero.jpg`, `../styles/main.css`) are bundled and optimized by Parcel
- **Absolute paths** (e.g., `/logo.png`, `/themes/dark.css`) reference files in the `public` folder and are served as-is

```html
<!-- Bundled by Parcel -->
<img src="./images/hero.jpg" alt="Hero">
<link rel="stylesheet" href="./styles/main.css">

<!-- Served from public folder -->
<img src="/logo.png" alt="Logo">
<link rel="stylesheet" href="/themes/dark.css">
```

## Public Folder

Files in the `public` folder are copied directly to the build output without processing. 
Use absolute paths (starting with `/`) to reference these files. 

**vanilla-html** will watch the `public` folder for changes and automatically copy its contents to the `dist` folder during development and builds.

## HTML Components / Partials

**vanilla-html** uses [`posthtml-include`](https://github.com/posthtml/posthtml-include) to support HTML components.

Write your HTML components in `src/components`:

```html
<header>
  <h1 class="font-bold text-3xl">
    {{title}}
  </h1>
</header>
```

Include them in your HTML files:

```html
<include src="header.html"></include>
```

To pass data to the component (data must be in JSON, not JS object):

```html
<include src="header.html">
  { "title": "vanilla-html guide" }
</include>
```

## Tailwind CSS

Tailwind CSS is installed by default, but remember to add `@import "tailwindcss";` to your CSS file.

Example (`style.css`):

```css
@import "tailwindcss";

/* other css rules */
html {
  font-family: system-ui;
  width: 100%;
  height: 100%;
}
...
```

You can also install additional UI component libraries like [DaisyUI](https://daisyui.com/docs/install/), [Basecoat](https://basecoatui.com/installation/#install-npm), etc. if needed.

## NPM Packages

`vanilla-html` uses Parcel for bundling so you can `npm install` packages if needed

Example: 

```bash
npm install alpinejs
```

```html
<script type="module">
  import Alpine from 'alpinejs'

  Alpine.start()
</script>
```

## Deployment

Since the build output (`dist`) is static vanilla HTML files, you can deploy it on shared hosting (e.g., with cPanel), VPS, Cloudflare Pages, Netlify, Vercel, etc.

Deploy to [Cloudflare Pages](https://pages.cloudflare.com/):

```bash
npm run build && npx wrangler pages deploy dist
```

Deploy to [Netlify](https://www.netlify.com/):

```bash
npm run build && npx netlify deploy --prod --dir=dist
```

Deploy to shared hosting (cPanel):

Run `npm run build` then upload contents of `dist` folder to your `public_html` directory.
