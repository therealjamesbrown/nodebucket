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


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    text: { type: String }
});

module.exports = itemSchema;