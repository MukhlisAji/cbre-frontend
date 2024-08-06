import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import PropertySearch from "./components/PropertySearch";
import NotFound from "./components/NotFound";
import DataEntryLayout from "./components/shared/DataEntryLayout";
import BuildingMassUpload from "./components/data entry/BuildingMassUpload";
import BuildingTemplate from "./components/data entry/BuildingTemplate";
import PropertyDatabase from "./components/PropertyDatabase";
import BuildingSubmit from "./components/data entry/BuildingSubmit";
import BuildingSubmitError from "./components/data entry/BuildingSubmitError";
import SpaceMassUpload from "./components/data entry/SpaceMassUpload";
import SpaceTemplate from "./components/data entry/SpaceTemplate";
import LeaseMassUpload from "./components/data entry/LeaseMassUpload";
import AccContactMassUpload from "./components/data entry/AccContactMassUpload";
import LeaseTemplate from "./components/data entry/LeaseTemplate";
import AccountTemplate from "./components/data entry/AccountTemplate";
import SpaceSubmitError from "./components/data entry/SpaceSubmitError";
import SpaceSubmit from "./components/data entry/SpaceSubmit";
import LeaseSubmitError from "./components/data entry/LeaseSubmitError";
import LeaseSubmit from "./components/data entry/LeaseSubmit";
import AccountSubmitError from "./components/data entry/AccountSubmitError";
import AccountSubmit from "./components/data entry/AccountSubmit";
import Modal from 'react-modal';
import { AppProvider } from "./AppContext";
import DataEntry from "./components/data entry/DataEntry";
import ContactTemplate from "./components/data entry/ContactTemplate";
import ContactSubmitError from "./components/data entry/ContactSubmitError";
import ContactSubmit from "./components/data entry/ContactSubmit";


Modal.setAppElement('#root');


function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Layout />}>
            <Route index path="home" element={<Dashboard />} />
            <Route path="property-search" element={<PropertySearch />} />
            <Route path="data-entry-portal/property-database" element={<PropertyDatabase />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="data-entry-portal/mass-upload/*" element={<DataEntryLayout />}>
            <Route path="" element={<DataEntry />} />
            <Route path="building" element={<BuildingMassUpload />} />
            <Route path="building/template" element={<BuildingTemplate />} />
            <Route path="building/submit/error" element={<BuildingSubmitError />} />
            <Route path="building/submit" element={<BuildingSubmit />} />

            <Route path="space" element={<SpaceMassUpload />} />
            <Route path="space/template" element={<SpaceTemplate />} />
            <Route path="space/submit/error" element={<SpaceSubmitError />} />
            <Route path="space/submit" element={<SpaceSubmit />} />

            <Route path="lease" element={<LeaseMassUpload />} />
            <Route path="lease/template" element={<LeaseTemplate />} />
            <Route path="lease/submit/error" element={<LeaseSubmitError />} />
            <Route path="lease/submit" element={<LeaseSubmit />} />

            <Route path="account-contact" element={<AccContactMassUpload />} />
            <Route path="account-contact/acc/template" element={<AccountTemplate />} />
            <Route path="account-contact/acc/submit/error" element={<AccountSubmitError />} />
            <Route path="account-contact/acc/submit" element={<AccountSubmit />} />
            <Route path="account-contact/con/template" element={<ContactTemplate />} />
            <Route path="account-contact/con/submit/error" element={<ContactSubmitError />} />
            <Route path="account-contact/con/submit" element={<ContactSubmit />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>

  );
}

export default App;
