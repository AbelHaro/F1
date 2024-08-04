import React from "react";
import PropTypes from "prop-types";

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export function SectionContainer({ children, className = "w-full" }) {
  return (
    <main className={`flex flex-col align-middle mx-auto mt-10 ${className}`}>
      {children}
    </main>
  );
}
