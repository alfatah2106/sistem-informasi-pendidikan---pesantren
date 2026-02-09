import React, { useState, useEffect } from 'react';
import { User, Student, JournalEntry, Notification } from './types';
import { CSV_DATA } from './constants';
import { parseCSV, generateId } from './utils';

import { LoginOverlay } from './components/LoginOverlay';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Absensi } from './components/Absensi';
import { Nilai } from './components/Nilai';
import { Jurnal } from './components/Jurnal';
import { NotificationToast } from './components/NotificationToast';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize Data on Mount
  useEffect(() => {
    // 1. Check LocalStorage for User
    const savedUser = localStorage.getItem('school_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 2. Parse "Database"
    const parsedStudents = parseCSV(CSV_DATA);
    setStudents(parsedStudents);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('school_user', JSON.stringify(newUser));
    showNotify('success', 'Berhasil Login! Selamat Datang.');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('school_user');
    setActiveTab('dashboard');
    showNotify('info', 'Anda telah keluar.');
  };

  const showNotify = (type: 'success' | 'error' | 'info', message: string) => {
    const newNote: Notification = { id: generateId(), type, message };
    setNotifications(prev => [...prev, newNote]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSaveEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [entry, ...prev]);
  };

  // Render Content based on Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userName={user?.name || 'User'} onChangeTab={setActiveTab} />;
      case 'absensi':
        return <Absensi students={students} onSave={handleSaveEntry} showNotify={showNotify} />;
      case 'nilai':
        return <Nilai students={students} onSave={handleSaveEntry} showNotify={showNotify} />;
      case 'jurnal':
        return <Jurnal entries={journalEntries} />;
      case 'laporan':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
            <img src="https://picsum.photos/400/300?blur=5" alt="Construction" className="mx-auto rounded-lg mb-4 opacity-70" />
            <h2 className="text-xl font-bold text-gray-700">Fitur Laporan</h2>
            <p className="text-gray-500">Halaman ini belum tersedia dalam versi simulasi.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-gray-50 font-sans text-gray-800">
      <NotificationToast notifications={notifications} removeNotification={removeNotification} />

      {!user && <LoginOverlay onLogin={handleLogin} />}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <main className={`flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-500 ${!user ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="p-6 md:p-8 overflow-y-auto w-full h-full pb-32">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;