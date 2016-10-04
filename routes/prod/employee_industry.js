'use strict';

const _ = require('lodash');
const async = require('async');
const express = require('express');
const NodeGeocoder = require('node-geocoder');

const db = require('../../mysql_db_prod.js');
const util = require('../../util.js');

const router = new express.Router();
exports.router = router;

router.post('/1/employee_industry', create_employee_industry);
router.delete('/1/employee_industry/:employee_industry_id', delete_employee_industry);

function create_employee_industry(req, res) {
  const employee_id = req.body.employee_id;
  const industry_id = req.body.industry_id;

  if(!employee_id || !industry_id) {
    res.sendStatus(400);
  } else {
    const sql = "INSERT INTO employee_interested_industry (employee_id, industry_id) VALUES (?, ?)";
    const values = [employee_id, industry_id];
    db.connectAndQuery({sql, values}, (error, results) => {
      if(error) {
        console.error("create_employee_industry: sql err:", error);
        res.sendStatus(500);
      } else {
        res.status(201).send(results.insertId);
      }
    });
  }
}
function delete_employee_industry(req, res) {
  const sql = "DELETE FROM employee_interested_industry WHERE employee_industry_id=?";
  const values = [req.params.employee_industry_id];
  db.connectAndQuery({sql, values}, (error, results) => {
    if(error) {
      console.error("delete_employee_industry: sql err:", error);
      res.sendStatus(500);
    } else if(results.affectedRows < 1) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
}