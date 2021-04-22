import * as yargs from 'yargs';
import {Notes} from './notes';

/**
 * Creación de la clase Notes
 */
const notas :Notes = Notes.getNotes();

/**
 * Comando add
 */
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

/**
 * Comando list
 */
yargs.command({
  command: 'list',
  describe: 'List notes',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      notas.listNotes(argv.user);
    }
  },
});

/**
 * Comando read
 */
yargs.command({
  command: 'read',
  describe: 'read note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notas.readNotes(argv.user, argv.title);
    }
  },
});

/**
 * Comando remove
 */
yargs.command({
  command: 'remove',
  describe: 'Remove note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notas.removeNote(argv.user, argv.title);
    }
  },
});

/**
 * Le pasa los argumentos a yargs
 */
yargs.argv;
