import { Routes, Route, Navigate } from "react-router-dom";
import Charts from "../pages/Charts";
import Settings, { CreateChart, EditChart } from "../pages/Settings";

export default function Router() {
  return (
    <Routes>
      <Route path='charts' element={<Charts />} />
      <Route path="settings" element={<Settings />}>
        <Route path=":chartId" element={<EditChart />} />
        <Route path="add-chart" element={<CreateChart />} />
      </Route>
      <Route path="*" element={<Navigate to='charts' replace />} />
    </Routes>
  )
}
