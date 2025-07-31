import React, { useEffect, useState } from 'react';

const mockAuditData = [
    { id: 1, user: 'jb', action: 'Logged in', timestamp: '2024-06-01 10:00:00' },
    { id: 2, user: 'asdsad', action: 'Made booking', timestamp: '2024-06-01 10:05:00' },
    { id: 3, user: 'jb', action: 'Payment completed', timestamp: '2024-06-01 10:10:00' },
    { id: 4, user: 'asdsad', action: 'Logged out', timestamp: '2024-06-01 10:15:00' },
    { id: 5, user: 'kirtan1232', action: 'Logged in', timestamp: '2025-07-26 15:15:00' },
    { id: 6, user: 'kirtan1232', action: 'Viewed audit logs', timestamp: '2025-07-26 15:19:14' },
];

const fetchAuditLogs = () => {
    // Replace this with an API call in the future
    return Promise.resolve(mockAuditData);
};

const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
        case 'logged in':
            return <span className="text-xl text-green-500">🚪</span>;
        case 'logged out':
            return <span className="text-xl text-red-500">🚪</span>;
        case 'made booking':
            return <span className="text-xl text-orange-500">🎟️</span>;
        case 'payment completed':
            return <span className="text-xl text-green-500">💸</span>;
        case 'viewed audit logs':
            return <span className="text-xl text-purple-500">📋</span>;
        default:
            return <span className="text-xl text-gray-500">🎉</span>;
    }
};

const getActionColor = (action) => {
    switch (action.toLowerCase()) {
        case 'logged in':
            return 'bg-green-100 text-green-800';
        case 'logged out':
            return 'bg-red-100 text-red-800';
        case 'made booking':
            return 'bg-orange-100 text-orange-800';
        case 'payment completed':
            return 'bg-green-100 text-green-800';
        case 'viewed audit logs':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
    };
};

const AuditLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getLogs = async () => {
            const data = await fetchAuditLogs();
            if (isMounted) setLogs(data);
        };
        getLogs();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center w-full">
            {/* Centered Container */}
            <div className="w-full max-w-6xl p-6 sm:p-8 lg:p-12 ml-14 md:ml-64">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-down">
                        Audit Log
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
                        <p className="text-gray-600 text-lg">Track all user activities and system events</p>
                        <div className="bg-orange-100/50 px-4 py-2 rounded-full mt-2 sm:mt-0">
                            <span className="text-orange-600 font-medium">{logs.length} Total Events</span>
                        </div>
                    </div>
                </div>

                {/* Audit Log Table */}
                <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden animate-slide-in-up">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 sm:px-8 py-5">
                        <div className="grid grid-cols-[2fr_3fr_2fr_1fr] gap-6 text-white font-semibold text-sm">
                            <p>User</p>
                            <p>Action</p>
                            <p>Date & Time</p>
                            <p>Status</p>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="max-h-[65vh] overflow-y-auto">
                        {logs.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl opacity-50">📋</span>
                                </div>
                                <p className="text-gray-500 text-lg">No audit logs found</p>
                            </div>
                        ) : (
                            logs.map((log, index) => {
                                const { date, time } = formatTimestamp(log.timestamp);
                                return (
                                    <div
                                        className="grid grid-cols-[2fr_3fr_2fr_1fr] gap-6 items-center text-gray-600 py-4 px-6 sm:px-8 border-b border-orange-100 hover:bg-orange-50/50 transition-all duration-300 group"
                                        key={log.id}
                                        style={{
                                            animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
                                        }}
                                    >
                                        {/* User */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100/50 rounded-full flex items-center justify-center">
                                                <span className="text-orange-600 font-medium text-sm">
                                                    {log.user.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                                                    {log.user}
                                                </p>
                                                <p className="text-xs text-gray-500">User ID: {log.user}</p>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center gap-3">
                                            {getActionIcon(log.action)}
                                            <div>
                                                <p className="font-medium text-gray-800">{log.action}</p>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div>
                                            <p className="font-medium text-gray-800">{date}</p>
                                            <p className="text-sm text-gray-500">{time}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="flex justify-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                                                Success
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer with summary */}
                    {logs.length > 0 && (
                        <div className="bg-orange-50/30 px-6 sm:px-8 py-4 border-t border-orange-100">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-lg font-bold text-green-600">
                                        {logs.filter(log => log.action.toLowerCase().includes('login')).length}
                                    </p>
                                    <p className="text-green-700 text-xs">Login Events</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-lg font-bold text-orange-600">
                                        {logs.filter(log => log.action.toLowerCase().includes('booking')).length}
                                    </p>
                                    <p className="text-orange-700 text-xs">Bookings</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-lg font-bold text-purple-600">
                                        {logs.filter(log => log.action.toLowerCase().includes('payment')).length}
                                    </p>
                                    <p className="text-purple-700 text-xs">Payments</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-lg font-bold text-pink-600">
                                        {logs.length}
                                    </p>
                                    <p className="text-pink-700 text-xs">Total Events</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add custom CSS for animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slide-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AuditLog;