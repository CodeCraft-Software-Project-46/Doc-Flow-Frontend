import React, { useState } from 'react';
import { 
  Card, 
  Statistic, 
  Table, 
  Button, 
  InputNumber, 
  Progress, 
  Tag, 
  Space, 
  Popconfirm,
  message 
} from 'antd';
import { 
  DatabaseOutlined, 
  DeleteOutlined, 
  HistoryOutlined, 
  SaveOutlined 
} from '@ant-design/icons';

export const StorageManagement: React.FC = () => {
  // Requirement: Retain completed documents for 7 years (configurable)
  const [retentionPeriod, setRetentionPeriod] = useState<number>(7);
  
  // Mock data for Storage Space Management
  const totalStorage = 1000; // GB
  const usedStorage = 250; // GB
  const usagePercent = (usedStorage / totalStorage) * 100;

  // Mock data for File organization by document type and date
  const [documents, setDocuments] = useState([
    { key: '1', name: 'Invoice_001.pdf', type: 'Financial', date: '2024-01-15', size: '2.5 MB', status: 'Active' },
    { key: '2', name: 'Contract_A.pdf', type: 'Legal', date: '2023-11-20', size: '5.1 MB', status: 'Active' },
    { key: '3', name: 'Old_Report.csv', type: 'Reports', date: '2018-05-10', size: '1.2 MB', status: 'Archived' },
  ]);

  const handleRetentionChange = (value: number | null) => {
    if (value) {
        setRetentionPeriod(value);
        message.success(`Retention period updated to ${value} years`);
    }
  };

  const handleArchive = (key: string) => {
    const newDocs = documents.map(doc => 
      doc.key === key ? { ...doc, status: 'Archived' } : doc
    );
    setDocuments(newDocs);
    message.success('Document archived successfully');
  };

  const columns = [
    { title: 'Document Name', dataIndex: 'name', key: 'name' },
    { 
      title: 'Type', 
      dataIndex: 'type', 
      key: 'type',
      filters: [
        { text: 'Financial', value: 'Financial' },
        { text: 'Legal', value: 'Legal' },
        { text: 'Reports', value: 'Reports' },
      ],
      onFilter: (value: boolean | React.Key, record: any) => record.type === value,
    },
    { 
        title: 'Date', 
        dataIndex: 'date', 
        key: 'date',
        sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'orange'}>{status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.status === 'Active' && (
            <Popconfirm title="Archive this document?" onConfirm={() => handleArchive(record.key)}>
              <Button type="text" icon={<HistoryOutlined />} title="Archive">
                Archive
              </Button>
            </Popconfirm>
          )}
          <Button type="text" danger icon={<DeleteOutlined />} title="Delete" disabled={record.status === 'Active'}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Row: Storage Metrics & Retention Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Storage Usage */}
        <Card className="shadow-sm">
          <Statistic 
            title="Storage Usage" 
            value={usedStorage} 
            suffix={`/ ${totalStorage} GB`} 
            prefix={<DatabaseOutlined />}
          />
          <Progress percent={usagePercent} status="active" className="mt-2" />
        </Card>

        {/* Metric 2: Retention Policy */}
        <Card className="shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-gray-500 mb-2">Retention Policy (Years)</h4>
            <div className="flex items-center gap-4">
               <InputNumber 
                 min={1} 
                 max={20} 
                 value={retentionPeriod} 
                 onChange={handleRetentionChange}
                 size="large"
               />
               <Button type="primary" icon={<SaveOutlined />}>Update Policy</Button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Documents older than {retentionPeriod} years will be automatically archived.
          </p>
        </Card>

        {/* Metric 3: Quick Stats */}
        <Card className="shadow-sm">
            <div className="flex justify-between items-center h-full">
                <Statistic title="Total Files" value={1205} />
                <Statistic title="Archived" value={340} valueStyle={{ color: '#faad14' }} />
            </div>
        </Card>
      </div>

      {/* Main Content: File Organization Browser */}
      <Card title="File Organization & Archives" className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={documents} 
          pagination={{ pageSize: 5 }} 
        />
      </Card>
    </div>
  );
};