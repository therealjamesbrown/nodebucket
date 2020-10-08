/**
 * 
 * ================================
 * ; Title: Nodebucket Project
 * ; Author: James Brown/Professor Krasso
 * ; Modified by: James Brown
 * ; Date: 9/25/2020
 * ; Description: Nodebucket project for web-450
 * 
 */


//hold response from the server apis
import { Item } from './item.interface';

export interface Employee{
    empId: string;
    todo: Item[];
    done: Item[];
    doing: Item[];
}