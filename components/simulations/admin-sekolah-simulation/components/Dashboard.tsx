import React from 'react';
import { ClipboardList, Award, BookOpen, FileBarChart } from 'lucide-react';

interface Props {
  userName: string;
  onChangeTab: (tab: string) => void;
}

export const Dashboard: React.FC<Props> = ({ userName, onChangeTab }) => {
  return (
    <div className="w-full animate-fadeIn">
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800">Halo, {userName.split(' ')[0]}!</h2>
        <p className="text-gray-500 mt-1">Selamat datang di sistem simulasi. Data yang Anda simpan akan muncul di Jurnal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => onChangeTab('absensi')} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ClipboardList className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Absensi Siswa</h3>
          <p className="text-sm text-gray-400 mt-1">Catat kehadiran harian</p>
        </div>

        <div onClick={() => onChangeTab('nilai')} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all group">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Award className="text-emerald-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Input Nilai</h3>
          <p className="text-sm text-gray-400 mt-1">Kelola nilai ujian</p>
        </div>

        <div onClick={() => onChangeTab('jurnal')} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-amber-300 transition-all group">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-amber-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Jurnal Guru</h3>
          <p className="text-sm text-gray-400 mt-1">Riwayat aktivitas</p>
        </div>

        <div onClick={() => onChangeTab('laporan')} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-purple-300 transition-all group">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileBarChart className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Laporan</h3>
          <p className="text-sm text-gray-400 mt-1">Rekapitulasi data</p>
        </div>
      </div>
    </div>
  );
};