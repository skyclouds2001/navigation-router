import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('page should be able to load', async ({ page }) => {
  await expect(page).toHaveTitle('navigation-router')

  await expect(page).toHaveURL('/')

  await expect(page.getByTestId('view:').getByText('home', { exact: true })).toHaveText('home')
})

test('router-link should able to navigate', async ({ page }) => {
  await page.getByTestId('link:a').click()

  await expect(page).toHaveURL('/a')

  await page.getByTestId('link:b').click()

  await expect(page).toHaveURL('/b')
})

test('router-link should able to load class name accordingly', async ({ page }) => {
  const fs = await import('node:fs')
  const str = await page.getByTestId('link:home').evaluate((el) => el.outerHTML)
  fs.appendFileSync('log.txt', (str ?? 'unknown') + '\n')

  await expect(page.getByTestId('link:home')).toHaveClass('router-link-active router-link-exact-active')

  await expect(page.getByTestId('link:a')).toHaveClass('')

  await expect(page.getByTestId('link:b')).toHaveClass('')

  await page.getByTestId('link:a').click()

  await expect(page.getByTestId('link:home')).toHaveClass('router-link-active')

  await expect(page.getByTestId('link:a')).toHaveClass(['router-link-active router-link-exact-active'])

  await expect(page.getByTestId('link:b')).toHaveClass('')
})

test('router-view should able to load component', async ({ page }) => {
  await page.getByTestId('link:a').click()

  await expect(page.getByTestId('view:').getByText('a', { exact: true })).toHaveText('a')

  await page.getByTestId('link:b').click()

  await expect(page.getByTestId('view:').getByText('b', { exact: true })).toHaveText('b')
})

test('router-view should support named router', async ({ page }) => {
  await page.getByTestId('link:c').click()

  await expect(page.getByTestId('view:').getByText('c', { exact: true })).toHaveText('c')

  await expect(page.getByTestId('view:c1').getByText('c1', { exact: true })).toHaveText('c1')

  await expect(page.getByTestId('view:c2').getByText('c2', { exact: true })).toHaveText('c2')
})
