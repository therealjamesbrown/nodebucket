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
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient){ 
    this.sessionUser = this.cookieService.get('session_user'); //get looged in empID
              }


/**
 * 
 * Find all tasks
 */

findAllTasks(){
  return this.http.get(`/api/employees/${this.sessionUser}/tasks`);
}


/** 
  * 
  * createTask
  * 
*/

/**
  * 
  * updateTask
  * 
*/

/**
 * deleteTask
 */
}
