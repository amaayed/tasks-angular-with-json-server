import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {  }

  // tslint:disable-next-line:typedef
  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  // tslint:disable-next-line:typedef
  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  persist(task: any){
    return this.http.post<Task>(this.apiUrl, task);
  }

  // tslint:disable-next-line:typedef
  completed(id: any, completed: boolean){
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, {completed: !completed});
  }

}
