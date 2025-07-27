import { Routes, Route } from "react-router";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import UserProfile from "../pages/UserProfile";
import Calendar from "../pages/Calendar";
import Blank from "../pages/Blank";
import FormElements from "../pages/Forms/FormElements";
import BasicTables from "../pages/Tables/BasicTables";
import Alerts from "../pages/UiElements/Alerts";
import Avaters from "../pages/UiElements/Avaters";
import LineChart from "../pages/Charts/LineChart";
import BarChart from "../pages/Charts/BarChart";
import NotFound from "../pages/OtherPage/NotFound";
import Error500 from "../pages/ErrorPages/Error500";
import Error401 from "../pages/ErrorPages/Error401";
import AddCategory from "../pages/category/AddCategory";
import AllCategory from "../pages/category/AllCategory";

const ProtectedRouter = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/blank" element={<Blank />} />
      <Route path="/form-elemets" element={<FormElements />} />
      <Route path="/basic-tables" element={<BasicTables />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/avaters" element={<Avaters />} />
      <Route path="/line-chart" element={<LineChart />} />
      <Route path="/bar-chart" element={<BarChart />} />
      <Route path="/error-500" element={<Error500 />} />
      <Route path="/error-401" element={<Error401 />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/all-category" element={<AllCategory />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default ProtectedRouter;
