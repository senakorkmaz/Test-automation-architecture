# Test Automation Architecture

This repository contains examples of different test automation architectures, including POM (Page Object Model), Data-Driven Testing (DDT), and Behavior-Driven Development (BDD) using Playwright and Cucumber.

## Getting Started

To clone and set up the repository, run the following command:

```sh
git clone https://github.com/your-username/Test-automation-architecture.git
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

## Contributing
Feel free to submit pull requests or open issues for improvements.

## License
This project is licensed under the MIT License.