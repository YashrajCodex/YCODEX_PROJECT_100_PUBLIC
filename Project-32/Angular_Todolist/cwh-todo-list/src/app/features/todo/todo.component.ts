import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todos: Todo[] = []
}
