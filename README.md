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
```

### 1.1. Instalación de API para pruebas

En otra carpeta aparte, se debe instalar un servidor de datos de pruebas para la aplicación.

[Api-Bun](https://github.com/AlbertoBasalo/api_bun) está desarrollado con [bun](https://bun.sh/), pero se puede ejecutar con _Node.js_.

```bash
# Clone bun api from github
git clone https://github.com/AlbertoBasalo/api_bun.git
cd api_bun
# Install the bun dependencies
npm run bun:i
# Run the bun server
npm start
```

### 1.1. Clonado y ejecución de aplicación de ejemplo

```bash
# Clone demo lab from github
git clone https://github.com/TrainingITCourses/softtek_angular_pro_app.git
cd softtek_angular_pro_app/ActivityBookings
# Install
npm i
# Run Angular Server App
npm start
```

> [!NOTE]
> La aplicación de ejemplo estará en la carpeta [ActivityBookings](./ActivityBookings)

## 2. Replicar aplicación de ejemplo

Puedes, replicar la aplicación usando los siguientes comandos y agregando el contenido desde este repo.

```bash
# Generate new Angular project
ng new ActivityBookings --inline-style --inline-template --prefix=lab --skip-tests --ssr --style=css

```

### 3 . Recomendaciones

- Instalar [Angular essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) en Visual Studio Code.

- Configurar Prettier

- Configurar ESLint

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
