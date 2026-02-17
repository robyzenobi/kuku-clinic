import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import UnifiedShell from './layouts/UnifiedShell';
import ClientLayout from './layouts/ClientLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Client Pages
import Home from './pages/client/Home';
import Chat from './pages/client/Chat';
import Jifunze from './pages/client/Jifunze';
import TafutaDaktari from './pages/client/TafutaDaktari';
import Mimi from './pages/client/Mimi';
import Rekodi from './pages/client/Rekodi';

// Dashboard Pages
import { Overview, Users, HealthRecords, SuccessStories, IntegrationPlaceholder } from './pages/dashboard/DashboardViews';
import { Flocks } from './pages/dashboard/data/Flocks';
import { Consultations } from './pages/dashboard/data/Consultations';

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<UnifiedShell />}>
                        <Route index element={<Navigate to="/app/home" replace />} />

                        {/* Client Routes */}
                        <Route path="app" element={<ClientLayout />}>
                            <Route index element={<Navigate to="/app/home" replace />} />
                            <Route path="home" element={<Home />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="daktari" element={<TafutaDaktari />} />
                            <Route path="find-doctor" element={<TafutaDaktari />} />
                            <Route path="learn" element={<Jifunze />} />
                            <Route path="profile" element={<Mimi />} />
                            <Route path="records" element={<Rekodi />} />

                            {/* New Dropdown Routes Placeholders */}
                            <Route path="market" element={<div className="p-6">Marketplace (Coming Soon)</div>} />
                            <Route path="add" element={<div className="p-6">Add New Item</div>} />
                            <Route path="consultation" element={<div className="p-6">Request Consultation</div>} />
                        </Route>

                        {/* Dashboard Routes */}
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<Navigate to="/dashboard/overview" replace />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="users" element={<Users />} />
                            {/* Data Views */}
                            <Route path="flocks" element={<Flocks />} />
                            <Route path="health-records" element={<HealthRecords />} />
                            <Route path="consultations" element={<Consultations />} />
                            <Route path="success-stories" element={<SuccessStories />} />

                            {/* Integrations & Settings */}
                            <Route path="domains" element={<IntegrationPlaceholder title="Domains" />} />
                            <Route path="security" element={<IntegrationPlaceholder title="Security" />} />
                            <Route path="code" element={<IntegrationPlaceholder title="Code" />} />
                            <Route path="api" element={<IntegrationPlaceholder title="API" />} />
                            <Route path="logs" element={<IntegrationPlaceholder title="Logs" />} />
                            <Route path="settings" element={<IntegrationPlaceholder title="Settings" />} />
                            <Route path="app-settings" element={<IntegrationPlaceholder title="App Settings" />} />
                            <Route path="template" element={<IntegrationPlaceholder title="App Template" />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
