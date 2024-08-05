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

seasonsDriversStandingsRouter.get("/current_year", (req, res) => {
  console.log(
    `${new Date()} DEBUG: GET /seasons_drivers_standings/current_year`
  );

  db.get(
    "SELECT MAX(year) AS year FROM season_driver_standing;",
    (err, row) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("Error on GET /seasons_drivers_standings/current_year");
        return;
      }

      if (!row || !row.year) {
        res.status(404).send("No data found for the current year");
        return;
      }

      const currentYear = row.year;
      console.log(`Current year: ${currentYear}`);

      db.all(
        "SELECT * FROM season_driver_standing WHERE year = ? LIMIT 10;",
        [currentYear],
        async (err, rows) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Error on GET /seasons_drivers_standings/current_year");
            return;
          }

          for (let i = 0; i < rows.length; i++) {
            const constructor_id = await getDriverConstructorByYear(
              rows[i].driver_id,
              currentYear
            );
            console.log("Constructor id", constructor_id);
            rows[i].constructor_id = constructor_id;
          }
          res.json(rows);
        }
      );
    }
  );
});

function getDriverConstructorByYear(driver_id, year) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT constructor_id FROM race_result WHERE year = ? AND driver_id = ?;",
      [year, driver_id],
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(
          "Dentro de getDriverConstructorByYear",
          row.constructor_id,
          "para driver_id",
          driver_id,
          "y year",
          year
        );
        resolve(row.constructor_id);
      }
    );
  });
}

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
