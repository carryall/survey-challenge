# SurveyChallenge

This project is for Nimble internal certification and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

## Development

Make sure you have the following version of `node` and `npm`

[Node.js](https://nodejs.org/en/) 14.6.0
[NPM](https://www.npmjs.com/) 6.14.6

Run `npm install` to install all dependencies

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### SVG icons

This application uses icon sprite located at `assets/images/icon-sprite.svg` which generated from SVG icons in `assets/images/icons`.
To generate the icon sprite run `npm run generate:sprite`.
Use `svg-icon` tag with icon name in source path to display the icon from sprite.

```html
<svg-icon src="assets/images/icon-sprite.svg#<icon-name>" class="icon"></svg-icon>
```

## Deployment

Deployed to Heroku for [staging](https://survey-challenge-staging.herokuapp.com/) and [production](https://survey-challenge-production.herokuapp.com/) release
