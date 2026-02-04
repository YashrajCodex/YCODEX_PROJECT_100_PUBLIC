import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../features/search-bar/search_bar.component';
import { NotesShellComponent } from '../../features/note-shell/notes-shell.component';
import { notes } from '../../../helper/type';

const STORAGE_KEY_NOTES = 'angular-notes';
@Component({
  selector: 'app-home-layout',
  imports: [SearchBarComponent, NotesShellComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
})
export class HomeLayoutComponent implements OnInit {
  notes: notes[] = [];
  filteredNotes: notes[] = [...this.notes];
  selected: string = '';

  private persistNotes() {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(this.notes));
  }

  ngOnInit(): void {
    const storedNotes = localStorage.getItem(STORAGE_KEY_NOTES);

    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
      this.filteredNotes = this.notes;
    }
  }

  handleUpdateNotes(updatedVal: notes) {
    this.notes = this.notes.map((note) =>
      note.id === updatedVal.id ? { ...note, ...updatedVal } : note,
    );
    this.filteredNotes = this.notes;
    this.persistNotes();
  }

  handleDeletNotes(selectedId: string) {
    // console.log(selectedId);
    const len = this.notes.length
    this.selected = this.notes[len - 1].id;
    this.notes = this.notes.filter((note) => note.id !== selectedId);
    this.filteredNotes = this.notes;
    this.persistNotes();
    // console.log("deletenotesfired");
  }

  handleCreateNote(val: notes) {
    this.notes.push(val);
    this.filteredNotes = this.notes;
    this.persistNotes();
  }

  handleUpdateSelected(val: string) {
    // console.log("select event fired");
    this.selected = val;
  }

  handleSearchChange(val: string) {
    if (!val || val.length < 3) {
      this.filteredNotes = this.notes.slice();
    } else {
      this.filteredNotes = this.notes.slice().filter(note => note.title.toLocaleLowerCase().split(" ").join().slice(0, val.length) === val.toLocaleLowerCase().split(" ").join());
    }
  }
}
