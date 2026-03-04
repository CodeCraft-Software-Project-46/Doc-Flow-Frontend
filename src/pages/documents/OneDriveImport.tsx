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
  Select,
  message,
  List,
  Popconfirm
} from 'antd';
import { 
  CloudSyncOutlined, 
  PlusOutlined, 
  FileTextOutlined,
  FolderOutlined,
  DeleteOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

const { Option } = Select;

const AVAILABLE_WORKFLOWS = [
  { id: 'wf_po', name: 'Purchase Order Approval' },
  { id: 'wf_pr', name: 'Purchase Request Review' },
  { id: 'wf_grn', name: 'GRN Verification' },
  { id: 'wf_ss', name: 'Sourcing Strategy Workflow' },
];

export const OneDriveImport: React.FC = () => {
  const [folderForm] = Form.useForm();

  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scanInterval, setScanInterval] = useState<number | null>(5);

  const [folders, setFolders] = useState([
    { id: '1', name: 'PR',  workflowId: 'wf_pr' },
    { id: '2', name: 'PO',  workflowId: 'wf_po' },
    { id: '3', name: 'GRN', workflowId: 'wf_grn' },
  ]);

  const recentActivity = [
    { key: '1', filename: 'finance_report_2026.pdf', folder: 'GRN', status: 'Success', time: '10:00 AM' },
    { key: '2', filename: 'employee_data.xlsx',      folder: 'PR',  status: 'Error',   time: '09:55 AM' },
    { key: '3', filename: 'marketing_assets.zip',    folder: 'PO',  status: 'Success', time: '09:30 AM' },
  ];

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsConnected(!isConnected);
      message.success(isConnected ? 'OneDrive disconnected' : 'OneDrive connected successfully');
    }, 1000);
  };

  const handleCreateFolder = (values: { folderName: string }) => {
    const folderExists = folders.some(f => f.name.toLowerCase() === values.folderName.toLowerCase());
    if (folderExists) { message.error(`Folder '${values.folderName}' already exists.`); return; }
    setFolders([...folders, { id: Date.now().toString(), name: values.folderName.toUpperCase(), workflowId: '' }]);
    folderForm.resetFields();
    message.success(`Created folder: ${values.folderName.toUpperCase()} in OneDrive`);
  };

  const handleDeleteFolder = (id: string, name: string) => {
    setFolders(folders.filter(f => f.id !== id));
    message.success(`Deleted folder: ${name}`);
  };

  const handleAssignWorkflow = (folderId: string, workflowId: string) => {
    setFolders(folders.map(f => f.id === folderId ? { ...f, workflowId } : f));
    message.success('Workflow assigned');
  };

  const activityColumns = [
    { 
      title: 'File Name', dataIndex: 'filename', key: 'filename',
      render: (text: string) => <Space><FileTextOutlined /> {text}</Space>
    },
    {
      title: 'Workflow (Source Folder)', dataIndex: 'folder', key: 'folder',
      render: (text: string) => <Tag color="blue"><FolderOutlined /> {text}</Tag>
    },
    { 
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => <Tag color={status === 'Success' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
    },
    { title: 'Time', dataIndex: 'time', key: 'time' },
  ];

  return (
    <div className="space-y-6">
      {/* Connection & Interval */}
      <Card title="OneDrive Integration Settings" className="shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isConnected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              <CloudSyncOutlined style={{ fontSize: '24px' }} />
            </div>
            <div>
              <h4 className="font-medium text-lg">Microsoft OneDrive</h4>
              <p className="text-gray-500 text-sm">
                {isConnected ? 'Sync active • Monitoring configured folders' : 'Not connected'}
              </p>
            </div>
          </div>
          <Button type={isConnected ? 'default' : 'primary'} onClick={handleConnect} loading={loading}>
            {isConnected ? 'Disconnect' : 'Connect Account'}
          </Button>
        </div>

        <Divider />

        <div className="flex items-center gap-4">
          <span className="font-medium">Scan Interval (minutes):</span>
          <InputNumber min={1} max={60} value={scanInterval} onChange={setScanInterval} disabled={!isConnected} />
          <span className="text-gray-400 text-sm">(Default: 5 mins)</span>
        </div>
      </Card>

      {/* Folder Management */}
      <Card title="Workflow Folders" className="shadow-sm">
        <p className="text-gray-500 mb-4 text-sm">
          Create folders in OneDrive. Any files dropped into these folders will be automatically retrieved and trigger the corresponding workflow.
        </p>

        <Form form={folderForm} layout="inline" onFinish={handleCreateFolder} className="mb-6">
          <Form.Item name="folderName" rules={[{ required: true, message: 'Enter folder name' }]}>
            <Input placeholder="e.g., INVOICE" prefix={<FolderOutlined className="text-gray-400" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} disabled={!isConnected}>
              Create Folder
            </Button>
          </Form.Item>
        </Form>

        <List
          size="small"
          bordered
          dataSource={folders}
          renderItem={(folder) => (
            <List.Item>
              {/* Full-width flex row — NOT using actions[] prop */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 12 }}>
                {/* Folder icon + name */}
                <FolderOutlined style={{ color: '#3b82f6', fontSize: 16 }} />
                <span style={{ fontWeight: 600, minWidth: 60 }}>{folder.name}</span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>
                  /OneDrive/Automated_Triggers/{folder.name}
                </span>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Workflow dropdown */}
                <Select
                  placeholder={<span><ApartmentOutlined /> Assign Workflow</span>}
                  style={{ width: 230 }}
                  value={folder.workflowId || undefined}
                  onChange={(val) => handleAssignWorkflow(folder.id, val)}
                  disabled={!isConnected}
                >
                  {AVAILABLE_WORKFLOWS.map(wf => (
                    <Option key={wf.id} value={wf.id}>{wf.name}</Option>
                  ))}
                </Select>

                {/* Status tag */}
                <Tag color={folder.workflowId ? 'green' : 'default'} style={{ margin: 0 }}>
                  {folder.workflowId ? 'Active' : 'Unassigned'}
                </Tag>

                {/* Delete */}
                <Popconfirm
                  title="Delete this folder?"
                  description="This will also remove it from OneDrive."
                  onConfirm={() => handleDeleteFolder(folder.id, folder.name)}
                  disabled={!isConnected}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} disabled={!isConnected} />
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Activity Monitoring */}
      <Card title="Recent Sync Activity" className="shadow-sm">
        <Table dataSource={recentActivity} columns={activityColumns} pagination={false} size="small" />
      </Card>
    </div>
  );
};