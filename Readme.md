## 1 Setting up of environment

[ignore these] use these instead of npm install to get started from scratch.
npm init -y
npm init playwright@latest
npm install -D allure-playwright allure-commandline
npm install --save-dev typescript or npm install -D typescript
npx tsc --init
npm install --save-dev @types/node or npm install -D @types/node
npm install --save-dev cross-env
npm install dotenv
npm install --save-dev rimraf

after git clone repo, use these
npm ci or npm install ->
(Use npm install when you are actively writing code, adding a new package to your project, or intentionally upgrading your existing tools.
Use npm ci inside GitHub Actions, Jenkins, or Docker container builds. It is also highly recommended when you first clone a teammate's repository to ensure your local setup perfectly matches theirs.)
npx playwright install --with-deps chromium
install extensions -> Playwright Test for VSCode and Prettier - Code formatter and Eslint Microsoft

optional:
npm install --save-dev prettier -> ctrl + shift + p in vsc -> Preferences: Open User Settings (JSON) -> add these -
{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnPaste": true,
"editor.formatOnSave": true,
"editor.formatOnType": true
}
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
{
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"eslint.enable": true,
"eslint.validate": [
"typescript"
]
}

Test report commands:
npm run test:sit
npx allure serve allure-results
npx allure generate allure-results --clean -o allure-report + npx allure open allure-report

## Additional Information

Good order of locators:
getByRole
getByLabel
getByText
getByTitle
getByTextId
CSS selectors
