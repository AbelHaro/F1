import { Router } from "express";
import { db } from "../dbconnection.js";

export const seasonsConstructorsStandingsRouter = Router();

seasonsConstructorsStandingsRouter.get("/", (req, res) => {
  console.log(`${new Date()} DEBUG: GET /seasons_constructors_standings`);
  db.all("SELECT * FROM season_constructor_standing;", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.json(rows);
  });
});
