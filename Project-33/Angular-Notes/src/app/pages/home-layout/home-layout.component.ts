import { Component } from '@angular/core';
import { SearchBarComponent } from '../../features/search-bar/search_bar.component';
import { NotesShellComponent } from "../../features/note-shell/notes-shell.component";
import { notes } from '../../../helper/type';
@Component({
  selector: 'app-home-layout',
  imports: [SearchBarComponent, NotesShellComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  notes: notes[] = [];
  selected: string = '';

  handleUpdateNotes(updatedVal: notes) {
    console.log(updatedVal);
    this.notes = this.notes.map(note =>
      note.id === updatedVal.id ? {...note, ...updatedVal} : note
    );
  }

  handleCreateNote(val: notes) {
    this.notes.push(val);

  }
  handleUpdateSelected(val: string) {
    this.selected = val;
  }
}
