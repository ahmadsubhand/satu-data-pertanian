import React, { useState, useRef, useEffect } from 'react';
import { Upload, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface FileUploadProps {
    value?: string;
    onChange?: (value: string) => void;
    maxFileSize?: number; // in MB
    allowedFileTypes?: string[]; // e.g., ['image/*', 'video/*', '.pdf']
    accept?: string;
    multiple?: boolean;
    showUploadList?: boolean;
    label?: string;
    name?: string;
    required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    value,
    onChange,
    maxFileSize = 10, // 10MB default
    allowedFileTypes = ['image/*', 'video/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain'],
    accept = 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt',
    multiple = false,
    showUploadList = true,
    label = 'Upload File',
    name = 'file',
    required = false,
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update fileList when value changes from parent
    useEffect(() => {
        if (value && fileList.length === 0) {
            const fileName = value.split('/').pop() || value;
            setFileList([
                {
                    uid: '1',
                    name: fileName,
                    status: 'done',
                    url: value,
                }
            ]);
        }
    }, [value]);

    const beforeUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
        // Check file size
        const isLtMB = file.size / 1024 / 1024 < maxFileSize;
        if (!isLtMB) {
            message.error(`File ${file.name} terlalu besar. Maksimal ukuran file adalah ${maxFileSize}MB!`);
            return Upload.LIST_IGNORE;
        }

        // Check file type
        if (allowedFileTypes.length > 0) {
            const isAllowedType = allowedFileTypes.some(type => {
                if (type.startsWith('.')) {
                    // Check extension
                    return file.name.toLowerCase().endsWith(type.toLowerCase());
                } else {
                    // Check MIME type
                    return file.type.startsWith(type.split('/')[0]);
                }
            });
            
            if (!isAllowedType) {
                message.error(`File ${file.name} tidak didukung. Format yang diizinkan: ${allowedFileTypes.join(', ')}`);
                return Upload.LIST_IGNORE;
            }
        }

        // Continue with upload
        const newFile: UploadFile = {
            uid: `file-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'uploading',
        };

        setFileList(prev => [...prev, newFile]);
        setUploading(true);
        setUploadProgress(0);

        // Simulate upload process (replace with actual upload logic)
        simulateUpload(file, newFile.uid);

        return false; // Prevent default upload behavior
    };

    const simulateUpload = (file: RcFile, uid: string) => {
        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev === null) return 10;
                return prev >= 95 ? 95 : prev + 5;
            });
        }, 200);

        // Simulate upload completion after delay
        setTimeout(() => {
            clearInterval(interval);
            setUploadProgress(100);

            setFileList(prev => 
                prev.map(f => 
                    f.uid === uid 
                        ? { 
                            ...f, 
                            status: 'done',
                            originFileObj: file,
                            size: file.size,
                        } 
                        : f
                )
            );

            // Prepare file for form submission (using base64 or URL to send to server)
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target?.result as string;
                onChange?.(fileContent); // Pass file content to parent
                setUploading(false);
                setUploadProgress(null);
            };
            reader.readAsDataURL(file);
        }, 2000);
    };

    const onRemove = (file: UploadFile) => {
        setFileList(prev => prev.filter(f => f.uid !== file.uid));
        if (fileList.length === 1) {
            onChange?.(''); // Clear value when file is removed
        }
    };

    const uploadProps = {
        beforeUpload,
        onRemove,
        fileList,
        showUploadList,
        itemRender: (originNode: React.ReactElement, file: UploadFile) => {
            return React.cloneElement(originNode, {
                children: (
                    <div>
                        {originNode.props.children}
                        {uploadProgress !== null && file.status === 'uploading' && (
                            <Progress 
                                percent={uploadProgress} 
                                size="small" 
                                style={{ marginTop: 8 }} 
                            />
                        )}
                    </div>
                ),
            });
        }
    };

    return (
        <div className="file-upload-component">
            <Upload {...uploadProps} accept={accept} multiple={multiple}>
                <button
                    style={{ border: 0, background: 'none' }}
                    type="button"
                    disabled={uploading}
                >
                    <UploadOutlined /> {label} {required && '*'}
                </button>
            </Upload>
            {uploading && (
                <div style={{ marginTop: 8 }}>
                    <Progress percent={uploadProgress || 0} size="small" />
                </div>
            )}
        </div>
    );
};

export default FileUpload;