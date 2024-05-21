# CLI commands

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

# ui atoms for date, currency, etc.
ng g c shared/ui/date
ng g c shared/ui/currency
```
