import { Router } from "express";
import { db } from "../dbconnection.js";

export const driversRouter = Router();

// Search all drivers by nationality
driversRouter.get("/", (req, res) => {
  console.log(`${new Date()} DEBUG GET /drivers/`);

  db.all("SELECT id, name FROM driver;", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error in GET /drivers/ endpoint");
    }
    return res.json(rows);
  });
});

driversRouter.get("/nationalities/:nationality", (req, res) => {
  const { nationality } = req.params;

  console.log(
    `${new Date()} DEBUG GET /drivers/nationalities/ nationality: ${nationality}`
  );

  if (nationality === "all") {
    db.all(
      "SELECT id, name, nationality_country_id, date_of_birth, total_race_wins, total_podiums, total_race_entries  FROM driver;",
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error in GET /drivers/nationalities/ endpoint");
        }
        return res.json(rows);
      }
    );
  } else {
    db.all(
      "SELECT id, name, nationality_country_id, date_of_birth, total_race_wins, total_podiums, total_race_entries FROM driver WHERE nationality_country_id = ?",
      [nationality],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error in GET /drivers/nationalities/ endpoint");
        } else {
          return res.json(rows);
        }
      }
    );
  }
});

// Search driver by name
driversRouter.get("/names/:name", (req, res) => {
  const { name } = req.params;

  console.log(`${new Date()} DEBUG GET /drivers/names/ name: ${name}`);

  db.all(
    "SELECT id, name, nationality_country_id, date_of_birth, total_race_wins, total_podiums, total_race_entries FROM driver WHERE id = ?",
    [name],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        return res.json(rows);
      }
    }
  );
});
