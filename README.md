# Test Automation Architecture

This repository contains examples of different test automation architectures, including POM (Page Object Model), Data-Driven Testing (DDT), and Behavior-Driven Development (BDD) using Playwright and Cucumber.

## Getting Started

To clone and set up the repository, run the following command:

```sh
git clone https://github.com/senakorkmaz/Test-automation-architecture.git
cd Test-automation-architecture
npm install
```

## Project Structure

```
Test-automation-architecture/
│
├── tests/                        # Playwright test cases
│   ├── bddTests/                 # BDD Testing (Cucumber) examples
│   │   ├── features/             # Test scenarios (Gherkin syntax)
│   │   │   └── login.feature     # Login test scenario
│   │   ├── steps/                # Step definitions
│   │   │   └── loginSteps.js     # Login step definitions
│   │   └── world.js              # Cucumber World class
│   ├── ddtTests/                 # Data-Driven Testing (DDT) examples
│   │   └── loginDDT.spec.js      # Login test with multiple data sets
│   ├── pomTests/                 # Page Object Model (POM) examples
│   │   └── loginTest.spec.js     # Login test with POM
│
├── pages/                        # Page Object Model (POM) classes
│   └── loginPage.js              # Login page class
│
├── testData/                     # Test data for DDT
│   └── users.json                # User credentials for login tests
│
├── playwright.config.js          # Playwright configuration
├── package.json                  # Dependencies and configurations
└── README.md                     # Project documentation
```

## Running Tests

### Running Playwright Tests (POM & DDT)
```sh
npx playwright test
```

### Running Cucumber Tests (BDD)
```sh
npx cucumber-js tests/bddTests/features/*.feature --require tests/bddTests/world.js --require tests/bddTests/steps/*.js
```

## AI Skills (Codex)

The `.agents/skills/` folder contains three sample [Codex skills](https://learn.chatgpt.com/docs/build-skills) that work together to add new tests to this project:

| Skill | What it does | Output |
|---|---|---|
| `id-testdata-finder` | Opens the page in a browser, finds a stable locator and test data for each component, and lists components without IDs | `skill-output/<page-name>/ids-and-testdata.md` |
| `scenario-explorer` | Explores the page in a browser and lists the test scenarios it observes | `skill-output/<page-name>/scenarios.md` |
| `pom-implementer` | Reads both outputs and implements the scenarios in this project's Page Object Model structure | Page objects in `pages/`, tests in `tests/pomTests/` and `tests/ddtTests/` |

Open the repository in Codex and run them in order:

```text
$id-testdata-finder https://www.saucedemo.com/inventory.html
$scenario-explorer https://www.saucedemo.com/inventory.html
$pom-implementer inventory
```

Always review the generated tests before merging them.

## Contributing
Feel free to submit pull requests or open issues for improvements.

## License
This project is licensed under the MIT License.