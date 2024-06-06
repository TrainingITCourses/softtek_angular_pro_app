# CLI commands

## Sesión 1

1. Modern Angular Applications
   - Standalone, Single-file, Signal components
   - Lazy loading components and Signal parameters
   - Container/presenter with Signals
2. Application architecture
   - Organization without modules
   - Core services and providers
   - Domain and clean architecture

```bash
# Generate new Angular project
ng new ActivityBookings --inline-style --inline-template --prefix=lab --skip-tests --ssr --style=css
cd ActivityBookings
ng g environments
# configure schematics
ng config projects.ActivityBookings.schematics.@schematics/angular:component.changeDetection \"OnPush\"
ng config projects.ActivityBookings.schematics.@schematics/angular:component.flat true
ng config projects.ActivityBookings.schematics.@schematics/angular:component.style \"none\"
# Add Pico-CSS
npm install @picocss/pico
# from linux/git terminal
ng config projects.ActivityBookings.architect.build.options.styles [\"node_modules/@picocss/pico/css/pico.min.css\",\"src/styles.css\"]


# Eslint - Prettier
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev



# Header widget
ng g c core/header --type=widget

# Home page
ng g c routes/home/home --type=page
ng g s routes/home/home
ng g c routes/home/activity-list

# Activities
ng g i shared/domain/activity --type=type
# - export as type instead of interface
ng g class shared/services/activities --type=repository
# - rename to ActivitiesRepository and add injectable providedIn: 'root'

# ui atoms for date, currency, location etc.
ng g c shared/ui/date
ng g c shared/ui/currency
ng g c shared/ui/location

```

## Sesión 2

3. State management
   - Signal stores to communicate components
   - RxJs Interop to manage async data
   - Simple Redux with Signals and RxJs

```bash
# searching home page
ng g c routes/home/search-bar

# Bookings:slug page
ng g c routes/bookings/booking --type=page
ng g s routes/bookings/booking
ng g r routes/bookings/activity
ng g c routes/bookings/booking-details
ng g i shared/domain/booking --type=type
ng g class shared/services/bookings --type=repository
ng g class routes/bookings/booking --type=store
ng g c routes/bookings/new-booking
ng g c shared/ui/activity-status
ng g c routes/bookings/activity-details
```

PWA

```bash
ng add @angular/pwa
npm i http-server --save-dev
npm run build
# "start:PWA": "npm run build && http-server -p 8080 -c-1 dist/activity-bookings/browser"
http-server -p 8080 -c-1 dist/activity-bookings/browser
```

TESTING

Remove Karma and Jasmine

```bash
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
```

Install Jest

```bash
npm i -D jest @types/jest
npm i -D @angular-builders/jest@next
```

Setup Jest

`setup-jest.ts`

```typescript
import "jest-preset-angular";
```

`package.json`

```json
"jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/setup-jest.ts"
  }
```

Angular builders test

```bash
npm i @angular-builders/jest
```

# LIBS

## Sesión 5

```bash
# libraries laboratory
mkdir lb-lab
cd lb-lab
```

## Generate WorkSpace for UI library

```bash
ng new ws-ui --no-create-application
ng g lib lab-ui --prefix=lab-ui --style=css
ng g app lab-ui-host --minimal
ng config projects.lab-ui.schematics.@schematics/angular:component.changeDetection \"OnPush\"
ng config projects.lab-ui.schematics.@schematics/angular:component.flat true
ng config projects.lab-ui.schematics.@schematics/angular:component.inlineTemplate true
ng config projects.lab-ui.schematics.@schematics/angular:component.inlineStyle true
ng config projects.lab-ui.schematics.@schematics/angular:component.style \"none\"
```

### Development and testing the library

```bash
# "watch": "ng build lab-ui --watch --configuration development",
npm run watch
# "start": "ng serve lab-ui-host",
npm start
# "test": "ng test lab-ui"
npm test
```

### Build and publish (link) and consume (link) the library

```bash
# "publish": "npm run build && cd dist/lab-ui && npm link",
npm run publish
# list global npm links
npm ls -g --depth=0
# target the global npm link
cd ..
ng new lab-target --minimal
cd lab-target
npm link lab-ui
# build.options: preserveSymlinks: true
ng config projects.lab-target.architect.build.options.preserveSymlinks true
npm start
```
