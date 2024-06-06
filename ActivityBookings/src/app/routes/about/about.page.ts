import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Page component to display information about the app.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <header>
        <h2>About this app</h2>
      </header>
      <p>This is a simple Angular application to book activities.</p>
      <p>Used as a laboratory to test different Angular features and best practices.</p>
      <footer>
        <p>© 2024 by <a href="https://albertobasalo.dev" target="_blank">Alberto Basalo</a></p>
      </footer>
    </article>
  `,
})
export default class AboutPage {}
