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
  message,
  Modal,
  Typography,
  Spin
} from 'antd';
import { 
  DatabaseOutlined, 
  DeleteOutlined, 
  HistoryOutlined, 
  SaveOutlined,
  RobotOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export const StorageManagement: React.FC = () => {
  const [retentionPeriod, setRetentionPeriod] = useState<number>(7);
  
  // AI Summary States
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<string>('');
  const [selectedDocName, setSelectedDocName] = useState<string>('');
  
  const totalStorage = 1000; // GB
  const usedStorage = 250; // GB
  const usagePercent = (usedStorage / totalStorage) * 100;

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

  // NEW: Handle AI Summary Generation
  const handleViewSummary = (docName: string) => {
    setSelectedDocName(docName);
    setIsSummaryModalOpen(true);
    setLoadingSummary(true);
    setCurrentSummary('');

    // TODO: Replace with actual Axios call to your Django/AI backend
    setTimeout(() => {
      setCurrentSummary(`This is an automatically generated AI summary for ${docName}. The document outlines key deliverables, associated costs, and timelines. It requires approval from the department head before the end of the current fiscal quarter.`);
      setLoadingSummary(false);
    }, 1500);
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
          {/* NEW: AI Summary Button */}
          <Button 
            type="primary" 
            ghost 
            icon={<RobotOutlined />} 
            onClick={() => handleViewSummary(record.name)}
            size="small"
          >
            AI Summary
          </Button>

          {record.status === 'Active' && (
            <Popconfirm title="Archive this document?" onConfirm={() => handleArchive(record.key)}>
              <Button type="text" icon={<HistoryOutlined />} title="Archive" size="small">
                Archive
              </Button>
            </Popconfirm>
          )}
          <Button type="text" danger icon={<DeleteOutlined />} title="Delete" disabled={record.status === 'Active'} size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <Statistic 
            title="Storage Usage" 
            value={usedStorage} 
            suffix={`/ ${totalStorage} GB`} 
            prefix={<DatabaseOutlined />}
          />
          <Progress percent={usagePercent} status="active" className="mt-2" />
        </Card>

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

        <Card className="shadow-sm">
            <div className="flex justify-between items-center h-full">
                <Statistic title="Total Files" value={1205} />
                <Statistic title="Archived" value={340} valueStyle={{ color: '#faad14' }} />
            </div>
        </Card>
      </div>

      <Card title="File Organization & Archives" className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={documents} 
          pagination={{ pageSize: 5 }} 
        />
      </Card>

      {/* NEW: AI Summary Modal */}
      <Modal
        title={
          <Space>
            <RobotOutlined style={{ color: '#1677ff' }} />
            <span>AI Document Summary</span>
          </Space>
        }
        open={isSummaryModalOpen}
        onCancel={() => setIsSummaryModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsSummaryModalOpen(false)}>
            Close
          </Button>,
          <Button key="open-doc" type="primary" icon={<FileTextOutlined />}>
            Open Full Document
          </Button>
        ]}
      >
        <div className="py-4">
          <Text type="secondary" className="block mb-4">
            Document: <strong>{selectedDocName}</strong>
          </Text>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[100px]">
            {loadingSummary ? (
              <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                <Spin className="mb-2" />
                <span>Generating concise summary...</span>
              </div>
            ) : (
              <Paragraph className="text-slate-700 m-0">
                {currentSummary}
              </Paragraph>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};