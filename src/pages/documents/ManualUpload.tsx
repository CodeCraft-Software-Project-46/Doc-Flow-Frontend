import React, { useState } from 'react';
import { Upload, Button, Form, Input, message, Card } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

export const ManualUpload: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Requirement 3.2: Support PDF, JPG, PNG, TIFF & Max 50MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // 1. Validate File Type
      const isAllowedType = allowedTypes.includes(file.type);
      if (!isAllowedType) {
        message.error(`${file.name} is not a valid file type (PDF, JPG, PNG, TIFF only).`);
        return Upload.LIST_IGNORE;
      }

      // 2. Validate File Size
      const isUnderLimit = file.size ? file.size < maxFileSize : true;
      if (!isUnderLimit) {
        message.error(`${file.name} exceeds the 50MB limit.`);
        return Upload.LIST_IGNORE;
      }

      setFileList([file]); // Keep only the most recent file
      return false; // Prevent auto-upload (we handle it manually)
    },
    fileList,
    maxCount: 1, // Only allow one file per document entry
  };

  const handleUpload = async () => {
    try {
        const values = await form.validateFields();
        
        if (fileList.length === 0) {
            message.error('Please select a file to upload.');
            return;
        }

        setUploading(true);
        
        // TODO: Here you will eventually use FormData to send 'values.docNumber' and 'fileList[0]' to your Django backend
        console.log('Submitting:', { docNumber: values.docNumber, file: fileList[0] });

        // Simulating API delay
        setTimeout(() => {
            setUploading(false);
            setFileList([]);
            form.resetFields();
            message.success('Document submitted successfully!');
        }, 1500);

    } catch (error) {
        console.error('Validation Failed:', error);
    }
  };

  return (
    <Card title="Manual Document Upload" className="shadow-sm">
      <Form form={form} layout="vertical" onFinish={handleUpload}>
        {/* Requirement: Duplicate detection by document number */}
        <Form.Item
            label="Document Number"
            name="docNumber"
            rules={[
                { required: true, message: 'Please enter the Document Number' },
            ]}
            tooltip="Unique identifier for duplicate detection"
        >
            <Input placeholder="e.g., DOC-2025-001" />
        </Form.Item>

        <Form.Item label="Document File" required>
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Supported: PDF, JPG, PNG, TIFF. Max size: 50MB.
                </p>
            </Dragger>
        </Form.Item>

        <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                loading={uploading}
                icon={<UploadOutlined />}
                block
                size="large"
            >
                {uploading ? 'Processing...' : 'Submit Document'}
            </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};