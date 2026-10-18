---
name: scenario-explorer
description: Use when the user gives a page URL and wants possible test scenarios for it. Opens the page in a real browser, interacts with it like a tester (valid, invalid and empty inputs, sorting, navigation), and writes a scenario list for the pom-implementer skill. Does not write test code.
---

# Scenario Explorer

Explore a page in the browser and turn what you **observe** into test scenarios.

## Input

- A page URL, for example `https://www.saucedemo.com/inventory.html`.
- Optional: `skill-output/<page-name>/ids-and-testdata.md` from the `id-testdata-finder` skill. If it exists, use its test data to vary the scenarios.

## Steps

1. Open the URL in the browser tool available to you (for example the Playwright MCP server). If the page needs a login, use the first user in `testData/users.json`.
2. Explore the page like a tester:
   - Fill every input with valid, invalid and empty values, and submit.
   - Use every dropdown, sort option and filter, and check how the page changes.
   - Click every button and link, and note where it goes and what changes (counters, badges, messages).
   - Repeat the main flow with each user and each value from the test data.
3. Write down only behavior you actually saw. If you expect something but could not confirm it, add it under **Assumptions** instead of as a scenario.
4. Group the scenarios:
   - **Happy path**: the main flow works.
   - **Negative**: wrong or missing input is handled with a clear message.
   - **Edge**: boundaries, empty states, repeated actions.
   - **Navigation**: links and redirects land on the right page.
5. Give each scenario a test type using the ISTQB definitions in **Test types (ISTQB)** below.
6. Mark a scenario as **DDT** when the same steps should run with several data rows (for example, every user in `testData/users.json`).

## Test types (ISTQB)

Classify every scenario with the ISTQB terms below. When in doubt, choose **Functional**.

- **Smoke**: a small test suite that covers the main functionality of the page, to check that it works properly before deeper testing starts. Mark only the scenarios that must pass for the page to be usable at all (the page loads, a valid user logs in, the main action works). Keep it to a few scenarios per page. A smoke scenario is still a functional test; it just runs first.
- **Functional**: checks *what* the page does against its functional requirements: inputs and outputs, business rules, validations, error messages, navigation. Most scenarios belong here.
- **Non-functional**: checks *how well* the page works: performance, usability, accessibility, security, compatibility. List only what you can observe in the browser (for example a slow load or an input without a label). Write them under **Non-functional notes**, not in the scenario table: `pom-implementer` does not implement them, they go to the team as notes.
- **Regression** is not a separate label: every automated scenario becomes part of the regression suite, which is re-run after changes to find defects in areas that did not change.

## Output

Save the result to `skill-output/<page-name>/scenarios.md` in this format:

```markdown
# <Page name> — scenarios

| ID | Group | Test type | Scenario | Steps | Expected result | Data | DDT |
|---|---|---|---|---|---|---|---|
| INV-01 | Happy path | Smoke | Add a product to the cart | Click "Add to cart" on Sauce Labs Backpack | Cart badge shows 1, button turns into "Remove" | Sauce Labs Backpack | No |
| INV-02 | Edge | Functional | Sort products by price (low to high) | Choose "Price (low to high)" | First product is the cheapest | Sort options | No |

## Non-functional notes
- <Observed performance, usability, accessibility or security issue>

## Assumptions
- <Behavior you expected but could not confirm in the browser>
```

The `pom-implementer` skill reads this file, so keep the headings and columns as they are.

## Rules

- One scenario checks one behavior. Split long flows.
- Every expected result must be something a test can assert (a URL, a text, a count, a visible element).
- Do not write or change any test code.
