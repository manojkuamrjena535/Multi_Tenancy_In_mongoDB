const express = require('express');
const TaskShared = require('../models/task.shared');
const getTaskModelForTenant = require('../models/task.perCollection');
const getTenantDb = require('../services/tenantDb');
const mongoose = require('mongoose'); // Add this

const router = express.Router();

// Middleware to simulate tenant from request
router.use((req, res, next) => {
  req.tenantId = req.headers['x-tenant-id']; // Pass in header
  if (!req.tenantId) return res.status(400).json({ error: "Missing x-tenant-id" });
  next();
});

// 1️⃣ Shared Collection
router.post('/shared', async (req, res) => {
  const task = new TaskShared({ tenantId: req.tenantId, title: req.body.title });
  await task.save();
  res.json(task);
});

router.get('/shared', async (req, res) => {
  const tasks = await TaskShared.find({ tenantId: req.tenantId });
  res.json(tasks);
});

// 2️⃣ Per Collection
router.post('/per-collection', async (req, res) => {
  const Task = getTaskModelForTenant(req.tenantId);
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

router.get('/per-collection', async (req, res) => {
  const Task = getTaskModelForTenant(req.tenantId);
  const tasks = await Task.find();
  res.json(tasks);
});

// 3️⃣ Separate Database
router.post('/per-db', async (req, res) => {
  const db = getTenantDb(req.tenantId);
const Task = db.model('Task', new mongoose.Schema({ title: String }));
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

router.get('/per-db', async (req, res) => {
  const db = getTenantDb(req.tenantId);
const Task = db.model('Task', new mongoose.Schema({ title: String }));
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;
