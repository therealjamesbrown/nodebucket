const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();



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
            'message': 'Internal server error with get emp id api'
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
        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function (err, employee){
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


/**
 * 
 *          -- CREATE TASK --
 * Finds empmloyee by id and adds task.
 * Tasks are automatically inserted into the todo array.
 * 
 */
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



  /**
   * 
   *    --Delete Tasks--
   * 
   */
  
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



 /**
 * 
 * Update Task
 * 
 */
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

module.exports = router; 