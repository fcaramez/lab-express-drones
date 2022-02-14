const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  Drone.find()
    .then((allDrones) => {
      console.log(allDrones);
      res.render("drones/list.hbs", { allDrones });
    })
    .catch((err) => next(err));
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then((createdDrone) => {
      console.log("A drone as created!", createdDrone.name);
      res.redirect("/drones");
    })
    .catch((err) => next(err));
});

router.get("/drones/:droneId/edit", (req, res, next) => {
  const { droneId } = req.params;
  Drone.findById(droneId)
    .then((foundDrone) => {
      res.render("drones/update-form.hbs", { drone: foundDrone });
    })
    .catch((err) => next(err));
});

router.post("/drones/:id/edit", (req, res, next) => {
  const { droneId } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed }).then(
    (updatedDrone) => {
      res.redirect(`/drones/${updatedDrone._id}`);
    }
  );
});

router.post("/drones/:droneId/delete", (req, res, next) => {
  const {droneId} = req.params;

  Drone.findByIdAndDelete(droneId)
  .then(() => {
    res.redirect('/drones')
  })
  .catch((err) => next(err))
});

module.exports = router;
