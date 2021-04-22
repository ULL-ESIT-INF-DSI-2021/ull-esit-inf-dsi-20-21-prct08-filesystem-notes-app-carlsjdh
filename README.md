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
  - [consolelogColor:](#consolelogcolor)
  - [checkColor:](#checkcolor)
- [Programa principal:](#programa-principal)
- [Ejemplos de uso](#ejemplos-de-uso)
- [Testing:](#testing)
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
Permite agregar notas utilizando los siguientes argumentos
### readNotes:
### listNotes:
### removeNote:
### consolelogColor:
### checkColor:
## Programa principal:
## Ejemplos de uso
## Testing:
## Conclusiones:
## Bibliografía:

