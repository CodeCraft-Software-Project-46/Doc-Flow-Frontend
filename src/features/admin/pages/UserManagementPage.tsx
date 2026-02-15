import React, { useState } from 'react';
import { Table, Button, Modal, Form, Select, Tag, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee' | 'Auditor';
  department: string;
}

const initialUsers: User[] = [
  { id: '1', email: 'john@example.com', role: 'Employee', department: 'HR' },
  { id: '2', email: 'sarah@example.com', role: 'Manager', department: 'Finance' },
];

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleSave = (values: any) => {
    setUsers(users.map(u => (u.id === currentUser?.id ? { ...u, ...values } : u)));
    setIsModalOpen(false);
    message.success('User permissions updated');
  };

  const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { 
      title: 'Role', 
      dataIndex: 'role', 
      key: 'role',
      render: (role: string) => {
        let color = role === 'Admin' ? 'red' : role === 'Manager' ? 'gold' : 'blue';
        return <Tag color={color}>{role}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: User) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit Role</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Permission Management</h1>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal title="Edit User Permissions" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={form.submit}>
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item name="role" label="Role">
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Employee">Employee</Select.Option>
              <Select.Option value="Auditor">Auditor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="department" label="Department">
             <Select>
              <Select.Option value="HR">HR</Select.Option>
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};