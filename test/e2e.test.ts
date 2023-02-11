import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils'

describe('nuxt-time', async () => {
  await setup({
    server: true,
    browser: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })

  it('ssr', async () => {
    const html = await $fetch('/')
    expect(html).toContain('new Intl.DateTimeFormat')
    expect(html).toContain('<time data-n-time')
  })

  it('client', async () => {
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
