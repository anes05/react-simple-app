import React from 'react';

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog-content">
        <h2>Are you sure you want to delete this item?</h2>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
