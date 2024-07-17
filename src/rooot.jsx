import React from 'react';
import Modal from 'react-modal';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { AppProvider } from "./AppContext";
import Dashboard from "./components/components/Dashboard";
import NotFound from "./components/components/NotFound";
import PropertyDatabase from "./components/components/PropertyDatabase";
import PropertySearch from "./components/components/PropertySearch";
import AccContactMassUpload from "./components/components/data entry/AccContactMassUpload";
import AccountSubmit from "./components/components/data entry/AccountSubmit";
import AccountSubmitError from "./components/components/data entry/AccountSubmitError";
import AccountTemplate from "./components/components/data entry/AccountTemplate";
import BuildingMassUpload from "./components/components/data entry/BuildingMassUpload";
import BuildingSubmit from "./components/components/data entry/BuildingSubmit";
import BuildingSubmitError from "./components/components/data entry/BuildingSubmitError";
import BuildingTemplate from "./components/components/data entry/BuildingTemplate";
import ContactSubmit from "./components/components/data entry/ContactSubmit";
import ContactSubmitError from "./components/components/data entry/ContactSubmitError";
import ContactTemplate from "./components/components/data entry/ContactTemplate";
import DataEntry from "./components/components/data entry/DataEntry";
import LeaseMassUpload from "./components/components/data entry/LeaseMassUpload";
import LeaseSubmit from "./components/components/data entry/LeaseSubmit";
import LeaseSubmitError from "./components/components/data entry/LeaseSubmitError";
import LeaseTemplate from "./components/components/data entry/LeaseTemplate";
import SpaceMassUpload from "./components/components/data entry/SpaceMassUpload";
import SpaceSubmit from "./components/components/data entry/SpaceSubmit";
import SpaceSubmitError from "./components/components/data entry/SpaceSubmitError";
import SpaceTemplate from "./components/components/data entry/SpaceTemplate";
import AccAndConSearch from "./components/components/sf-dummy/AccAndConSearch";
import ContactMassUpload from "./components/components/sf-dummy/ContactMassUpload";
import ContactNew from "./components/components/sf-dummy/ContactNew";
import ContactUpdate from "./components/components/sf-dummy/ContactUpdate";
import DataEntryLayout from "./components/components/shared/DataEntryLayout";
import Layout from "./components/components/shared/Layout";
import Map2D from './pages/Map2D';
import MapLayout from './components/components/shared/MapLayout';

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

                        <Route path="contact" element={<ContactMassUpload />} />
                        <Route path="contact/template" element={<ContactNew />} />
                        <Route path="contact/update" element={<ContactUpdate />} />
                        <Route path="contact/search" element={<AccAndConSearch />} />


                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="map" element={<MapLayout />}>
                        <Route path="2d-map" element={<Map2D />} />


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
