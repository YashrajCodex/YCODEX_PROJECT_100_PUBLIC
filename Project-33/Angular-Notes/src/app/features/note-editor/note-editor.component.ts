import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { formatDate } from '../../../helper/helper';
import { notes } from '../../../helper/type';
import {  LucideAngularModule, SaveIcon, DeleteIcon} from 'lucide-angular';

@Component({
  selector: 'app-note-editor',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent implements OnChanges {

  readonly icons = { SaveIcon, DeleteIcon };
  /** Current note title to display in the input */
  @Input() title?: string = '';

  /** Current note content to display in the textarea */
  @Input() content?: string = '';

  /** Current note date to display in the textarea */
  @Input() date?: string = '';

  /** Current selected note if any */
  @Input() currentSelected = '';

  // local variables for easy value updating
  localTitle = '';
  localContent = '';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['titile'] || changes['content']) {
      this.localTitle = changes['title'].currentValue ?? '';
      this.localContent = changes['content'].currentValue ?? '';
    }
  }
  //emiting signal for updating notes
  @Output() saveEventFired = new EventEmitter<notes>();

  /**
   * Formats timestamp to readable date string
   * Parent provides the timestamp, this just formats it for display
   */
  formatDateLocale = (date?: string) => formatDate(date);

  /**
   Called when title input changes
   */
  onTitleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.localTitle = value;
  }

  /**
    Called when content textarea changes
   */
  onContentInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.localContent = value;
  }

  onSave() {
    const val: notes = {
      id: this.currentSelected,
      title: this.localTitle,
      content: this.localContent,
      date: new Date().toLocaleString(),
    };

    this.saveEventFired.emit(val);
  }
}
