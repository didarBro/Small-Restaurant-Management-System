import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Analytics from "../pages/analytics/Analytics";
import Tables from "../pages/table/Table";
import Menu from "../pages/menu/Food_item";
import Employee from "../pages/employee/Employee";
import Cost from "../pages/cost/Cost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Analytics />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/cost" element={<Cost />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
