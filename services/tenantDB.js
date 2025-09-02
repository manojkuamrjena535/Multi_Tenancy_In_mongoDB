const mongoose = require("mongoose");
const connections = {};

const getTenantDb = (tenantId) => {
  if (!connections[tenantId]) {
    const url = `${process.env.MONGO_URL_BASE}/${tenantId}_db`;
    connections[tenantId] = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return connections[tenantId];
};

module.exports = getTenantDb;
