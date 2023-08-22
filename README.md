# rehype-vue-sfc

[![NPM version](https://img.shields.io/npm/v/rehype-vue-sfc?color=a1b858&label=)](https://www.npmjs.com/package/rehype-vue-sfc)

A [rehype](https://github.com/rehypejs/rehype) plugin, converting HTML AST to a Vue single file component.

## Usage

An example using [unified](https://github.com/unifiedjs/unified):

```ts
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import rehypeVueSFC from 'rehype-vue-sfc'

const processor = unified()
  .use(remarkParse) // parse markdown to AST
  .use(remarkRehype, { allowDangerousHtml: true }) // convert markdown AST to HTML AST
  .use(rehypeRaw) // preserve inline html tags
  .use(rehypeVueSFC) // convert HTML AST to Vue SFC
  .use(rehypeStringify) // stringify

const file = await processor
  .process('# Hello, *Vue SFC*!') // input

console.log(String(file)) // <template><h1>Hello, <em>Vue SFC</em>!</h1></template>
```

## Options

### `hoistStyleTags`

- Type: `boolean`
- Default: `true`

By default, all `<style>` tags are hoisted to the top of the `<template>` block. Set this option to `false` to disable this behavior.

```md
# Hello

Markdown content

<style>
.foo {
  color: red;
}
</style>
```

Will be converted to:

```vue
<template>
  <h1>Hello</h1>
  <p>Markdown content</p>
</template>

<style>
.foo {
  color: red;
}
</style>
```

### `hoistScriptTags`

- Type: `boolean`
- Default: `true`

By default, all `<script>` tags are hoisted to the top of the `<template>` block. Set this option to `false` to disable this behavior.

```md
<script setup>
import MyComponent from './MyComponent.vue'
</script>

# Hello

Markdown content

<MyComponent/>
```

Will be converted to:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <h1>Hello</h1>
  <p>Markdown content</p>
  <MyComponent />
</template>
```

## TODOs

- [ ] Handles frontmatters
- [ ] `rehype-vue-raw` to replace `rehype-raw` with Vue-specific syntax (https://github.com/inikulin/parse5/issues/116)

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)
