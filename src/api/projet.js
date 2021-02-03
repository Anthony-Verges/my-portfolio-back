const express = require("express");
const connection = require("../config");

const router = express.Router();

// GET ALL PROJECTS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM projet";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your projects data");
    } else {
      res.status(200).send(results);
    }
  });
});

//GET PROJECT BY ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM projet WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//POST PROJECT
router.post("/", (req, res) => {
  const { name, description, date } = req.body;
  const sql = "INSERT INTO projet (name, description, date) VALUES (?,?,?)";

  const newProjet = connection.query(
    sql,
    [name, description, date],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error when you post your projet");
      }

      return connection.query(
        "SELECT * FROMprojet WHERE id = ?",
        results,
        insertId,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const createProjet = records[0];
          return res.status(200).json(createProjet);
        }
      );
    }
  );
});

//DELETE
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM projet where id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error to delete your project");
    } else {
      res.sendStatus(204);
    }
  });
});

// PUT PROJET
router.put("/:id", (req, res) => {
  const idProjet = req.params.id;
  const updateProjet = req.body;
  const sql = "UPDATE projet SET ? WHERE id=?";
  connection.query(sql, [updateProjet, idProjet], (err, results) => {
    if (err) {
      res.status(500).send("Error updating a project");
    }
    return connection.query(
      "SELECT * FROM projet WHERE id = ?",
      idProjet,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const updateProjet = records[0];
        return res.status(200).json(updateProjet);
      }
    );
  });
});

module.exports = router;
