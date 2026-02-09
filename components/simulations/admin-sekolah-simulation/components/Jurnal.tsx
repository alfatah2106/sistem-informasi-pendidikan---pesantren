import React, { useMemo, useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import { JournalEntry } from '../types';
import { formatDateIndo } from '../utils';

interface Props {
  entries: JournalEntry[];
}

export const Jurnal: React.FC<Props> = ({ entries }) => {
  const [filterKelas, setFilterKelas] = useState('');
  const [filterMapel, setFilterMapel] = useState('');

  // Derived options for filters based on history
  const kelasOptions = useMemo(() => [...new Set(entries.map(e => e.kelas))].sort(), [entries]);
  const mapelOptions = useMemo(() => [...new Set(entries.map(e => e.mapel))].sort(), [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(e => {
        const matchK = filterKelas ? e.kelas === filterKelas : true;
        const matchM = filterMapel ? e.mapel === filterMapel : true;
        return matchK && matchM;
    }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, filterKelas, filterMapel]);

  return (
    <div className="w-full animate-fadeIn">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <BookOpen className="mr-2 text-amber-600" /> Riwayat Jurnal
                </h2>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Data Tersimpan (Lokal)
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                <div>
                    <label className="block text-xs font-bold text-amber-800 uppercase mb-1">Filter Kelas</label>
                    <select 
                        value={filterKelas}
                        onChange={(e) => setFilterKelas(e.target.value)}
                        className="p-2.5 rounded-lg border border-amber-200 w-full bg-white outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">Semua Kelas</option>
                        {kelasOptions.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-amber-800 uppercase mb-1">Filter Mapel</label>
                    <select 
                        value={filterMapel}
                        onChange={(e) => setFilterMapel(e.target.value)}
                        className="p-2.5 rounded-lg border border-amber-200 w-full bg-white outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">Semua Mapel</option>
                        {mapelOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-amber-50">
                        <tr>
                            <th className="p-4 text-left text-xs font-bold text-amber-800 uppercase">Tanggal</th>
                            <th className="p-4 text-left text-xs font-bold text-amber-800 uppercase">Tipe</th>
                            <th className="p-4 text-left text-xs font-bold text-amber-800 uppercase">Kelas</th>
                            <th className="p-4 text-left text-xs font-bold text-amber-800 uppercase">Mapel</th>
                            <th className="p-4 text-left text-xs font-bold text-amber-800 uppercase">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredEntries.length === 0 ? (
                            <tr><td colSpan={5} className="p-10 text-center text-gray-400 italic">Data tidak ditemukan.</td></tr>
                        ) : (
                            filteredEntries.map(e => (
                                <tr key={e.id} className="text-sm hover:bg-amber-50/50 transition-colors border-b border-gray-50 last:border-0">
                                    <td className="p-4 text-gray-500 font-mono whitespace-nowrap">{formatDateIndo(e.date)}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${e.type === 'Absensi' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {e.type}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">{e.kelas}</td>
                                    <td className="p-4 text-gray-600 font-medium">{e.mapel}</td>
                                    <td className="p-4 text-gray-600">
                                        {e.type === 'Absensi' ? (
                                            <>
                                                <div className="italic">{e.materi}</div>
                                                <div className="text-xs text-gray-400 mt-1">{e.count} Siswa tercatat</div>
                                            </>
                                        ) : (
                                            <>
                                                 <div className="font-semibold text-emerald-700">{e.jenisUjian}</div>
                                                 <div className="text-xs text-gray-400 mt-1">{e.count} Siswa dinilai</div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};