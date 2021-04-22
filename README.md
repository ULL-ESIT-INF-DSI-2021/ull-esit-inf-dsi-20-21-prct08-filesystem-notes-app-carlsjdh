Coverage:  [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh)  
Tests: [![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh/actions/workflows/tests.yml)   
QG:  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh)

[Volver a Github](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-carlsjdh)

<h1> Práctica 8 - Aplicación de procesamiento de notas de texto  </h1>
<h2> Indice: </h2>

- [Introducción:](#introducción)
- [Objetivos:](#objetivos)
- [Clase Notes:](#clase-notes)
  - [addNotes:](#addnotes)
  - [readNotes:](#readnotes)
  - [listNotes:](#listnotes)
  - [removeNote:](#removenote)
- [Programa principal:](#programa-principal)
- [Ejemplos de uso:](#ejemplos-de-uso)
- [Conclusiones:](#conclusiones)
- [Bibliografía:](#bibliografía)


## Introducción:
Implemetanción de una aplicación de procesamiento de notas de texto. La misma permite añadir, modificar, eliminar , istar y leer notas de usuarios concretos.
Las notas se almacenan en ficheros con contenido en formato JSON de la máquina que ejecute dicha aplicación. Solo será posible interactuar con la misma a través de la línea de comandos gracias al uso del módulo `yargs`.
## Objetivos:
- Utilizar el módulos `yargs` para la implementación de aplicaciones en línea de comandos
- Utilizar la API síncrona de `Node.js` para gestionar el I/O del programa.
## Clase Notes:
Esta clase será la encargada de gestionar la API sincronca de `Node.js`. Recalcar el uso del patrón de diseño `singleton` considerando conveniente que la propia clase gestionará la `BBDD` de notas en un mismo fichero.
```typescript
  private static notes: Notes;

  private constructor() {}

  public static getNotes(): Notes {
    if (!fs.existsSync(`./notes`)) {
      fs.mkdirSync(`./notes`, {recursive: true});
    }
    if (!Notes.notes) {
      Notes.notes = new Notes();
    }
    return Notes.notes;
  };
```

`fs.existsSync(Path)` nos permite verificar si la ruta Path existe ya que existe la posibilidad de tener el directorio donde se guardarán las notas ya generados. De la misma forma, `fs.mkdirSync` nos permite crear un directorio (Recordemos que todos estos pasos se realizan de manera síncrona).
La propia clase siempre genera un directorio `notes` para almacenar las notas.
Los argumentos utilizados para la correcta ejecución del programa son:
- `--user="username"`: Nombre del usuario de la nota
- `--body="Contenido de la nota"`: Contenido de la nota a guardar
- `--title="Título de la nota"`: Nombre de la nota
- `--color="color"`: Color de la nota, en este caso los colores disponibles son `red`, `blue`, `green` y `yellow`. En caso de usar cualquier otro color el programa generará un error de ejecución.

A continuación los principales métodos de la clase son:
### addNotes:
Permite agregar notas utilizando los siguientes argumentos:  

`node dist/note-app.js add --user="Carlos" --title="Nota uno" --body="Esta es mi primera nota" --color="red"`

````typescript
addNotes(username :string, title :string, body :string, color :string) {
    this.checkColor(color);
    // eslint-disable-next-line max-len
    const text = `{ "title": "${title}", "body": "${body}" , "color": "${color}" }`;
    if (fs.existsSync(`./notes/${username}`)) {
      if (!fs.existsSync(`./notes/${username}/${title}`)) {
        fs.writeFileSync(`./notes/${username}/${title}`, text);
        console.log(`New note added! (Title ${title})`);
      } else {
        console.log('Note title taken!');
      };
    } else {
      fs.mkdirSync(`./notes/${username}`, {recursive: true});
      fs.writeFileSync(`./notes/${username}/${title}`, text);
      console.log(`New note added! (Title ${title})`);
    }
  };
````
`this.checkColor` es un método que nos permite primero si el color del argumento es compatible con nuestro programa. Luego ya solo nos queda filtrar el caso en que exista la nota (No podremos agregar una nota con dos títulos iguales), no exista la nota pero tampoco exista el directorio con el nombre de usuario (Por lo tanto es necesario crearla en nuestra `BBDD` ya que es la primera nota de ese usuario que se introduce) y exista el nombre de usuario pero no la nota (por lo tanto agregamos la nota a ese directorio).
Cabe destacar que la nota se guarda en formato `JSON` para una mayor facilidad de gestión a la hora de leer los datos.

````typescript
const text = `{ "title": "${title}", "body": "${body}" , "color": "${color}" }`;
````
Para escribir utilizamos la función ` fs.writeFileSync(path, text` y para la creación de directorios `fs.mkdirSync(Path, {recursive: true})`  

### readNotes:
Permite leer las notas de un determinado usuario, los argumentos a introducir serían los siguientes:
````typescript
node dist/note-app.js read --user="Carlos" --title="Nota uno"
Nota uno
Esta es mi primera nota
````

````typescript
readNotes(username :string, title :string) {
    if (fs.existsSync(`./notes/${username}/${title}`)) {
      const data = fs.readFileSync(`./notes/${username}/${title}`);
      const JsonNote = JSON.parse(data.toString());
      this.consolelogColor(`${JsonNote.title}`, JsonNote.color, true);
      this.consolelogColor(`${JsonNote.body}`, JsonNote.color);
      return JsonNote;
    } else {
      console.log('Note not found');
      return 'Note not found';
    }
  }
````  
El programa verifica si dicha nota existe para leerla y extraer su `JSON` que con `JSON.parse()` convertiremos los datos en un objeto clave-valor para poder mostrar con facilidad los datos pertinentes. `consolelogColor(text, color)` imprime por pantalla el valor introducido por argumento y el color con el que se quiere imprimir.  
El otro caso consiste en no encontrar el directorio ni la nota mostrando un mensaje en pantalla de información.
### listNotes:
Lista las notas de un usuario:
````typescript
node dist/note-app.js list --user="Carlos"
Your notes:
- Nota uno
````
````typescript
  listNotes(username :string) {
    if (fs.existsSync(`./notes/${username}`)) {
      console.log(chalk.white.inverse('Your notes:'));
      let list = '';
      fs.readdirSync(`./notes/${username}/`).forEach((note) => {
        const data = fs.readFileSync(`./notes/${username}/${note}`);
        const JsonNote = JSON.parse(data.toString());
        list = list + JsonNote.title + '\n';
        this.consolelogColor(`- ${JsonNote.title}`, JsonNote.color);
      });
      return list;
    } else {
      console.log(`That user doesn´t exist`);
      return 'User doesnt exist';
    }
  }
````
El programa verifica si el directorio correspondiente del usuario existe ya que si no existe quiere decir que ese usuaio no tiene notas asociadas. En caso de que exista simplemente tenemos que leer cada fichero y extraer su `title` y su `color` gracias al formato `JSON` de los datos y utilizar el `consolelogColor()` para imprimir el `title` con el color correspondiente.  

### removeNote:
Elimina una nota del usuario:
````typescript
node dist/note-app.js remove --user="Carlos" --title="Nota uno"
Note removed!
````
````typescript
  removeNote(username :string, title :string) {
    if (fs.existsSync(`./notes/${username}/${title}`)) {
      console.log('Note removed!');
      fs.rmSync(`./notes/${username}/${title}`);
      return `Note removed!`;
    } else {
      console.log(`No note found`);
      return `No note found`;
    }
  }
````
Funcionamiento bastante simple, si existe el directorio lo eliminamos con `fs.rmSync()` y en caso contrario mostrar información en pantalla que dicha nota no existe.

## Programa principal:
El programa principal se encuentra en `note-app.ts` y es donde se utiliza el módulo de `yargs` para invocar a las diferentes funciones de la clase `Notes`.  

````typescript
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body title',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color´s note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' &&
    typeof argv.title === 'string' &&
    typeof argv.color === 'string' &&
    typeof argv.body === 'string') {
      notas.addNotes(
          argv.user,
          argv.title,
          argv.body,
          argv.color,
      );
    }
  },
});
````
Observamos como para crear un nuevo comando utilizamos el método `command` incluido en la librería de `yargs` donde basicamente especificamos:
- __command__: Introduce el argumento necesario para invocar dicho comando
- __describe__: Una breve descripción del uso del comando
- __builder__: Especifica los argumentos del comando por ejemplo `--user="username"`:
  
  ````typescript
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
  ````
  - __describe__: Nombre del argumento
  - __demandOption__: Argumento obligatorio
  - __type__: tipo del argumento
- __handler(argv)__: Función que recibe como parametro los argumentos que contienen cada uno en formato `JSON`. En este caso se filtra el tipo de dato introducido y posteriormente invoca a la función correspondiente según el comando (En el ejemplo utilizamos `add` por tanto agregamos una nota: 
````typescript
       notas.addNotes(
          argv.user,
          argv.title,
          argv.body,
          argv.color,
      );
````
## Ejemplos de uso:
## Conclusiones:
## Bibliografía:

