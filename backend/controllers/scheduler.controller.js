const db = require("../models");
const SchedulerEvents = db.scheduler;

exports.getData = (req, res) => {
  SchedulerEvents.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Events."
      });
    });
};

exports.crudActions = (req, res) => {
  if (req.body.added && req.body.added.length > 0) {
    req.body.added.forEach(insertData => {
      SchedulerEvents.create(insertData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
          message: err.message || "Some error occurred while inserting the events."
        }));
    });
  }

  if (req.body.changed && req.body.changed.length > 0) {
    req.body.changed.forEach(updateData => {
      SchedulerEvents.update(updateData, { where: { id: updateData.id } })
        .then(num => {
          if (num == 1) {
            res.send(updateData);
          } else {
            res.send({
              message: `Cannot update Event with id=${updateData.id}. Maybe Event was not found, or req.body is empty!`
            });
          }
        })
        .catch(err => res.status(500).send({
          message: "Error updating Event with id=" + updateData.id
        }));
    });
  }

  if (req.body.deleted && req.body.deleted.length > 0) {
    req.body.deleted.forEach(deleteData => {
      SchedulerEvents.destroy({ where: { id: deleteData.id } })
        .then(num => {
          if (num == 1) {
            res.send(deleteData);
          } else {
            res.send({
              message: `Cannot delete Event with id=${deleteData.id}. Maybe Event was not found!`
            });
          }
        })
        .catch(err => res.status(500).send({
          message: "Could not delete Event with id=" + deleteData.id
        }));
    });
  }
};
