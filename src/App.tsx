import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/auth/Auth";
import TableUsers from "./components/tables/tableUsers/TableUsers";
import TableAdmins from "./components/tables/tableAdmins/TableAdmins";
import TableOperators from "./components/tables/tableOperators/TableOperators";
import Users from "./pages/users/users";
import Main from "./pages/main/main";
import LocationMap from "./components/locationMap/LocationMap";


function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage/>}/>
                  <Route path="/main" element={<Main/>}/>
                  <Route path="/map" element={<LocationMap latitude={51.175194} longitude={71.4124}/>}/>
                  <Route path="*" element={<Navigate to="/" replace/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
