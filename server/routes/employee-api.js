const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const errorMessage = require('../config/string-config');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

/**
 * 
 * FIND EMPLOYEE BY ID
 * 
 */
//the colon in ":empId" serves as a placeholder to catch value of route
//example https://localhost:3000/api/employees/1007
router.get('/:empId', async(req, res) => {
    try{
      Employee.findOne({
        'empId': req.params.empId
      }, 
      function(err, employee){
        /**
         * 
         * if db error handle it
         * 
         */
        if (err){
          console.log(err);
          res.status(500).send({
            'message': errorMessage.errorMessages
          }) 
        } else {
          /**
           * 
           * if no db error
           * 
           */
          console.log(employee)
          res.json(employee);
        }
      });
    } catch(e) {
      //log error 
      console.log(e);
      //send response to the end user
      res.status(500).send({
        'message': 'Internal server error...'
      });
    }
  });


  /**
   * 
   * FindAllTasks for an employee
   * 
   */
  router.get('/:empId/tasks', async(req, res) => {
    try {
        //throw new Error('testing my new error response object');
        Employee.findOne({
            'empId': req.params.empId}, 
            'empId todo done', 
            function (err, employee){
                if (err) {
                    console.log(err);
                    const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err)
                    res.status(500).send(mongoDbErrorResponse.toObject());

                } else {
                    console.log(employee);
                    const employeeTasksResponse = new BaseResponse('200', 'Successful!', employee);
                    res.json(employeeTasksResponse.toObject());
                }
            })
    } catch (e) {
        console.log(e);
        const errorCatchResponse = new ErrorResponse('500', 'Internal Server Error', e.message)
        res.status(500).send(errorCatchResponse.toObject());
    }
  });



//BEGIN LIVE CODEING SESSION 9/28





/**
 * 
 * create task
 * 
 */
router.post('/:empId/tasks', async(req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
            Employee.findOne({'empId': req.params.empId}, function(err, employee){
                if(err){
                    console.log(err);
                    const createTasksMongoDBErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                    res.status(500).send(createTasksMongoDBErrorResponse.toObject());
                } else {
                    console.log(employee);
                    //create new item object
                    const item = {
                        text: req.body.text
                    };

                    //push the new item to the todo array
                    employee.todo.push(item);

                    employee.save(function(err, updatedEmployee){
                        //if error handle it
                        if (err){
                            //log the error on the server
                            console.log(err);
                            const createTasksOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'internal server error', err);
                            res.status(500).send(createTasksOnSaveMongoDbErrorResponse.toObject());
                        } else {
                            console.log(updatedEmployee);
                            const createTasksOnSaveMongoDbSuccessResponse = new BaseResponse('200', 'Successful entry', updatedEmployee);
                            res.json(createTasksOnSaveMongoDbSuccessResponse.toObject());
                        }
                    })
                }
            })
    } catch (e) {
        console.log(e);
        const createTaskCatchErrorResponse = new ErrorResponse('500', 'internal sersver errr', e.message);
        res.status(500).send(createTaskCatchErrorResponse.toObject());
    }
  });






  /**
   * 
   * API: Update tasks
   * 
   */

router.put('/:empId/tasks', async(req, res) =>{
    try {
        Employee.findOne({'empId': req.params.empId}, function(error, employee){
            if (err){
                console.log(err);
                //enter error response
                const updateTaskMongoResponse = new ErrorResponse('500', 'internal server error', err);
                res.status(500).send(updateTaskMongoResponse.toObject());
            } else{
                console.log(employee);
                employee.set({
                    todo: req.body.todo,
                    done: req.body.done
                });

                employee.save(function(err, updatedEmployee){
                    if(err){
                        console.log(err);
                        const updateTaskMongoOnSaveResponse = new ErrorResponse('500', 'internal server error', err);
                        res.status(500).send(updateTaskMongoOnSaveResponse.toObject());
                    } else {
                        console.log(updatedEmployee);
                        const updateTaskMongoOnSaveSuccess = new BaseResponse('200', 'success', updatedEmployee);
                        res.json(updateTaskMongoOnSaveSuccess.toObject());
                    }
                })
            }
        })

    } catch(e){
        console.log(e);
        const updateTaskCatchErrorREsponse = new ErrorResponse('500', 'internal error', e.message);
        res.status(500).send(updateTaskCatchErrorREsponse.toObject());
    }
})






/**
 * 
 * API: deleteTask
 * 
 */


