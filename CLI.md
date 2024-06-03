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
