/**
 * 
 * ================================
 * ; Title: Nodebucket Project
 * ; Author: James Brown/Professor Krasso
 * ; Modified by: James Brown
 * ; Date: 9/25/2020
 * ; Description: Nodebucket project for web-450
 * ================================
 */


 //all api calls to the server apis go here

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient){ 
              }


/**
 * 
 * Find all tasks
 */
findAllTasks(empId: string): Observable<any> {
  return this.http.get(`/api/employees/${empId}/tasks`);
}


/** 
  * 
  * createTask
  * 
*/
createTask(empId: string, task: string): Observable<any>{
  return this.http.post(`/api/employees/${empId}/tasks`, {
    text: task
  })
}


/**
  * 
  * updateTask
  * 
*/

updateTask(empId: string, todo: Item[], done: Item[], doing: Item[]){
  return this.http.put(`/api/employees/${empId}/tasks`, {
    todo,
    done,
    doing
  })
}


/**
 * deleteTask
 */

 deleteTask(empId: string, taskId: string): Observable<any>{
  return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`);
 }
}
