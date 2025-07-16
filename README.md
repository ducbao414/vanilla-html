# A Multi-Page Vanilla HTML Template with Modern DX (Tailwind, Live Reload, Components, etc.)

**vanilla-html** is unopinionated and uses file-based routing (similar to the good old web).

You can write plain HTML, JS, and CSS, or `npm install react react-dom` if you prefer.

Tailwind CSS is included by default. You can install additional UI libraries like DaisyUI if desired.

---

## Commands

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

Deploy to [Cloudflare Pages](https://pages.cloudflare.com/):

```bash
npm run build && npx wrangler pages deploy dist
```


*Not necessarily Cloudflare Pages, I just mentioned it because I'm a Cloudflare fanboy.*

Since the build output (`dist`) is static vanilla HTML files, you can deploy it on shared hosting (e.g., with cPanel), VPS, Cloudflare Pages, Netlify, Vercel, etc.


---

## Routing

**vanilla-html** uses file-based routing. Your `src` folder structure defines the URLs.  
Organize your HTML, scripts, styles, and assets (images, videos) however you see fit within `src` and its subfolders.

For example: this [About page](https://vani.b95.dev/other/about.html) resides in the `src/other/` folder.

```html
<a href="./other/about.html">About page</a>
```

Note the `./` at the beginning - it's a relative path.

---

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
<include src="./components/header.html"></include>
```

To pass data to the component (data must be in JSON, not JS object):

```html
<include src="./components/header.html">
  { "title": "vanilla-html guide" }
</include>
```

---

## Public folder

For public files not referenced in `src` (e.g. `robots.txt`), you can place them in the `public` folder.

`vanilla-html` will watch `public` folder for changes and copies its contents to `dist` build output.

