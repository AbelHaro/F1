import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export function NavItem({ link, linkText }) {
  return (
    <Link
      to={link}
      className="no-underline hover:text-yellow-400 transition-transform"
    >
      {linkText}
    </Link>
  );
}
