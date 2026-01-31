import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

/**
 * SearchBarComponent
 * 
 * Simple search input UI component.
 * 
 * OUTPUTS:
 * - searchChanged: Emits the raw search string on input change
 * 
 * DATA FLOW:
 * - A parent component will:
 *   1. Listen to searchChanged events
 *   2. Implement filtering logic (debouncing if needed)
 *   3. Update the filtered notes list accordingly
 * 
 * This component has NO debouncing, NO filtering logic.
 * It simply emits the input value on every change.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  /** Emits search query when user types in the search input */
  @Output() searchChanged = new EventEmitter<string>();

  /**
   * Called on input change - emits the current value
   * Parent component handles the actual filtering logic
   */
  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(value);
  }
}
