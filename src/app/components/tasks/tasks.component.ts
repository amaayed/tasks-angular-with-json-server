import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  myTask: Task = {
    label: '',
    completed: false
  };
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.findAll()
      .subscribe(tasks => this.tasks = tasks);
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
}
