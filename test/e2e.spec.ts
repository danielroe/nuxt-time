import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils/e2e'
import { createRegExp, exactly } from 'magic-regexp'

await setup({
  server: true,
  browser: true,
  rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
})

describe('nuxt-time', async () => {
  it('ssr', async () => {
    const html = await $fetch('/')
    const snap = html.match(/<time[^>]*data-testid="fixed"[^>]*>([^<]*)<\/time>/)?.[0].replace(/ data-prehydrate-id="[^"]*"/g, '')
    expect(snap).toContain(
      '<time data-month="long" data-day="numeric" datetime="2023-02-11T08:24:08.396Z" data-testid="fixed">',
    )
  })

  it('injects one script', async () => {
    const html = await $fetch('/')

    const string = createRegExp(exactly('document.querySelectorAll'), ['g'])
    expect(html.match(string)?.length).toEqual(1)
  })

  it('has no hydration errors on the client', async () => {
    const page = await createPage(undefined, { locale: 'en-GB' })
    const logs: string[] = []

    page.on('console', (event) => {
      if (!event.text().includes('<Suspense>')) {
        logs.push(event.text())
      }
    })

    await page.goto(url('/'), { waitUntil: 'networkidle' })

    expect(await page.getByTestId('switchable').textContent()).toMatchInlineSnapshot(
      '"11 February at 8"',
    )
    expect(await page.getByTestId('fixed').textContent()).toMatchInlineSnapshot('"11 February"')

    await page.getByText('Switch locale').click()
    expect(await page.getByTestId('switchable').textContent()).toMatchInlineSnapshot(
      '"11 février à 8"',
    )
    expect(await page.getByTestId('fixed').textContent()).toMatchInlineSnapshot('"11 février"')

    await page.getByText('Update time').click()
    expect(await page.getByTestId('switchable').textContent()).not.toEqual('11 février à 8')
    expect(await page.getByTestId('fixed').textContent()).toMatchInlineSnapshot('"11 février"')

    // No hydration errors
    expect(logs.join('')).toMatchInlineSnapshot('""')
  })

  it('displays relative time correctly', async () => {
    const page = await createPage(undefined, { locale: 'en-GB' })
    const logs: string[] = []

    page.on('console', (event) => {
      if (!event.text().includes('<Suspense>')) {
        logs.push(event.text())
      }
    })

    await page.goto(url('/'), { waitUntil: 'networkidle' })

    expect(await page.getByTestId('relative').textContent()).toMatchInlineSnapshot(
      '"30 seconds ago"',
    )

    await page.getByTestId('relative').getByText('32 seconds ago').textContent()

    // No hydration errors
    expect(logs.join('')).toMatchInlineSnapshot('""')
  })
})
