import React, { useState, useEffect, useMemo } from 'react';
import {
  UserCheck, HeartHandshake, Eye, ClipboardList, Clock, AlertTriangle,
  Menu, Search, PlusCircle, X as XIcon, MapPin, CheckSquare, ShieldCheck, User as UserIcon
} from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { Camera } from './components/Camera';
import { Student, User, ToastMessage, ViewType, CartItem } from './types';
import { parseStudents, DROPDOWNS, MOCK_MUSYRIF } from './services/dataService';

// --- MAIN COMPONENT ---

const App: React.FC = () => {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Initialize Data
  useEffect(() => {
    const loadedStudents = parseStudents();
    setStudents(loadedStudents);

    // Check session
    const savedUser = localStorage.getItem('sim_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Helpers
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleLogin = (role: 'USTADZ' | 'PENGAWAS') => {
    const newUser: User = {
      name: role === 'USTADZ' ? 'Ust. Ahmad Fauzi' : 'Ust. Hamzah (Pengawas)',
      email: 'simulasi@pondok.id',
      role: role,
      gedung: 'Arofah',
      syuqqoh: role === 'USTADZ' ? 'Najran' : 'Kantor Pusat',
      avatar: `https://ui-avatars.com/api/?name=${role}&background=random`
    };
    localStorage.setItem('sim_user_session', JSON.stringify(newUser));
    setUser(newUser);
    showToast(`Login berhasil sebagai ${role}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('sim_user_session');
    setUser(null);
    setCurrentView('home');
  };

  const simulateSave = (feature: string, data: any) => {
    console.group(`[SIMULATION] Saving ${feature}`);
    console.log("Payload:", data);
    console.log("User:", user?.name);
    console.log("Timestamp:", new Date().toISOString());
    console.groupEnd();
    showToast(`Data ${feature} berhasil disimpan (Log Only)`);
  };

  // --- VIEWS ---

  // 1. HOME VIEW
  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-2xl shadow-lg text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">Ahlan wa Sahlan,</h2>
        <h3 className="text-xl font-medium opacity-90">{user?.name}</h3>
        <div className="flex gap-2 mt-4">
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{user?.role}</span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{user?.gedung} - {user?.syuqqoh}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { id: 'absensi', label: 'Absensi', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
          { id: 'konseling', label: 'Konseling', icon: HeartHandshake, color: 'text-pink-600', bg: 'bg-pink-100' },
          { id: 'daur', label: 'Laporan Daur', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { id: 'terlambat', label: 'Keterlambatan', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
          { id: 'pelanggaran', label: 'Pelanggaran', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewType)}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
          >
            <div className={`${item.bg} p-3 rounded-full ${item.color} mb-3`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-gray-700">{item.label}</span>
          </div>
        ))}
        {user?.role === 'PENGAWAS' && (
          <div
            onClick={() => setCurrentView('pengawasan')}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
          >
            <div className="bg-purple-100 p-3 rounded-full text-purple-600 mb-3">
              <Eye className="w-6 h-6" />
            </div>
            <span className="font-bold text-gray-700">Pengawasan</span>
          </div>
        )}
      </div>
    </div>
  );

  // 2. ABSENSI VIEW
  const AbsensiView = () => {
    const [keterangan, setKeterangan] = useState('');
    const [foto, setFoto] = useState<string | null>(null);

    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Absensi Kehadiran
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Keterangan</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          >
            <option value="">-- Pilih --</option>
            {DROPDOWNS.keterangan_absensi.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="w-full">
          <Camera onCapture={setFoto} label="Foto Absensi" />
        </div>

        <button
          onClick={() => {
            if (!keterangan || !foto) return showToast("Lengkapi form & foto", 'error');
            simulateSave('Absensi', { keterangan, hasPhoto: !!foto });
            setKeterangan('');
            setFoto(null);
          }}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
        >
          Simpan Absensi
        </button>
      </div>
    );
  };

  // 3. KONSELING VIEW
  const KonselingView = () => {
    const myStudents = students.filter(s => s.syuqqoh === user?.syuqqoh || user?.role === 'PENGAWAS');
    const [selectedKamar, setSelectedKamar] = useState('');
    const [selectedNisn, setSelectedNisn] = useState('');
    const [laporan, setLaporan] = useState('');

    const uniqueKamars = [...new Set(myStudents.map(s => s.kamar))].sort();
    const filteredStudents = myStudents.filter(s => s.kamar === selectedKamar);

    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4" /> Form Konseling
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Kamar</label>
          <select className="w-full p-2 border rounded-lg" value={selectedKamar} onChange={e => { setSelectedKamar(e.target.value); setSelectedNisn(''); }}>
            <option value="">Pilih Kamar</option>
            {uniqueKamars.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Santri</label>
          <select className="w-full p-2 border rounded-lg" value={selectedNisn} onChange={e => setSelectedNisn(e.target.value)} disabled={!selectedKamar}>
            <option value="">Pilih Santri</option>
            {filteredStudents.map(s => <option key={s.nisn} value={s.nisn}>{s.nama}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Detail Konseling</label>
          <textarea
            rows={4}
            className="w-full p-2 border rounded-lg"
            value={laporan}
            onChange={e => setLaporan(e.target.value)}
            placeholder="Catatan..."
          ></textarea>
        </div>

        <button
          onClick={() => {
            if (!selectedNisn || !laporan) return showToast("Lengkapi form", 'error');
            simulateSave('Konseling', { nisn: selectedNisn, laporan });
            setLaporan(''); setSelectedKamar('');
          }}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
        >
          Simpan Laporan
        </button>
      </div>
    );
  };

  // 4. DAUR VIEW
  const DaurView = () => {
    const myStudents = students.filter(s => s.syuqqoh === user?.syuqqoh || user?.role === 'PENGAWAS').sort((a, b) => a.kamar.localeCompare(b.kamar));
    const [checkedNisns, setCheckedNisns] = useState<Set<string>>(new Set());
    const [keterangan, setKeterangan] = useState('');

    const toggleCheck = (nisn: string) => {
      const newSet = new Set(checkedNisns);
      if (newSet.has(nisn)) newSet.delete(nisn); else newSet.add(nisn);
      setCheckedNisns(newSet);
    };

    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <CheckSquare className="w-4 h-4" /> Checklist Daur
        </h3>

        <div className="max-h-80 overflow-y-auto border rounded-lg bg-gray-50 p-2 space-y-2">
          {myStudents.map(s => (
            <div key={s.nisn}
              onClick={() => toggleCheck(s.nisn)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${checkedNisns.has(s.nisn) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${checkedNisns.has(s.nisn) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                {checkedNisns.has(s.nisn) && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-700">{s.nama}</div>
                <div className="text-[10px] text-gray-500 uppercase">Kamar {s.kamar}</div>
              </div>
            </div>
          ))}
        </div>

        {checkedNisns.size > 0 && (
          <div className="border-t pt-4">
            <p className="text-xs font-bold mb-2 text-blue-600">Terpilih: {checkedNisns.size} Santri</p>
            <select className="w-full p-2 border rounded-lg mb-4" value={keterangan} onChange={e => setKeterangan(e.target.value)}>
              <option value="">-- Keterangan Massal --</option>
              {DROPDOWNS.keterangan_daur.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <button
              onClick={() => {
                if (!keterangan) return showToast("Pilih keterangan", 'error');
                simulateSave('Daur', { count: checkedNisns.size, nisns: Array.from(checkedNisns), keterangan });
                setCheckedNisns(new Set()); setKeterangan('');
              }}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
            >
              Simpan Daur
            </button>
          </div>
        )}
      </div>
    );
  };

  // 5. SEARCH & CART COMPONENT (Generic)
  const SearchCartFeature = ({
    type,
    dropdownOptions,
    dropdownLabel,
    extraField,
    requirePhoto
  }: {
    type: string,
    dropdownOptions: string[],
    dropdownLabel: string,
    extraField?: React.ReactNode,
    requirePhoto?: boolean
  }) => {
    const [searchQ, setSearchQ] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mainValue, setMainValue] = useState('');
    const [foto, setFoto] = useState<string | null>(null);

    const searchResults = useMemo(() => {
      if (searchQ.length < 3) return [];
      return students.filter(s => s.nama.toLowerCase().includes(searchQ.toLowerCase())).slice(0, 10);
    }, [searchQ, students]);

    const addToCart = (s: Student) => {
      if (!cart.find(c => c.nisn === s.nisn)) {
        setCart([...cart, { nisn: s.nisn, nama: s.nama, gedung: s.gedung }]);
        setSearchQ('');
      }
    };

    return (
      <div className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4 ${type === 'Pelanggaran' ? 'border-l-4 border-l-red-500' : ''}`}>
        <h3 className={`font-bold ${type === 'Pelanggaran' ? 'text-red-700' : 'text-gray-800'} flex items-center gap-2`}>
          {type === 'Pelanggaran' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          Input {type}
        </h3>

        {extraField}

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">{dropdownLabel}</label>
          <select className="w-full p-2 border rounded-lg" value={mainValue} onChange={e => setMainValue(e.target.value)}>
            <option value="">-- Pilih --</option>
            {dropdownOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 p-2 border rounded-lg"
            placeholder="Cari Santri (min 3 huruf)..."
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full bg-white shadow-xl rounded-lg mt-1 max-h-48 overflow-y-auto border">
              {searchResults.map(s => (
                <div key={s.nisn} onClick={() => addToCart(s)} className="p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold">{s.nama}</div>
                    <div className="text-xs text-gray-500">Gedung {s.gedung}</div>
                  </div>
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {cart.map(c => (
            <div key={c.nisn} className="flex justify-between items-center p-2 bg-gray-100 rounded text-sm">
              <span>{c.nama}</span>
              <button onClick={() => setCart(cart.filter(x => x.nisn !== c.nisn))} className="text-red-500">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {requirePhoto && (
          <div className="w-full">
            <Camera onCapture={setFoto} label="Bukti Pelanggaran" />
          </div>
        )}

        <button
          onClick={() => {
            if (!mainValue || cart.length === 0 || (requirePhoto && !foto)) return showToast("Lengkapi data", 'error');
            simulateSave(type, { mainValue, students: cart, hasPhoto: !!foto });
            setCart([]); setMainValue(''); setFoto(null);
          }}
          className={`w-full font-bold py-3 rounded-lg text-white ${type === 'Pelanggaran' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
        >
          Simpan {type}
        </button>
      </div>
    );
  };

  // 6. PENGAWASAN (Specific for PENGAWAS role)
  const PengawasanView = () => {
    const [selectedDaur, setSelectedDaur] = useState('');
    const [musyrifData, setMusyrifData] = useState<{ id: number, status: string }[]>([]);

    const handleStatusChange = (id: number, val: string) => {
      const existing = musyrifData.filter(m => m.id !== id);
      if (val) existing.push({ id, status: val });
      setMusyrifData(existing);
    };

    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Eye className="w-4 h-4" /> Pengawasan Musyrif
        </h3>

        <select className="w-full p-2 border rounded-lg" value={selectedDaur} onChange={e => setSelectedDaur(e.target.value)}>
          <option value="">-- Pilih Waktu Daur --</option>
          {DROPDOWNS.daur.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <div className="space-y-3">
          {MOCK_MUSYRIF.map(m => (
            <div key={m.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <span className="text-sm font-semibold">{m.nama}</span>
              <select className="text-xs p-1 border rounded" onChange={(e) => handleStatusChange(m.id, e.target.value)}>
                <option value="">- Status -</option>
                {DROPDOWNS.keterangan_absensi.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (!selectedDaur || musyrifData.length === 0) return showToast("Lengkapi data", 'error');
            simulateSave('Pengawasan', { daur: selectedDaur, data: musyrifData });
            setSelectedDaur(''); setMusyrifData([]);
          }}
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700"
        >
          Simpan Pengawasan
        </button>
      </div>
    );
  };

  // --- LOGIN OVERLAY ---

  if (!user) {
    return (
      <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-all">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Monitoring Pondok</h1>
          <p className="text-gray-500 text-sm mb-6">Versi Simulasi (Tanpa Database)</p>

          <div className="space-y-3">
            <button onClick={() => handleLogin('USTADZ')} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium">
              <UserIcon className="w-4 h-4" /> Masuk sebagai Ustadz
            </button>
            <button onClick={() => handleLogin('PENGAWAS')} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all text-sm font-medium">
              <ShieldCheck className="w-4 h-4" /> Masuk sebagai Pengawas
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-6">Data disimpan di browser log saja.</p>
        </div>
      </div>
    );
  }

  // --- MAIN APP RENDER ---

  return (
    <div className="flex h-full overflow-hidden bg-gray-50">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto relative w-full">
        {/* Mobile Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center px-4 justify-between sticky top-0 z-20 md:hidden shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-gray-900 text-lg">
              {currentView === 'home' ? 'Home' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
          {currentView === 'home' && <HomeView />}
          {currentView === 'absensi' && <AbsensiView />}
          {currentView === 'konseling' && <KonselingView />}
          {currentView === 'daur' && <DaurView />}
          {currentView === 'pengawasan' && <PengawasanView />}
          {currentView === 'terlambat' && (
            <SearchCartFeature
              type="Keterlambatan"
              dropdownLabel="Jenis Keterlambatan"
              dropdownOptions={DROPDOWNS.jenis_keterlambatan}
            />
          )}
          {currentView === 'pelanggaran' && (
            <SearchCartFeature
              type="Pelanggaran"
              dropdownLabel="Jenis Pelanggaran"
              dropdownOptions={DROPDOWNS.pelanggaran}
              requirePhoto={true}
            />
          )}
        </div>
      </main>

      {/* Toast Notification */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-bounce`}>
            <div className={`w-2 h-2 rounded-full ${t.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}></div>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
