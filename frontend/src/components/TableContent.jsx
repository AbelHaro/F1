import React from "react";

const TableContent = ({ drivers, stats, maxPoints }) => (
  <section className="flex flex-col items-center w-full">
    {drivers.map((driver) => (
      <div key={driver.driver_id} className="flex justify-center w-full mb-1.5">
        {stats.map((stat) => (
          <div
            key={`${driver.driver_id}-${stat}`}
            className="flex-1 text-center text-lg p-1.5"
          >
            {stat === "difference"
              ? driver["points"] - maxPoints
              : driver[stat].toString().replace(/-/g, " ")}
          </div>
        ))}
      </div>
    ))}
  </section>
);

export default TableContent;
