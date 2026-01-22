import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Repeat, Trash } from 'lucide-angular';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';

const STORAGE_KEY = 'stored_todos'

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodoComponent implements OnInit {

  readonly icons = { Check, Repeat, Trash };
  title: string = '';
  description: string = '';
  todos: Todo[] = [];
  // {
  //   sno: 1,
  //   title: 'Learn Angular',
  //   desc: 'Stop fighting the framework',
  //   active: true,
  // },
  // {
  //   sno: 2,
  //   title: 'Build Todo App',
  //   desc: 'Use Standalone components property',
  //   active: true,
  // },
  // {
  //   sno: 3,
  //   title: 'Dominate',
  //   desc: 'React + Angular brain unlocked',
  //   active: false,
  // },

  ngOnInit(): void {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }
  handleDelete(todo: Todo) {
    this.todos = this.todos.filter((t) => t.sno !== todo.sno);
    this.saveTodos();
    // console.log(this.todos.length)
  }
  handleToggle(todo: Todo) {
    this.todos = this.todos.map((t) =>
      t.sno === todo.sno ? { ...t, active: !t.active } : t,
    );
    this.saveTodos();
  }
  handleAddTodo() {
    const length = this.todos?.length;
    const id = length === 0 ? 1 : this.todos[length - 1]?.sno + 1;
    const todoObject: Todo = {
      sno: id,
      title: this.title,
      desc: this.description,
      active: true,
    };
    // console.log(todoObject);
    this.todos.push(todoObject);

    this.saveTodos();
  }
  
}
