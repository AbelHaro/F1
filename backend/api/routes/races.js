import { Router } from "express";
import { db } from "../dbconnection.js";

export const racesRouter = Router();

racesRouter.get("/last_race", async (req, res) => {
  console.log(`${new Date()} DEBUG: GET /races/last_race`);

  db.all(
    "SELECT round, position_number, driver_id, time, gap FROM race_result WHERE race_id = (SELECT MAX(race_id) FROM race_result) LIMIT 10",

    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});
