import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../components/client/BottomNav';
import RecordActionModal from '../components/client/RecordActionModal';

const ClientLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Determine active tab based on path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes('daktari')) return 'daktari';
        if (path.includes('chat')) return 'chat';
        if (path.includes('profile')) return 'profile';
        if (path.includes('records')) return 'home'; // Keep 'Nyumbani' active for records too
        return 'home';
    };

    const handleTabChange = (tab) => {
        switch (tab) {
            case 'home':
                navigate('/app/home');
                break;
            case 'chat':
                navigate('/app/chat');
                break;
            case 'daktari':
                navigate('/app/daktari');
                break;
            case 'profile':
                navigate('/app/profile');
                break;
            default:
                navigate('/app/home');
        }
    };

    const handleRecordAction = (actionId) => {
        console.log(`Global Action Triggered: ${actionId}`);
        // Here we could navigate to specific forms or open other modals
        // For now, we'll just log it as the user sees the alert from the modal/page if implemented there, 
        // but since this is global, we might want a global handler.
        // For this step, we just ensure the modal opens and closes.
    };

    return (
        <div className="h-full w-full bg-gray-50 font-sans text-gray-900 pb-20 overflow-y-auto relative scrollbar-hide">
            <Outlet />
            <BottomNav
                activeTab={getActiveTab()}
                onTabChange={handleTabChange}
                onFabClick={() => setIsModalOpen(true)}
            />
            <RecordActionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAction={handleRecordAction}
            />
        </div>
    );
};

export default ClientLayout;
