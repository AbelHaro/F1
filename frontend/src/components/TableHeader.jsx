import React from "react";
import PropTypes from "prop-types";

TableHeader.propTypes = {
  stats_labels: PropTypes.object.isRequired,
  stats_to_filter: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export function TableHeader({ stats_labels, stats_to_filter, className }) {
  return (
    <header className="flex justify-center w-full h-12">
      {stats_to_filter.map((label) => (
        <div
          key={label}
          className={`flex-1 text-center text-2xl font-bold ${className}`}
        >
          {stats_labels[label]}
        </div>
      ))}
    </header>
  );
}

export default TableHeader;
