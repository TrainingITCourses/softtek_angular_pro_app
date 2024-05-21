# softtek_angular_pro_app
Demo app para el curso avanzado de Angular

> [Laboratorio de ejemplo](https://github.com/TrainingITCourses/softtek_angular_pro_app) del curso de [Angular Moderno Pro para Softtek](https://cursos.trainingit.es/course/view.php?id=1570) impartido por [Alberto Basalo](https://albertobasalo.dev) con TrainingIT.

> [!NOTE]
> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version _17.3.7._
> Updated to Angular **17.3.7.**

## 1. Requisitos para el laboratorio

Comprobar [versión de Node.js](https://angular.io/guide/versions) y npm.

Instalar **Angular CLI**para generar aplicación de ejemplo.

```bash
# Check Node.js and npm versions
node -v
npm -v
# Install Angular CLI
npm i -g @angular/cli@latest
# Clone lab from github
git clone https://github.com/TrainingITCourses/softtek_angular_pro_app.git
# Install and run
cd softtek_angular_pro_app/ActivityBookings
npm i
# Run a fake API server
npm run api:seed
# Run Angular Server App
npm start
```

> [!NOTE]
> La aplicación de ejemplo estará en la carpeta [ActivityBookings](./ActivityBookings)

## 2. Replicar aplicación de ejemplo

Puedes, repplicar la aplicación usando los isguientes comandos y agregando el contenido desde esta.

```bash
# Generate new Angular project
ng new ActivityBookings --inline-style --inline-template --prefix=lab --skip-tests --ssr --style=css
# Or run with npx and options with aliases (- instead of --)
npx ng new ActivityBookings -s -t -p=lab -S --ssr --style=css
```

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
