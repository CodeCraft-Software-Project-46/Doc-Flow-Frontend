import React from 'react';
import { Tabs } from 'antd';
import { ManualUpload } from './ManualUpload';
import { CSVImport } from './CSVImport';
import { StorageManagement } from './StorageManagement';

export const DocumentPage = () => {
    const items = [
        {
            key: '1',
            label: 'Manual Upload',
            children: <ManualUpload />,
        },
        {
            key: '2',
            label: 'OneDrive / CSV Import',
            children: <CSVImport />,
        },
        {
            key: '3',
            label: 'Storage & Retention',
            children: <StorageManagement />,
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Management</h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};