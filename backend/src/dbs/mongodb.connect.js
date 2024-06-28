"use strict";
const { default: mongoose } = require("mongoose");
const { mongodb } = require("../configs/config.mongodb");
const connectString = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.name}`;
const connectString2 = process.env.MONGOATLAS;
class MongooDB {
  constructor() {
    this.connect();
  }
  async connect() {
    mongoose
      .connect(connectString2)
      .then((_) => {
        console.log("Connected mongodb success!!!");
      })
      .catch((err) => {
        console.log("Error Connect: " + err);
      });
    mongoose.set("debug", true);
  }
  async createInstance() {
    if (!this.instance) {
      this.instance = new MongooDB();
      return this.instance;
    }
    return this.instance;
  }
}
const mongoInstance = new MongooDB();
module.exports = mongoInstance;
