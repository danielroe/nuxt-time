import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils'
import { createRegExp } from 'magic-regexp'

await setup({
  server: true,
  browser: true,
  rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
})

describe('nuxt-time', async () => {
  it('ssr', async () => {
    const html = await $fetch('/')
    const snap = html.match(/<time[^>]*data-test-fixed[^>]*>([^<]*)<\/time>/)?.[0]
    expect(snap).toMatchInlineSnapshot(
      '"<time data-n-time data-locale=\\"en-US\\" data-month=\\"long\\" data-day=\\"numeric\\" datetime=\\"2023-02-11T08:24:08.396Z\\" data-test-fixed>February 11</time>"'
    )
  })

  it('injects one script', async () => {
    const html = await $fetch('/')

    const string = createRegExp("document.querySelectorAll('[data-n-time]')", 'g')
    expect(html.match(string)?.length).toEqual(1)
  })

  it('has no hydration errors on the client', async () => {
    const page = await createPage()
    const logs: string[] = []

    page.on('console', event => {
      if (!event.text().includes('<Suspense>')) {
        logs.push(event.text())
      }
    })

    await page.goto(url('/'), { waitUntil: 'networkidle' })

    // No hydration errors
    expect(logs.length).toBe(0)
  })
})
