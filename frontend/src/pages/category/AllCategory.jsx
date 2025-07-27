import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const AllCategory = () => {
  return (
    <>
      <PageMeta
        title="All Category | Dashboard"
        description="This is all category of inventaix company"
      />
      <PageBreadcrumb pageTitle={"All Category"} />
    </>
  );
};

export default AllCategory;
