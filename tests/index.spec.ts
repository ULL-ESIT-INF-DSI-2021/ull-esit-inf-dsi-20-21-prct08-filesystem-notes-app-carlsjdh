import 'mocha';
import {expect} from 'chai';
import {Notes} from '../src/notes';
// import * as fs from 'fs';


describe(('Inital test'), () => {
  const notes :Notes = Notes.getNotes();
  it(('Se instancia una clase Notes correctamente'), () => {
    expect(notes instanceof Notes).to.be.equal(true);
  });
});
