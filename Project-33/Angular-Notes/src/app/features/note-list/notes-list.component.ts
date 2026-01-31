import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { notes } from '../../../helper/type';
import { formatDate } from '../../../helper/helper';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent {
  /** Array of notes to display */
  @Input() notes: notes[] = [];
  
  /** ID of the currently selected note (for visual highlighting) */
  @Input() selectedNoteId: string | null = null;
  
  /** Emits note ID when user clicks on a note */
  @Output() noteSelectedEvent = new EventEmitter<string>();
  @Output() createNoteEvent = new EventEmitter<string>();
 
  /**
   * Called when user clicks on a note item
   * Simply emits the note ID - parent handles the selection logic
   */
  onNoteClick(noteId: string): void {
    this.noteSelectedEvent.emit(noteId);
  }

  fireCreateNote() {
    this.createNoteEvent.emit();
  }

  /**
   * Helper to check if a note is currently selected
   * Used for applying the selected CSS class
   */
  isSelected(noteId: string): boolean {
    return this.selectedNoteId === noteId;
  }

  /**
   * Formats timestamp to readable date string
   * Parent provides the timestamp, this just formats it for display
   */
  
  formatDateLocale = (date?:string)=> formatDate(date);
}
