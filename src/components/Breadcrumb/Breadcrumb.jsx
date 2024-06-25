import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import "./Breadcrumb.css";
import { Link } from "react-router-dom";
export default function MyBreadcrumb({
  title1,
  link1,
  title2,
  link2,
  title3,
  link3,
  title4,
  link4,
  isChoice1,
  isChoice2,
  isChoice3,
}) {
  return (
    <div>
      <Breadcrumb className="my-breadcrump">
        <BreadcrumbItem isCurrentPage={isChoice1}>
          <Link to={link1}>
            {" "}
            <BreadcrumbLink className="my-breadcrump-link">
              {title1}
            </BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage={isChoice2}>
          <Link to={link2}>
            {" "}
            <BreadcrumbLink className="my-breadcrump-link">
              {title2}
            </BreadcrumbLink>
          </Link>{" "}
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage={isChoice3}>
          <Link to={link3}>
            {" "}
            <BreadcrumbLink className="my-breadcrump-link">
              {title3}
            </BreadcrumbLink>
          </Link>{" "}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
