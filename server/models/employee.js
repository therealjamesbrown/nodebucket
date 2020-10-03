/**
 * 
 * ================================
 * ; Title: Nodebucket Project
 * ; Author: James Brown/Professor Krasso
 * ; Modified by: James Brown
 * ; Date: 10/3/2020
 * ; Description: Nodebucket project for web-450
 * ================================
 */


//employee collection


//import mongoose and create mongoose schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//import item Schema
const Item = require('./item');

//define schema and tell mongoose how to map to mongodb atlas
let empoloyeeSchema = new Schema(
{
    empId:      { type: String, unique: true, dropDups: true },
    firstName:  { type: String },
    lastName:   { type: String },
    todo:       [Item],
    doing:      [Item],
    done:       [Item]
}, {
    //tell mongoose where to map db collection in atlas 
    //Name has to match the collection name in atlas
    collection: 'employees'
});


//export the model so it can be accessed in app.js or any other file
module.exports = mongoose.model('Employees', empoloyeeSchema);
