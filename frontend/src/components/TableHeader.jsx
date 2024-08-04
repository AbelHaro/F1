import React from "react";

const TableHeader = ({ labels }) => (
  <header className="flex justify-center w-full mt-5 h-12">
    {labels.map((label) => (
      <div key={label} className="flex-1 text-center text-2xl font-bold">
        {label}
      </div>
    ))}
  </header>
);

export default TableHeader;
