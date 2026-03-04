import React, { useState } from 'react';
import { Upload, Button, Form, Select, message, Card } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;
const { Option } = Select;

// Sample document types based on common workflow scenarios
const sampleDocumentTypes = [
  { label: 'Purchase Order', value: 'purchase_order' },
  { label: 'Invoice', value: 'invoice' },
  { label: 'Contract', value: 'contract' },
  { label: 'Employee Record', value: 'employee_record' },
  { label: 'Expense Report', value: 'expense_report' },
];

export const ManualUpload: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // WORKLOAD REQ: Support PDF, JPG, PNG, TIFF & Max 50MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // 1. Validate File Type (PDF, JPG, PNG, TIFF)
      const isAllowedType = allowedTypes.includes(file.type);
      if (!isAllowedType) {
        message.error(`${file.name} is not a valid format. Please use PDF, JPG, PNG, or TIFF.`);
        return Upload.LIST_IGNORE;
      }

      // 2. Validate File Size (50MB)
      const isUnderLimit = file.size ? file.size < maxFileSize : true;
      if (!isUnderLimit) {
        message.error(`${file.name} exceeds the 50MB size limit.`);
        return Upload.LIST_IGNORE;
      }

      setFileList([file]); // Requirement: Keep only the most recent file for validation
      return false; // Prevent automatic upload to handle via handleUpload
    },
    fileList,
    maxCount: 1,
  };

  const handleUpload = async () => {
    try {
      const values = await form.validateFields();
      
      if (fileList.length === 0) {
        message.error('Please select a file to upload.');
        return;
      }

      setUploading(true);
      
      // WORKLOAD: Logic for manual document upload and duplicate detection trigger
      console.log('Submitting to secure storage:', { 
        documentType: values.docType, 
        fileName: fileList[0].name,
        fileSize: fileList[0].size 
      });

      // Simulating the secure storage archival and 7-year policy trigger
      setTimeout(() => {
        setUploading(false);
        setFileList([]);
        form.resetFields();
        message.success('Document archived successfully with 7-year retention policy applied.');
      }, 1500);

    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Card title="Manual Document Upload" className="shadow-sm border-slate-200">
      <Form form={form} layout="vertical" onFinish={handleUpload}>
        
        {/* WORKLOAD REQ: Document Type selection for workflow triggering */}
        <Form.Item
          label="Document Type"
          name="docType"
          rules={[{ required: true, message: 'Please select a document type' }]}
        >
          <Select placeholder="Select a document type (e.g. Invoice, PO)">
            {sampleDocumentTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Upload File" required tooltip="PDF, JPG, PNG, or TIFF files up to 50MB">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-primary" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint text-xs">
              Supported formats: PDF, JPG, PNG, TIFF. Max size: 50MB.
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={uploading}
            icon={<UploadOutlined />}
            className="w-full h-12 text-base font-medium"
          >
            {uploading ? 'Archiving Document...' : 'Upload and Process'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};