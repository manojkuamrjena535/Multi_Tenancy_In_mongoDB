require('dotenv').config();
const express = require('express');
const connectMainDb = require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

connectMainDb();

app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
