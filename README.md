# Nuxt Time

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

> SSR-safe time element for [Nuxt 3](https://nuxt.com)

- [✨ &nbsp;Changelog](https://github.com/danielroe/nuxt-time/blob/main/CHANGELOG.md)
- [▶️ &nbsp;Online playground](https://stackblitz.com/github/danielroe/nuxt-time/tree/main/playground)

## Features

- ✨ SSR/SSG-safe rendering of any date/time
- 💪 Prevents hydration mismatch on client
- 🏁 Respects browser locale
- ✅ Renders semantic `<time>` element

## Installation

Install and add `nuxt-time` to your `nuxt.config`.

```bash
npx nuxi@latest module add time
```

```js
export default defineNuxtConfig({
  modules: ['nuxt-time'],
})
```

## Usage

To use, you can use the `<NuxtTime>` component anywhere in your app. It will render a spec-compliant `<time>` element.

It accepts `datetime` and `locale` (optional) properties, along with any property accepted by `Intl.DateTimeFormat` (see [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)). **Note**: you can provide a `Date` or `number` (e.g. `Date.now()`) via `datetime` and it will be rendered correctly as an ISO-formatted date.

```vue
<template>
  <!--
    Date.now() will safely respect the time on the server, not on the
    client. What's more, there will be no flash between server
    and client locale formatting.
  -->
  <NuxtTime :datetime="Date.now()" second="numeric" month="long" day="numeric" />
</template>
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-time?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-time
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-time?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-time
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/danielroe/nuxt-time/ci.yml?branch=main
[github-actions-href]: https://github.com/danielroe/nuxt-time/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/danielroe/nuxt-time/main?style=flat-square
[codecov-href]: https://codecov.io/gh/danielroe/nuxt-time
