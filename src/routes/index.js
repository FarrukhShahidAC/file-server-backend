const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/download", controller.download);

  app.use(router);
};

module.exports = routes;
