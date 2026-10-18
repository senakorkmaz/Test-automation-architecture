---
name: pom-implementer
description: Use when the outputs of id-testdata-finder and scenario-explorer exist for a page and the user wants the scenarios implemented as Playwright tests in this repository. Follows the project's Page Object Model structure, runs the new tests, and reports the result. Never changes a test just to make it pass.
---

# POM Implementer

Turn the scenarios and locators produced by the other two skills into Playwright tests that look like they were written by the same person who wrote the rest of this project.

## Input

Both files must exist for the page. If one is missing, stop and ask the user to run that skill first.

- `skill-output/<page-name>/ids-and-testdata.md` (from `id-testdata-finder`)
- `skill-output/<page-name>/scenarios.md` (from `scenario-explorer`)

## Project structure

This section was written by reading the repository. Follow it instead of your own preferences.

- **Language**: JavaScript with CommonJS (`require` / `module.exports`). No TypeScript, no ES modules.
- **Page objects** live in `pages/`.
  - File: camelCase, ending in `Page.js` → `pages/inventoryPage.js`
  - Class: PascalCase → `class InventoryPage`
  - Selectors are string properties set in the constructor: `this.cartBadge = '[data-test="shopping-cart-badge"]';`
  - Actions are `async` methods that use `this.page.fill(...)`, `this.page.click(...)`.
  - `navigate()` opens the full URL with `this.page.goto(...)`. There is no `baseURL` in the config.
  - Export at the end: `module.exports = InventoryPage;`
  - `pages/loginPage.js` already exists. Reuse `navigate()` and `login(username, password)` for pages behind the login. Extend an existing page object instead of creating a second one for the same page.
- **POM tests** live in `tests/pomTests/`.
  - File: `<feature>POMTest.spec.js` → `tests/pomTests/inventoryPOMTest.spec.js`
  - Imports: `const { test, expect } = require('@playwright/test');` and the page object with `require('../../pages/<file>')`.
  - Assertions use Playwright's web-first assertions: `await expect(page).toHaveURL(/inventory/);`, `await expect(page.locator(inventoryPage.cartBadge)).toHaveText('1');`
- **Data-driven tests** (scenarios marked DDT) live in `tests/ddtTests/`.
  - File: `<feature>DDT.spec.js`
  - Data goes in `testData/<name>.json` as `{ "<key>": [ { ... }, { ... } ] }`, like `testData/users.json`.
  - Loop with `forEach` inside `test.describe`, one `test` per data row, the row's value in the test title.
- `tests/bddTests/` is a Cucumber example kept for the architecture article. **Do not add tests there.**
- Config: `playwright.config.js`, `testDir: './tests'`, HTML report in `test-results/`.

## Steps

1. Read both input files.
2. For each page in the scenarios, find its page object in `pages/`. Create one only if it does not exist.
3. Add the selectors from the **Locators** table of `ids-and-testdata.md` to the page object. Use them exactly as written.
4. Add the action methods the scenarios need (for example `addToCart(productName)`, `sortBy(option)`).
5. Write one test per scenario. Use the scenario's ID and title in the test name, and tag it with its **Test type** from `scenarios.md` (`@smoke` or `@functional`), so the smoke suite can run on its own with `npx playwright test --grep @smoke`:
   `test('INV-01 Add a product to the cart', { tag: '@smoke' }, async ({ page }) => { ... });`
6. Put DDT scenarios in `tests/ddtTests/` and their data in `testData/`.
7. Run only the new files: `npx playwright test tests/pomTests/<file>`.
8. If a test fails, find out why:
   - Wrong locator or timing → fix the locator or wait for the right state, then run again.
   - The page does not behave as the scenario expects → leave the test failing and report it as a possible bug.

## Rules

- **Never make a test pass by changing its logic.** No `if/else`, no `try/catch` around assertions, no conditional steps, no removed or weakened assertions. A red test that shows a real problem is more useful than a green one that hides it.
- No `page.waitForTimeout(...)`. Rely on Playwright's auto-waiting and `expect` assertions.
- If a selector is a text locator, add a comment above it: `// TODO: text locator, replace when the ID is added (see Missing IDs)`.
- Do not change existing tests or existing selectors unless the user asks.
- Keep each test independent: it logs in and navigates by itself.

## Report

Finish with a short summary:

- Files created or changed.
- Tests run, with passed and failed counts.
- Failing tests that look like product bugs, with the observed behavior.
- Text locators used, so they can be replaced after developers add the missing IDs.
- Scenarios not implemented, and why.
