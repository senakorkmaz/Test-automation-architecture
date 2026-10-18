---
name: id-testdata-finder
description: Use when the user gives a page URL and wants the IDs and test data for its components before writing automation. Opens the page in a real browser, reads the live DOM, picks a stable locator for each component, collects test data, and lists components that have no ID so developers can add them. Does not write test code.
---

# ID & Test Data Finder

Find what the automation needs from a page **as it renders in the browser**, not from the source code.

## Input

- A page URL, for example `https://www.saucedemo.com/inventory.html`.
- Optional: the components to focus on. If none are given, cover every interactive element (inputs, buttons, links, dropdowns) and every element a test would assert on (titles, prices, error messages, counters).

## Steps

1. Open the URL in the browser tool available to you (for example the Playwright MCP server) and wait for the page to finish loading.
2. If the page redirects to the login page, log in with the first user in `testData/users.json` (`standard_user`) and open the URL again.
3. For each component, read its attributes from the live DOM and pick a locator in this order:
   1. `id` → `#login-button`
   2. `data-test` or `data-testid` → `[data-test="add-to-cart-sauce-labs-backpack"]`
   3. Role and accessible name → `getByRole('button', { name: 'Login' })`
   4. Visible text → `text=Sauce Labs Backpack` (**last resort**)
4. Check every locator against the live page: it must match **exactly one** element. If it matches more, narrow it with a parent; never return a locator you did not check.
5. Collect the test data a scenario will need:
   - Users and passwords already in `testData/users.json`.
   - Values shown on the page that tests will assert on (product names, prices, sort options, error texts).
   - Valid, invalid and empty values for every input.
6. If a component has neither an `id` nor a `data-test`/`data-testid`, add it to **Missing IDs** with a suggested ID in kebab-case.

## Output

Save the result to `skill-output/<page-name>/ids-and-testdata.md` in this format:

```markdown
# <Page name> — <URL>

## Locators
| Component | Locator | Source | Matches |
|---|---|---|---|
| Username input | #user-name | id | 1 |
| Error message | [data-test="error"] | data-test | 1 |

## Test data
| Field | Valid | Invalid / edge |
|---|---|---|
| Username | standard_user | locked_out_user, empty |

## Missing IDs (share with developers)
| Component | Current locator | Suggested ID |
|---|---|---|
| <Component name> | text=<visible text> | <suggested-id> |
```

The `pom-implementer` skill reads this file, so keep the headings and columns as they are.

## Rules

- Never invent an attribute. If it is not in the live DOM, it does not exist.
- A text locator must also appear in **Missing IDs**, so it can be replaced later.
- Do not write or change any test code.
