import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Notification } from '../types';

interface Props {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationToast: React.FC<Props> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-[110] flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <ToastItem key={n.id} notification={n} onRemove={() => removeNotification(n.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: Notification; onRemove: () => void }> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const config = {
    success: { bg: 'bg-emerald-500', icon: <CheckCircle className="w-5 h-5" /> },
    error: { bg: 'bg-red-500', icon: <AlertCircle className="w-5 h-5" /> },
    info: { bg: 'bg-blue-500', icon: <Info className="w-5 h-5" /> },
  }[notification.type];

  return (
    <div className={`pointer-events-auto p-4 rounded-xl shadow-lg text-white font-medium flex items-center gap-3 animate-slideIn ${config.bg} min-w-[300px]`}>
      {config.icon}
      <span className="flex-1">{notification.message}</span>
      <button onClick={onRemove} className="opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};