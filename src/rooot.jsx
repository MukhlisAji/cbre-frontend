import React from 'react';
import Modal from 'react-modal';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { AppProvider } from "./AppContext";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import PropertyDatabase from "./components/PropertyDatabase";
import PropertySearch from "./components/PropertySearch";
import AccContactMassUpload from "./components/data-entry/AccContactMassUpload";
import AccountSubmit from "./components/data-entry/AccountSubmit";
import AccountSubmitError from "./components/data-entry/AccountSubmitError";
import AccountTemplate from "./components/data-entry/AccountTemplate";
import BuildingMassUpload from "./components/data-entry/BuildingMassUpload";
import BuildingSubmit from "./components/data-entry/BuildingSubmit";
import BuildingSubmitError from "./components/data-entry/BuildingSubmitError";
import BuildingTemplate from "./components/data-entry/BuildingTemplate";
import ContactSubmit from "./components/data-entry/ContactSubmit";
import ContactSubmitError from "./components/data-entry/ContactSubmitError";
import ContactTemplate from "./components/data-entry/ContactTemplate";
import DataEntry from "./components/data-entry/DataEntry";
import LeaseMassUpload from "./components/data-entry/LeaseMassUpload";
import LeaseSubmit from "./components/data-entry/LeaseSubmit";
import LeaseSubmitError from "./components/data-entry/LeaseSubmitError";
import LeaseTemplate from "./components/data-entry/LeaseTemplate";
import SpaceMassUpload from "./components/data-entry/SpaceMassUpload";
import SpaceSubmit from "./components/data-entry/SpaceSubmit";
import SpaceSubmitError from "./components/data-entry/SpaceSubmitError";
import SpaceTemplate from "./components/data-entry/SpaceTemplate";
import DataEntryLayout from "./components/shared/DataEntryLayout";
import Layout from "./components/shared/Layout";
import MapViewer from './components/map-viewer/pages/MapViewer';
import PropertyLayout from './components/property/PropertyLayout';
import Account from './components/property/Account';
import Contact from './components/property/Contact';

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
                        <Route path="property" element={<PropertyLayout />}>
                            <Route path="accounts" element={<Account />} />
                            <Route path="contacts" element={<Contact />} />
                        </Route>
                        <Route path="map" element={<MapViewer />} />

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
