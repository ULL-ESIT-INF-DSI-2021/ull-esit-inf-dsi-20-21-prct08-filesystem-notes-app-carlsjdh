import 'mocha';
import {expect} from 'chai';
import {Notes} from '../src/notes';
import * as fs from 'fs';


describe(('Inital test'), () => {
  const notes :Notes = Notes.getNotes();
  it(('Se instancia una clase Notes correctamente'), () => {
    expect(notes instanceof Notes).to.be.equal(true);
  });

  it(('Se genera el directorio notes'), () => {
    expect(fs.existsSync(`./notes`)).to.be.equal(true);
  });

  it(('Agregando notas a la BBDD'), () => {
    notes.addNotes(`Carlos`, `Primera Nota`, `Nota`, `blue`);
    expect(fs.existsSync(`./notes/Primera Nota`));
  });

  it(('Leyendo notas a la BBDD'), () => {
    const JsonNotes = notes.readNotes(`Carlos`, `Primera Nota`);
    expect(JsonNotes).to.be.deep.equal(
        {
          'body': 'Nota',
          'color': 'blue',
          'title': 'Primera Nota',
        },
    );
  });

  it(('Mostrando listas de notas'), () => {
    expect(notes.listNotes('Carlos')).to.be.equal('Primera Nota\n');
  });

  it(('Eliminar nota'), () => {
    notes.removeNote('Carlos', `Primera Nota`);
    expect(fs.existsSync(`./notes/Primera Nota`) ).to.be.equal(false);
  });
});
