/* Imports */

// react & nextjs
import { FC } from "react";
// components

// libs
import { Link } from "react-router-dom";

// utils

// types & interfaces

// css
import "../styles/Navigation.css";

export interface Props {
  navigationData: { path: string; title: string }[];
}

const Navigation: FC<Props> = ({ navigationData }) => {
  return (
    <>
      {navigationData.map(({ path, title }) => {
        return (
          <Link key={title} className="NavegationLink" to={path}>
            {title}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