router.delete('/:empId/tasks/:taskId', async(req, res) => {
    try {
        Employee.findOne({'empId': req.params.empId}, function(err, employee){
            if (err){
                console.log(err);
                const deleteTasksMongoDbErrorResponse = new ErrorResponse('500', 'internal serve err', err);
                res.status(500).send(deleteTasksMongoDbErrorResponse.toObject());
            }else{
                console.log(employee);

                const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
                const doneItem = employee.todo.find(item => item._id.toString() === req.params.taskId);

                if (todoItem) {
                    employee.todo.id(todoItem._id).remove();
                    employee.save(function(err, updatedTodoItemEmployee){
                        if (err) {
                            console.log(err);
                            const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'internal server error', err);
                            res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());
                        } else {
                            console.log(updatedTodoItemEmployee);
                            const deleteToDoItemOnSuccessResponse = new BaseResponse('200', 'removed item from todo list', emp1);
                            res.json(deleteToDoItemOnSuccessResponse.toObject());
                        }
                    });
                } else if (doneItem){
                    employee.done.id(doneItem._id).remove();
                    employee.save(function(err, updatedDoneItemEmployee){
                        if (err){
                            console.log(err);
                            const deleteDoneItemErrorResponse = new ErrorResponse('500', 'internal error', err);
                            //add error object
                            res.status(500).send(deleteDoneItemErrorResponse.toObject());
                        } else {
                            console.log(updatedDoneItemEmployee);
                            const deleteDoneItemSuccessResponse = new BaseResponse('200', 'removed item from done list', updatedDoneItemEmployee);
                            res.json(deleteDoneItemSuccessResponse.toObject)
                        }
                    })

                } else {
                    console.log('Invalid task ID');
                    const deleteTasksNotFoundRes = new ErrorResponse('200', 'Cant find task ID', null);
                    res.status(200).send(deleteTasksNotFoundRes.toObject());
                }
            }
        })
    } catch(e){
        console.log(e);
        const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'intenral err', e.message);
        res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }
})






/**
 * 
 * angular code only
 * 
 * 
this.http.post('/api/employees/' + empId + 'tasks', {
    todo: this.todo,
    done: this.done
}).subscribe(res => {

})

interface Item{
    text: String
}

const formValue = this.form.controls['item'].value;
const item = new Item{
    text: formValue
}
this.http.put('/api/employees/' + empId + 'tasks', {
    item: this.item
}).subscribe(res => {
    
})
 * 
 *End  angular code only
 */











































  ///end live coding session 9/28
/**
 * 
 *          -- CREATE TASK --
 * Finds empmloyee by id and adds task.
 * Tasks are automatically inserted into the todo array.
 * 

router.post('/:empId/:taskname', async(req, res) => {
    try {
        console.log(req.params);
        Employee.findOneAndUpdate({'empId': req.params.empId}, 
        {$push: { todo: [{text: req.params.taskname}] }}, 
        function (err, employee){
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': 'Internal server error!'
                }) 
            } else {
                console.log(employee);
                res.json(employee)
            }
        })
    } catch (e) {
        res.status(500).send({
            'message': 'internal server error'
        })
    }
  });

 */

  /**
   * 
   *    --Delete Tasks--
   * 
  
  
   router.delete('/:empId/:currentStatus/:taskname', async(req, res) => {
    //check if the current status is either todo or done, so we know where to look
    //if it is in todo, delete from todo array
    if(req.params.currentStatus === 'todo'){
        try {
            console.log(req.params);
            Employee.findOneAndUpdate({'empId': req.params.empId}, 
            {$pull: { todo: {"text": req.params.taskname}}}
            , function (err, employee){
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        'message': 'Internal server error!'
                    });
                } else {
                    console.log(employee);
                    res.json(employee)
                }
            })
        } catch (e) {
            res.status(500).send({
                'message': 'internal server error'
            })
        }

    //else delete from done array
    } else {
        try {
            console.log(req.params);
            Employee.findOneAndUpdate({'empId': req.params.empId}, 
            {$pull: {done: {"text": req.params.taskname}}}
            , function (err, employee){
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        'message': 'Internal server error!'
                    });
                } else {
                    console.log(employee);
                    res.json(employee)
                }
            });
        } catch (e) {
            res.status(500).send({
                'message': 'internal server error'
            });
        }
    }
  });

 */

 /**
 * 
 * Update Task
 * 
 
router.put('/:empId/:currentStatus/:taskname', async (req, res) => {
    try {
        console.log(req.params);
        Employee.findOneAndUpdate({'empId': req.params.empId}, 
        {
            $pull: { todo: {"text": req.params.taskname}},
            $push: { todo: [{text: req.params.taskname}]}, 
        }
        , function (err, employee){
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': 'Internal server error!'
                });
            } else {
                console.log(employee);
                res.json(employee)
            }
        })
    } catch (e) {
        res.status(500).send({
            'message': 'internal server error'
        })
    }
})
 */
module.exports = router; 