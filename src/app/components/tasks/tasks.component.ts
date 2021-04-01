import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText = '';
  showForm = false;
  editForm = false;

  myTask: Task = {
    label: '',
    completed: false
  };
  tasks: Task[] = [];
  resultTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.findAll()
      .subscribe(tasks => {
        this.resultTasks = this.tasks = tasks;
      });
  }

  deleteTask(id: any): void{
    this.taskService.delete(id)
      .subscribe( () => {
        this.tasks = this.tasks.filter(task => task.id !== id );
      });
  }


  persistTask(): void{
    this.taskService.persist(this.myTask)
      .subscribe((task) => {
        this.tasks = [task, ...this.tasks];
        this.resetTask();
        this.showForm = false;
      });
  }

  resetTask(): void{
    this.myTask = {
      label: '',
      completed: false
    };
  }
  toggleCompleted(task: Task): void{
    this.taskService.completed(task.id, task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      });
  }

  editTask(task: Task): void{
    this.myTask = task;
    this.editForm = true;
    this.showForm = true;
  }

  updateTask(): void{
    this.taskService.update(this.myTask)
      .subscribe(() => {
        this.resetTask();
        this.editForm = false;
        this.showForm = false;
      });
  }

  searchTasks(): void{
    this.resultTasks = this.tasks.filter((task) => task.label.toLocaleLowerCase().includes(this.searchText.toLowerCase()));
  }

}
