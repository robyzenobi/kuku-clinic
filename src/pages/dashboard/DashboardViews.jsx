import React from 'react';

export const Overview = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Flocks</h3>
                <p className="text-3xl font-bold text-gray-900">124</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Active Users</h3>
                <p className="text-3xl font-bold text-gray-900">892</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Consultations</h3>
                <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
        </div>
    </div>
);

export const Users = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
            User management table will appear here.
        </div>
    </div>
);

export const Flocks = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Flock Data</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
            Real-time flock data from Firebase will be listed here.
        </div>
    </div>
);

export const HealthRecords = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Health Records</h2>
        <p className="text-gray-500">Medical history and vaccination records.</p>
    </div>
);

export const Consultations = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Consultations</h2>
        <p className="text-gray-500">Doctor consultation logs.</p>
    </div>
);

export const SuccessStories = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
        <p className="text-gray-500">Community shared stories.</p>
    </div>
);

export const IntegrationPlaceholder = ({ title }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">Integration settings for {title}.</p>
    </div>
);
