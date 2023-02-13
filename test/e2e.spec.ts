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
    const snap = html.match(/<time[^>]*data-testid="fixed"[^>]*>([^<]*)<\/time>/)?.[0]
    expect(snap).toContain(
      '<time data-n-time data-month="long" data-day="numeric" datetime="2023-02-11T08:24:08.396Z" data-testid="fixed">'
    )
  })

  it('injects one script', async () => {
    const html = await $fetch('/')

    const string = createRegExp("document.querySelectorAll('[data-n-time]')", 'g')
    expect(html.match(string)?.length).toEqual(1)
  })

  it('has no hydration errors on the client', async () => {
    const page = await createPage(undefined, { locale: 'en-GB' })
    const logs: string[] = []

    page.on('console', event => {
      if (!event.text().includes('<Suspense>')) {
        logs.push(event.text())
      }
    })

    await page.goto(url('/'), { waitUntil: 'networkidle' })

    expect(await page.getByTestId('switchable').innerText()).toMatchInlineSnapshot(
      '"11 February at 8"'
    )
    expect(await page.getByTestId('fixed').innerText()).toMatchInlineSnapshot('"11 February"')

    await page.getByText('Switch locale').click()
    expect(await page.getByTestId('switchable').innerText()).toMatchInlineSnapshot(
      '"11 février à 8"'
    )
    expect(await page.getByTestId('fixed').innerText()).toMatchInlineSnapshot('"11 février"')

    await page.getByText('Update time').click()
    expect(await page.getByTestId('fixed').innerText()).toMatchInlineSnapshot('"11 février"')

    // No hydration errors
    expect(logs.join('')).toMatchInlineSnapshot('""')
  })
})
