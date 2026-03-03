import React, { useState } from 'react';
import { Card, Table, Form, Input, Select, Button, Tag, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, PartitionOutlined } from '@ant-design/icons';

const { Option } = Select;

export const WorkflowMapping: React.FC = () => {
  const [form] = Form.useForm();
  
  // Mock data for existing workflows in the system
  const availableWorkflows = [
    { id: 'wf_001', name: 'Invoice Processing Workflow' },
    { id: 'wf_002', name: 'Employee Onboarding Workflow' },
    { id: 'wf_003', name: 'Monthly Report Archival' },
  ];

  // Mock data for existing mappings
  const [mappings, setMappings] = useState([
    { key: '1', keyword: 'finance', targetWorkflow: 'Invoice Processing Workflow' },
    { key: '2', keyword: 'hr', targetWorkflow: 'Employee Onboarding Workflow' },
  ]);

  const handleAddMapping = (values: { keyword: string; targetWorkflow: string }) => {
    // Prevent duplicates
    if (mappings.some(m => m.keyword.toLowerCase() === values.keyword.toLowerCase())) {
      message.error(`A mapping for '${values.keyword}' already exists.`);
      return;
    }

    const newMapping = {
      key: Date.now().toString(),
      keyword: values.keyword.toLowerCase(),
      targetWorkflow: values.targetWorkflow,
    };

    setMappings([...mappings, newMapping]);
    form.resetFields();
    message.success('Workflow mapping added successfully');
  };

  const handleDelete = (key: string) => {
    setMappings(mappings.filter(item => item.key !== key));
    message.success('Mapping deleted');
  };

  const columns = [
    {
      title: 'Filename Keyword {document_type}',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Target Workflow',
      dataIndex: 'targetWorkflow',
      key: 'targetWorkflow',
      render: (text: string) => (
        <Space>
          <PartitionOutlined className="text-gray-400" />
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm title="Delete this mapping rule?" onConfirm={() => handleDelete(record.key)}>
          <Button type="text" danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card title="Workflow Mapping Configuration" className="shadow-sm">
        <p className="text-gray-500 mb-6">
          Define which workflow should be triggered when a CSV file is imported via OneDrive. 
          The system will parse filenames like <code>{'{document_type}'}_dump_{'{date}'}.csv</code> and match the <code>{'{document_type}'}</code> keyword below.
        </p>

        {/* Add New Mapping Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
          <h4 className="font-medium mb-4">Add New Mapping Rule</h4>
          <Form form={form} layout="inline" onFinish={handleAddMapping}>
            <Form.Item 
              name="keyword" 
              rules={[{ required: true, message: 'Please enter a keyword' }]}
            >
              <Input placeholder="Keyword (e.g., finance)" />
            </Form.Item>
            
            <Form.Item 
              name="targetWorkflow" 
              rules={[{ required: true, message: 'Please select a workflow' }]}
              className="min-w-[250px]"
            >
              <Select placeholder="Select Target Workflow">
                {availableWorkflows.map(wf => (
                  <Option key={wf.id} value={wf.name}>{wf.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Rule
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Mappings Table */}
        <Table 
          columns={columns} 
          dataSource={mappings} 
          pagination={false} 
          size="middle" 
        />
      </Card>
    </div>
  );
};