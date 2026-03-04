import React, { useState } from 'react';

const WORKFLOWS = [
  { id: 'wf_po', name: 'PO' },
  { id: 'wf_pr', name: 'PR' },
  { id: 'wf_grn', name: 'GRN' },
  { id: 'wf_ss', name: 'SS' },
];

interface Folder {
  id: string;
  name: string;
  workflowId: string;
}

export const WorkflowFolders: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'PR', workflowId: 'wf_pr' },
    { id: '2', name: 'PO', workflowId: 'wf_po' },
    { id: '3', name: 'GRN', workflowId: 'wf_grn' },
    { id: '4', name: 'SS', workflowId: 'wf_ss' },
  ]);

  const addFolder = () => {
    if (!newName.trim()) return;
    setFolders([...folders, { id: Date.now().toString(), name: newName.toUpperCase(), workflowId: '' }]);
    setNewName('');
  };

  const updateWorkflow = (id: string, workflowId: string) => {
    setFolders(folders.map(f => f.id === id ? { ...f, workflowId } : f));
  };

  const deleteFolder = (id: string) => {
    setFolders(folders.filter(f => f.id !== id));
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 24 }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: 15, fontWeight: 600 }}>Workflow Folders</h3>
      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '12px 0 16px 0' }} />

      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
        Create folders in OneDrive. Any files dropped into these folders will be automatically retrieved and trigger the corresponding workflow.
      </p>

      {/* Create folder */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, maxWidth: 400 }}>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addFolder()}
          placeholder="e.g., INVOICE"
          style={{
            flex: 1, padding: '6px 12px', border: '1px solid #d1d5db',
            borderRadius: 6, fontSize: 13, outline: 'none'
          }}
        />
        <button
          onClick={addFolder}
          style={{
            background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6,
            padding: '6px 14px', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap'
          }}
        >
          + Create Folder
        </button>
      </div>

      {/* Folder rows */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
        {folders.map((folder, i) => (
          <div
            key={folder.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              borderBottom: i < folders.length - 1 ? '1px solid #e2e8f0' : 'none',
              gap: 12,
            }}
          >
            {/* Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" fill="#3b82f6" />
            </svg>

            {/* Name */}
            <span style={{ fontWeight: 600, color: '#1e293b', minWidth: 50 }}>{folder.name}</span>

            {/* Path */}
            <span style={{ color: '#94a3b8', fontSize: 12 }}>/OneDrive/Automated_Triggers/{folder.name}</span>

            {/* Push right */}
            <div style={{ flex: 1 }} />

            {/* Workflow dropdown */}
            <select
              value={folder.workflowId}
              onChange={e => updateWorkflow(folder.id, e.target.value)}
              style={{
                padding: '5px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 13,
                color: folder.workflowId ? '#1e293b' : '#94a3b8',
                background: '#fff',
                cursor: 'pointer',
                width: 160,
                outline: 'none',
              }}
            >
              <option value="" disabled>Select workflow</option>
              {WORKFLOWS.map(wf => (
                <option key={wf.id} value={wf.id}>{wf.name}</option>
              ))}
            </select>

            {/* Delete */}
            <button
              onClick={() => deleteFolder(folder.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#ef4444', padding: '4px 6px', borderRadius: 4, fontSize: 15,
              }}
              title="Delete"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};