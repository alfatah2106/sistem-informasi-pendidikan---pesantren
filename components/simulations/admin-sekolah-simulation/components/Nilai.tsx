import React, { useState, useMemo } from 'react';
import { Award, Save } from 'lucide-react';
import { Student, JournalEntry } from '../types';
import { MAPEL_OPTIONS, UJIAN_OPTIONS } from '../constants';
import { generateId } from '../utils';

interface Props {
  students: Student[];
  onSave: (entry: JournalEntry) => void;
  showNotify: (type: 'success' | 'error', msg: string) => void;
}

export const Nilai: React.FC<Props> = ({ students, onSave, showNotify }) => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('');
  const [selectedUjian, setSelectedUjian] = useState('');
  const [nilaiData, setNilaiData] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const kelasOptions = useMemo(() => {
    return [...new Set(students.map(s => s.kelas))].filter(Boolean).sort();
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => s.kelas === selectedKelas).sort((a, b) => a.nama.localeCompare(b.nama));
  }, [students, selectedKelas]);

  const handleNilaiInput = (nisn: string, val: string) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0 && num <= 100) {
        setNilaiData(prev => ({ ...prev, [nisn]: num }));
    } else if (val === '') {
        const newData = { ...nilaiData };
        delete newData[nisn];
        setNilaiData(newData);
    }
  };

  const handleSubmit = () => {
    if (!selectedKelas || !selectedMapel || !selectedUjian) {
        return showNotify('error', 'Lengkapi data Kelas, Mapel, dan Jenis Ujian!');
    }
    const entries = Object.entries(nilaiData);
    if (entries.length === 0) {
        return showNotify('error', 'Isi minimal satu nilai siswa!');
    }

    setIsProcessing(true);
    setTimeout(() => {
        console.log("Saving Nilai Data:", {
            kelas: selectedKelas,
            mapel: selectedMapel,
            ujian: selectedUjian,
            scores: nilaiData
        });

        onSave({
            id: generateId(),
            date: new Date().toISOString(),
            type: 'Nilai',
            kelas: selectedKelas,
            mapel: selectedMapel,
            jenisUjian: selectedUjian,
            count: entries.length
        });

        showNotify('success', `Berhasil menyimpan nilai untuk ${entries.length} siswa!`);
        
        // Reset
        setNilaiData({});
        setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="w-full animate-fadeIn pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Input Nilai Siswa</h2>
                <p className="text-gray-500 text-sm">Masukkan nilai ujian secara manual</p>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kelas</label>
                    <select 
                        value={selectedKelas} 
                        onChange={(e) => setSelectedKelas(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        <option value="">-- Pilih Kelas --</option>
                        {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mata Pelajaran</label>
                    <select 
                        value={selectedMapel} 
                        onChange={(e) => setSelectedMapel(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        <option value="">-- Pilih Mapel --</option>
                        {MAPEL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jenis Ujian</label>
                    <select 
                        value={selectedUjian} 
                        onChange={(e) => setSelectedUjian(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        <option value="">-- Pilih Jenis --</option>
                        {UJIAN_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {selectedKelas && filteredStudents.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-emerald-50 border-b border-emerald-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-emerald-800 uppercase w-16 text-center">No</th>
                                <th className="p-4 text-xs font-bold text-emerald-800 uppercase">Nama Siswa</th>
                                <th className="p-4 text-xs font-bold text-emerald-800 uppercase text-center w-40">NILAI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {filteredStudents.map((s, idx) => (
                                <tr key={s.nisn} className="hover:bg-emerald-50/30 transition-colors group">
                                    <td className="p-4 text-center text-gray-500 font-medium">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{s.nama}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <input
                                            type="number"
                                            value={nilaiData[s.nisn] ?? ''}
                                            onChange={(e) => handleNilaiInput(s.nisn, e.target.value)}
                                            className="w-24 p-2.5 border border-gray-300 rounded-lg text-center font-bold text-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder-gray-300 mx-auto block"
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Menyimpan...' : <><Save className="w-5 h-5" /> Simpan Data Nilai</>}
                    </button>
                </div>
            </div>
        )}

        {selectedKelas && filteredStudents.length === 0 && (
            <div className="text-center p-10 bg-white rounded-2xl border border-gray-200 text-gray-400 italic">
                Tidak ada siswa di kelas ini.
            </div>
        )}
    </div>
  );
};