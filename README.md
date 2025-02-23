# AgentPlayground

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Set PATH

```
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
```
## Clean

```
rm -rf node_modules package-lock.json .angular/cache
rm -rf node_modules package-lock.json  # ✅ Remove old dependencies
npm install                            # ✅ Reinstall fresh dependencies

ng serve --open
```

## Troubleshoot

```
npm list @angular/compiler
```

```
npm install @angular/compiler --save-dev
```
## Fix	How to Check?

✅ Check for auto-generated files	Look in src/app/generated/ or src/app/components/widgets/org-chart/
✅ Clear Angular cache & reinstall	Run rm -rf node_modules package-lock.json .angular/cache && npm install && ng serve --open
✅ Check for duplicate imports	Ensure app.module.ts only imports OrgChartComponent once

## How to use HTTPS

```
openssl req -x509 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -days 365 -nodes -subj "/CN=localhost"

ng serve --ssl --ssl-cert ./localhost.crt --ssl-key ./localhost.key --open

```