import React from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${borderColor}`}>
      <div className="flex items-start gap-3">
        <p className={`text-sm ${textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;