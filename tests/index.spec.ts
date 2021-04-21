import 'mocha';
import {expect} from 'chai';
import {Notes} from '../src/notes';
import * as fs from 'fs';


describe(('Inital test'), () => {
  fs.rmdirSync(`./notes`, {recursive: true});
  const notes :Notes = Notes.getNotes();
  it(('Se instancia una clase Notes correctamente'), () => {
    expect(notes instanceof Notes).to.be.equal(true);
  });
});
