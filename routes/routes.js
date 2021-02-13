module.exports = (app) => {
  const controller = require("../controllers/controllers.js");

  app.get("/login", controller.logIn);

  app.get("/callback", controller.callback);

  app.get("/getTrack", controller.getTrack);
};
