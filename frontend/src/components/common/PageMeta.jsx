import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const PageMeta = ({ title, description }) => {
  const location = useLocation();

  return (
    <Helmet key={`${location.pathname}-${title}`}>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
