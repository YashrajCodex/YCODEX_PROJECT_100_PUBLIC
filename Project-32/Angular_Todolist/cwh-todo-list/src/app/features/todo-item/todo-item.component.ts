import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todos/todo';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Repeat, Trash } from 'lucide-angular'


@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, LucideAngularModule,],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  readonly icons = {Check, Repeat, Trash}
  @Input() todo!: Todo; 

  @Output() todoDelete = new EventEmitter<Todo>();
  @Output() toggleTodo = new EventEmitter<Todo>();

  onDelete() {
    // console.log("Delete event fired!");
    this.todoDelete.emit(this.todo);
  }
  onToggleTodo() {
  this.toggleTodo.emit(this.todo);
    // console.log("Toggle event fired!")
  }
}
