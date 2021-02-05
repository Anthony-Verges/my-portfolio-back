const express = require("express");
const connection = require("../config");

const router = express.Router();

//GET ALL SKILL
router.get("/", (req, res) => {
  const sql = "SELECT * FROM skill";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error to retrieving your skill data");
    } else {
      res.status(200).send(results);
    }
  });
});

//GET SKILL BY ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM skill WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

//POST A SKILL
router.post("/", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO skill (name) VALUES (?)";

  const newSKill = connection.query(sql, [name], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error when you post your skill");
    }

    return connection.query(
      "SELECT * FROM skill WHERE id = ?",
      results,
      insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const createSkill = records[0];
        return res.status(200).json(createSkill);
      }
    );
  });
});

//DELETE BY ID
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM skill where id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error to delete your skill");
    } else {
      res.sendStatus(204);
    }
  });
});

// PUT PROJET BY ID
router.put("/:id", (req, res) => {
  const idSkill = req.params.id;
  const updateSkill = req.body;
  const sql = "UPDATE skill SET ? WHERE id=?";
  connection.query(sql, [updateSkill, idSkill], (err, results) => {
    if (err) {
      res.status(500).send("Error updating a skill");
    }
    return connection.query(
      "SELECT * FROM skill WHERE id = ?",
      idSkill,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const updateSkill = records[0];
        return res.status(200).json(updateSkill);
      }
    );
  });
});

module.exports = router;
