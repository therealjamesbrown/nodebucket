/**
 * 
 * ================================
 * ; Title: Nodebucket Project
 * ; Author: James Brown/Professor Krasso
 * ; Modified by: James Brown
 * ; Date: 9/25/2020
 * ; Description: Nodebucket project for web-450
 * 
 * ================================
 */

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { Item } from '../../shared/item.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { MatDialog } from '@angular/material/dialog'
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Item[];
  done: Item[];
  doing: Item[];
  employee: Employee; 

  //employee id from cookie service
  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = this.cookieService.get('session_user'); //get the active session user
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log(res);
      this.employee = res.data; // map the response to our employee interface
      
    }, err => {
      console.log(err);
      //ensure the api requests execute before data gets mapped to UI
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      this.doing = this.employee.doing;
    });
  }

  ngOnInit(): void {}
//drag and drop functionality
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('reodreded the existing list of task items');
      this.updateTaskList(this.empId,this.todo,this.done,this.doing);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateTaskList(this.empId,this.todo,this.done,this.doing);
      console.log('Moved task item to the new container');
    }
  }


  private updateTaskList(empId: string, todo: Item[], done: Item[], doing: Item[]): void{
    this.taskService.updateTask(empId, todo, done, doing).subscribe(res => {
      console.log(res);
      this.employee = res['data']; // map the response to our employee interface
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      this.doing = this.employee.doing;
    })
  }



/**
 * Create task function, which opens a dialog box
 */
  openCreateTaskDialogue(){
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;

        }, err => {
          console.log(err)
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
          this.doing = this.employee.doing;
        })
      }
    })
  }

/**
 * 
 * delete task function
 * 
 */
  deleteTask(taskId: string){
    if(taskId){
      console.log(`Task item: ${taskId} was deleted`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
        }, err => {
          console.log(err)
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
          this.doing = this.employee.doing;
        })
      }
  }
}
