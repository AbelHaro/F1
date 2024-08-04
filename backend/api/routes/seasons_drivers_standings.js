import { Router } from "express";
import { db } from "../dbconnection.js";

export const seasonsDriversStandingsRouter = Router();

// Search all drivers standings
seasonsDriversStandingsRouter.get("/", (req, res) => {
  console.log(`${new Date()} DEBUG: GET /seasons_drivers_standings`);
  db.all(
    "SELECT driver_id, year, points, position_display_order FROM season_driver_standing WHERE position_number IN (1,2,3) ORDER BY year;",
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error on GET /seasons_drivers_standings");
      }
      res.json(rows);
    }
  );
});

// Search drivers standings by year
seasonsDriversStandingsRouter.get("/:year", (req, res) => {
  console.log(
    `${new Date()} DEBUG: GET /seasons_drivers_standings/${req.params.year}`
  );
  const { year } = req.params;
  db.all(
    "SELECT driver_id, year, position_display_order, points FROM season_driver_standing WHERE year = ?;",
    [year],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(rows);
    }
  );
});
