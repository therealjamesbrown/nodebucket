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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Array<Item>;
  done: Array<Item>;
  doing: Array<Item>;


  constructor(private taskService: TaskService) { 
    this.taskService.findAllTasks().subscribe(res => {
      this.todo= res['data'].todo;
      this.done = res['data'].done;
      this.doing = res['data'].doing;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
