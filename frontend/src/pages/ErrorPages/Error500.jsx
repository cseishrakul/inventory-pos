import React from "react";
import PageMeta from "../../components/common/PageMeta";

const Error500 = () => {
  return (
    <div>
      {" "}
      <PageMeta
        title="Error | Inventaix"
        description="Error page of Inventaix software"
      />
    
        <div className="border p-10 mt-10 shadow-md">
            <h3 className="text-center text-red-600 text-4xl">Something Went Wrong!</h3>
        </div>
    </div>
  );
};

export default Error500;
