import React, { useState, useMemo } from 'react';
import { ClipboardList, Save, CheckCircle } from 'lucide-react';
import { Student, JournalEntry } from '../types';
import { MAPEL_OPTIONS } from '../constants';
import { generateId } from '../utils';

interface Props {
  students: Student[];
  onSave: (entry: JournalEntry) => void;
  showNotify: (type: 'success' | 'error', msg: string) => void;
}

export const Absensi: React.FC<Props> = ({ students, onSave, showNotify }) => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('');
  const [materi, setMateri] = useState('');
  const [selectedJams, setSelectedJams] = useState<number[]>([]);
  const [studentData, setStudentData] = useState<Record<string, { status: string; nilai: number }>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Extract unique classes
  const kelasOptions = useMemo(() => {
    return [...new Set(students.map(s => s.kelas))].filter(Boolean).sort();
  }, [students]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => s.kelas === selectedKelas).sort((a, b) => a.nama.localeCompare(b.nama));
  }, [students, selectedKelas]);

  const handleJamToggle = (jam: number) => {
    setSelectedJams(prev => 
      prev.includes(jam) ? prev.filter(j => j !== jam) : [...prev, jam].sort((a,b) => a-b)
    );
  };

  const handleStatusChange = (nisn: string, val: string) => {
    setStudentData(prev => ({
      ...prev,
      [nisn]: { ...(prev[nisn] || { nilai: 100 }), status: val }
    }));
  };

  const handleNilaiChange = (nisn: string, val: number) => {
    setStudentData(prev => ({
      ...prev,
      [nisn]: { ...(prev[nisn] || { status: 'H' }), nilai: val }
    }));
  };

  const setAllNilai = (val: number) => {
    const newData: any = { ...studentData };
    filteredStudents.forEach(s => {
      newData[s.nisn] = { ...(newData[s.nisn] || { status: 'H' }), nilai: val };
    });
    setStudentData(newData);
    showNotify('success', `Semua nilai diatur ke ${val}`);
  };

  const handleSubmit = () => {
    if (!selectedMapel) return showNotify('error', 'Pilih Mata Pelajaran!');
    if (!materi) return showNotify('error', 'Materi wajib diisi!');
    if (selectedJams.length === 0) return showNotify('error', 'Pilih minimal satu jam pelajaran!');
    if (filteredStudents.length === 0) return showNotify('error', 'Tidak ada siswa!');

    setIsProcessing(true);
    
    // Simulate API Call
    setTimeout(() => {
      console.log("Saving Absensi Data:", {
        kelas: selectedKelas,
        mapel: selectedMapel,
        materi,
        jams: selectedJams,
        details: filteredStudents.map(s => ({
            ...s,
            ...(studentData[s.nisn] || { status: 'H', nilai: 100 })
        }))
      });

      onSave({
        id: generateId(),
        date: new Date().toISOString(),
        type: 'Absensi',
        kelas: selectedKelas,
        mapel: selectedMapel,
        materi: materi,
        count: filteredStudents.length
      });

      showNotify('success', 'Data Absensi Berhasil Disimpan (Simulasi)');
      
      // Reset form partially
      setMateri('');
      setSelectedJams([]);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="w-full animate-fadeIn pb-24">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ClipboardList className="mr-2 text-blue-600" /> Absensi Harian
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Kelas</label>
                <select 
                    value={selectedKelas}
                    onChange={(e) => setSelectedKelas(e.target.value)}
                    className="mt-1 p-3 rounded-lg border border-gray-200 w-full bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="">-- Pilih Kelas --</option>
                    {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
            </div>
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Mata Pelajaran</label>
                <select 
                    value={selectedMapel}
                    onChange={(e) => setSelectedMapel(e.target.value)}
                    className="mt-1 p-3 rounded-lg border border-gray-200 w-full bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="">-- Pilih Mapel --</option>
                    {MAPEL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
        </div>

        <div className="mt-4">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jam Pelajaran</label>
            <div className="flex flex-wrap gap-2">
                {[1,2,3,4,5,6,7,8].map(jam => (
                    <button
                        key={jam}
                        onClick={() => handleJamToggle(jam)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-all text-sm font-bold ${
                            selectedJams.includes(jam) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                    >
                        {jam}
                    </button>
                ))}
            </div>
        </div>

        <div className="mt-4">
            <label className="text-xs font-bold text-gray-500 uppercase">Materi Pembelajaran</label>
            <input 
                type="text" 
                value={materi}
                onChange={(e) => setMateri(e.target.value)}
                placeholder="Contoh: Bab 1 Pendahuluan..." 
                className="mt-1 w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
        </div>

        {filteredStudents.length > 0 && (
             <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">Set Nilai Harian Otomatis:</span>
                <select 
                    onChange={(e) => {
                        if(e.target.value) setAllNilai(parseInt(e.target.value));
                        e.target.value = '';
                    }}
                    className="text-sm border-blue-300 border bg-blue-50 text-blue-700 font-bold rounded-lg p-2 cursor-pointer hover:bg-blue-100 outline-none"
                >
                    <option value="">-- Pilih Nilai --</option>
                    <option value="100">100 (Sempurna)</option>
                    <option value="90">90 (Sangat Baik)</option>
                    <option value="80">80 (Baik)</option>
                    <option value="70">70 (Cukup)</option>
                    <option value="50">50 (Kurang)</option>
                    <option value="0">0 (Nol)</option>
                </select>
            </div>
        )}
      </div>

      <div className="space-y-3">
        {selectedKelas && filteredStudents.length === 0 && (
            <div className="text-center p-8 bg-white rounded-xl border border-gray-200 text-gray-500 italic">
                Tidak ada siswa di kelas ini.
            </div>
        )}

        {filteredStudents.map((s, idx) => {
            const data = studentData[s.nisn] || { status: 'H', nilai: 100 };
            return (
                <div key={s.nisn} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 transition-all hover:border-blue-400">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">{idx + 1}</div>
                        <div>
                            <div className="font-bold text-gray-800">{s.nama}</div>
                            <div className="text-xs text-gray-400 font-mono">{s.nisn}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <select 
                            value={data.status}
                            onChange={(e) => handleStatusChange(s.nisn, e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none w-24"
                        >
                            <option value="H">Hadir</option>
                            <option value="S">Sakit</option>
                            <option value="I">Izin</option>
                            <option value="A">Alpha</option>
                        </select>

                        <select 
                            value={data.nilai}
                            onChange={(e) => handleNilaiChange(s.nisn, parseInt(e.target.value))}
                            className={`w-20 p-2 border border-gray-300 rounded-lg text-center font-bold bg-white focus:ring-2 focus:ring-blue-500 outline-none ${
                                data.nilai >= 80 ? 'text-emerald-600' : data.nilai >= 70 ? 'text-amber-600' : 'text-red-600'
                            }`}
                        >
                            <option value="100">100</option>
                            <option value="90">90</option>
                            <option value="80">80</option>
                            <option value="70">70</option>
                            <option value="50">50</option>
                            <option value="0">0</option>
                        </select>
                    </div>
                </div>
            );
        })}
      </div>

      {filteredStudents.length > 0 && (
          <button 
            onClick={handleSubmit}
            disabled={isProcessing}
            className="fixed bottom-6 right-6 bg-blue-600 text-white px-8 py-3 rounded-full shadow-xl font-bold hover:bg-blue-700 z-20 transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
             {isProcessing ? 'Menyimpan...' : <><Save className="w-5 h-5" /> Simpan Absensi</>}
          </button>
      )}
    </div>
  );
};