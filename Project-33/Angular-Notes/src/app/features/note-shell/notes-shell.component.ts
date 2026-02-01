import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NotesListComponent } from "../note-list/notes-list.component";
import { NoteEditorComponent } from "../note-editor/note-editor.component";
import { createNoteEvent, notes } from '../../../helper/type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-shell',
  standalone: true,
  templateUrl: './notes-shell.component.html',
  styleUrls: ['./notes-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NotesListComponent, NoteEditorComponent]
})
export class NotesShellComponent {
  @Input() notes: notes[] = [];
  @Input() selected: string = "";

  titleLocal:string = "";
  contentLocale: string = "";

  public note: notes | null = null;

  @Output() updatedNoteEvent = new EventEmitter<notes>();
  @Output() addNewNoteEvent = new EventEmitter<notes>();
  @Output() updateSelectedEvent = new EventEmitter<string>();

  @Output() DeleteNote = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selected"] && this.notes.length > 0) {
      this.updateNote();
    }
  }

  //update note when selected is changed
  updateNote() {
  this.note = this.notes.find(note => note.id === this.selected) as notes;
    
  }
  // bugs object is undefined
  handleCreateNote() {
    const random = Math.floor(Math.random() * 100000000);
    const placeholderNote: notes = {
    id: `Note${random}`,
    title: "Empty note",
    content: "Enter new content here",
    date: new Date().toLocaleDateString(),
  }
    const note = placeholderNote;
    this.addNewNoteEvent.emit( note );
  }
  handleSelectedNote(val: string) {
    this.updateSelectedEvent.emit(val);
    // console.log(this.note);
  }

  handleSaveNotesEmitter(val: notes) {
    this.updatedNoteEvent.emit(val);
  }
  handleDeleteNoteseEmitter(val: string) {
    this.DeleteNote.emit(val);
  }
}
