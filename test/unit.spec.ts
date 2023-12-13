// @vitest-environment nuxt
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NuxtTime from '../src/runtime/components/NuxtTime.vue'

describe('<NuxtTime>', () => {
  it('should not serialise data in the DOM in the client', async () => {
    const thing = await mountSuspended(
      defineComponent({
        render: () =>
          h(NuxtTime, {
            datetime: '2023-02-11T18:26:41.058Z',
            locale: 'en-GB',
            month: 'long',
            day: 'numeric',
            second: 'numeric',
          }),
      })
    )
    expect(thing.html()).toMatchInlineSnapshot(
      `"<time data-n-time="" datetime="2023-02-11T18:26:41.058Z">11 February at 41</time>"`
    )
  })
})
