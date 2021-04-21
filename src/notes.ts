import * as fs from 'fs';
import * as chalk from 'chalk';


export class Notes {
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

  consolelogColor(text :string, color :string, inverse :boolean = false) {
    switch (color) {
      case 'blue':
        console.log(
          (inverse) ? chalk.blue.inverse(text) : chalk.blue(text),
        );
        break;
      case 'yellow':
        console.log(
          (inverse) ? chalk.yellow.inverse(text) : chalk.yellow(text),
        );
        break;
      case 'red':
        console.log(
          (inverse) ? chalk.red.inverse(text) : chalk.red(text),
        );
        break;
      case 'green':
        console.log(
          (inverse) ? chalk.green.inverse(text) : chalk.green(text),
        );
        break;
    }
  }

  checkColor(color :string) {
    const bool = true;
    switch (color) {
      case 'blue':
        return bool;
      case 'yellow':
        return bool;
      case 'red':
        return bool;
      case 'green':
        return bool;
    }
    throw new Error('Color problem');
  }
};
