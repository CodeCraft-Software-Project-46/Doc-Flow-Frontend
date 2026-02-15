import React from 'react';
import { Table, Tag, Input, DatePicker, Space, Card } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// 1. Define the shape of your Audit Log data
interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: string;
  timestamp: string;
  details: string;
  status: 'Success' | 'Failed';
}

// 2. Dummy Data (You will replace this with a fetch() call to Django later)
const data: AuditLog[] = [
  { id: '1', action: 'LOGIN', performedBy: 'alice@company.com', role: 'Manager', timestamp: '2023-10-25 09:00:00', details: 'Login successful', status: 'Success' },
  { id: '2', action: 'DELETE_DOC', performedBy: 'bob@company.com', role: 'Employee', timestamp: '2023-10-25 10:15:00', details: 'Deleted Doc #405', status: 'Success' },
  { id: '3', action: 'LOGIN', performedBy: 'unknown', role: 'Unknown', timestamp: '2023-10-25 11:00:00', details: 'Invalid Password attempt', status: 'Failed' },
];

export const AuditPage: React.FC = () => {
  
  const columns: TableProps<AuditLog>['columns'] = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) => <Tag color={text === 'LOGIN' ? 'blue' : 'orange'}>{text}</Tag>,
    },
    { title: 'User', dataIndex: 'performedBy', key: 'performedBy' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Success' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Audit Logs</h1>
      <Card>
        <Space className="mb-4">
            <Input placeholder="Search Action..." prefix={<SearchOutlined />} />
            <DatePicker.RangePicker />
        </Space>
        
        <Table 
            columns={columns} 
            dataSource={data} 
            rowKey="id" 
            pagination={{ pageSize: 5 }}
            expandable={{
                expandedRowRender: (record) => <p className="m-0"><strong>Full Details:</strong> {record.details}</p>,
            }}
        />
      </Card>
    </div>
  );
};