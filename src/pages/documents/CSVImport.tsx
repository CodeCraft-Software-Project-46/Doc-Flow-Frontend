import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  InputNumber, 
  Table, 
  Tag, 
  Space, 
  Divider, 
  Form, 
  Input, 
  message 
} from 'antd';
import { 
  CloudSyncOutlined, 
  PlusOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';

export const CSVImport: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Requirement: Periodic folder scanning (default 5 minutes)
  const [scanInterval, setScanInterval] = useState<number | null>(5);

  // Requirement: CSV file validation (check required columns)
  const [requiredColumns, setRequiredColumns] = useState<string[]>(['Document Type', 'Date', 'Reference ID']);

  // Mock data for "Success/error notifications"
  const recentActivity = [
    { key: '1', filename: 'finance_dump_2026-02-16.csv', status: 'Success', time: '10:00 AM', records: 45 },
    { key: '2', filename: 'hr_records_invalid.csv', status: 'Error', time: '09:55 AM', records: 0 },
    { key: '3', filename: 'marketing_assets.csv', status: 'Success', time: '09:30 AM', records: 12 },
  ];

  const handleConnect = () => {
    setLoading(true);
    // TODO: Implement Microsoft Graph OAuth2 flow here
    setTimeout(() => {
      setLoading(false);
      setIsConnected(!isConnected);
      message.success(isConnected ? 'OneDrive disconnected' : 'OneDrive connected successfully');
    }, 1000);
  };

  const addColumn = (values: { newCol: string }) => {
    if (values.newCol && !requiredColumns.includes(values.newCol)) {
      setRequiredColumns([...requiredColumns, values.newCol]);
      message.success(`Added required column: ${values.newCol}`);
    }
  };

  const removeColumn = (col: string) => {
    setRequiredColumns(requiredColumns.filter(c => c !== col));
  };

  const columns = [
    { 
      title: 'File Name', 
      dataIndex: 'filename', 
      key: 'filename',
      render: (text: string) => <Space><FileTextOutlined /> {text}</Space>
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Success' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Records Processed', dataIndex: 'records', key: 'records' },
  ];

  return (
    <div className="space-y-6">
      {/* Section 1: Connection & Interval */}
      <Card title="OneDrive Integration Settings" className="shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isConnected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              <CloudSyncOutlined style={{ fontSize: '24px' }} />
            </div>
            <div>
              <h4 className="font-medium text-lg">Microsoft OneDrive</h4>
              <p className="text-gray-500 text-sm">
                {isConnected ? 'Sync active • Monitoring /Incoming folder' : 'Not connected'}
              </p>
            </div>
          </div>
          <Button 
            type={isConnected ? 'default' : 'primary'} 
            onClick={handleConnect} 
            loading={loading}
          >
            {isConnected ? 'Disconnect' : 'Connect Account'}
          </Button>
        </div>

        <Divider />

        <div className="flex items-center gap-4">
          <span className="font-medium">Scan Interval (minutes):</span>
          <InputNumber 
            min={1} 
            max={60} 
            value={scanInterval} 
            onChange={setScanInterval} 
            disabled={!isConnected}
          />
          <span className="text-gray-400 text-sm">(Default: 5 mins)</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 2: CSV Validation Configuration */}
        <Card title="CSV Configuration" className="shadow-sm h-full">
          <p className="text-gray-500 mb-4">
            Define columns that MUST be present in uploaded CSVs for validation.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {requiredColumns.map(col => (
              <Tag 
                key={col} 
                closable 
                onClose={() => removeColumn(col)}
                color="blue"
              >
                {col}
              </Tag>
            ))}
          </div>
          <Form layout="inline" onFinish={addColumn}>
            <Form.Item name="newCol" rules={[{ required: true, message: 'Enter name' }]}>
              <Input placeholder="Column Name (e.g., Invoice ID)" />
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit" icon={<PlusOutlined />}>
                Add Rule
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Section 3: Recent Activity Monitoring */}
        <Card title="Recent Sync Activity" className="shadow-sm h-full">
          <Table 
            dataSource={recentActivity} 
            columns={columns} 
            pagination={false} 
            size="small" 
          />
        </Card>
      </div>
    </div>
  );
};