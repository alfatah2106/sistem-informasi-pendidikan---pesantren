import React from 'react';
import { ViewState } from '../types';
import {
  LayoutDashboard,
  School,
  BookOpen,
  CheckCircle,
  Settings,
  ShieldCheck,
  ChevronRight,
  MonitorPlay,
  MessageCircle
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <School className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">Sistem Informasi Ponpes</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 hidden sm:block"
              >
                Lihat Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Digitalisasi Manajemen <span className="text-blue-600">Sekolah & Pesantren</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
              Solusi terintegrasi untuk pendataan siswa, monitoring kedisiplinan pondok, dan setoran hafalan tahfidz.
              Dapat disesuaikan sepenuhnya dengan <strong>budaya & kurikulum lokal</strong> lembaga Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Lihat Simulasi Live <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <a
                href="https://wa.me/6281318446604"
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-all"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Customizable</h3>
              <p className="text-slate-600">
                Fitur dan istilah dalam aplikasi dapat disesuaikan dengan kultur pondok atau sekolah Anda.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">User Friendly</h3>
              <p className="text-slate-600">
                Desain antarmuka yang bersih dan mudah dipahami oleh guru, admin, maupun wali santri.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Aman & Terpusat</h3>
              <p className="text-slate-600">
                Data absensi, nilai, dan pelanggaran tersimpan aman dan mudah direkapitulasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Simulation Selector */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pilih Simulasi Aplikasi</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Berikut adalah 3 modul utama yang telah kami kembangkan. Klik tombol <strong>"Buka Simulasi"</strong> untuk mencoba tampilan interaktif layaknya aplikasi asli.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Card 1: Admin Sekolah */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
                <LayoutDashboard className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Admin Sekolah</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  Dashboard guru untuk manajemen kelas, absensi harian, input nilai, dan jurnal mengajar.
                </p>
                <button
                  onClick={() => onNavigate('school-admin')}
                  className="w-full mt-auto bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MonitorPlay className="w-4 h-4" /> Buka Simulasi
                </button>
              </div>
            </div>

            {/* Card 2: Pondok Monitoring */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-8">
                <ShieldCheck className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Monitoring Pondok</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  Sistem pengawasan santri (musyrif) untuk mencatat pelanggaran, perizinan, dan laporan kesehatan.
                </p>
                <button
                  onClick={() => onNavigate('pondok-monitoring')}
                  className="w-full mt-auto bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MonitorPlay className="w-4 h-4" /> Buka Simulasi
                </button>
              </div>
            </div>

            {/* Card 3: Tahfidz App */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-8">
                <BookOpen className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aplikasi Tahfidz</h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  Pencatatan setoran hafalan Quran, mutabaah harian, dan grafik perkembangan hafalan santri.
                </p>
                <button
                  onClick={() => onNavigate('tahfidz-app')}
                  className="w-full mt-auto bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MonitorPlay className="w-4 h-4" /> Buka Simulasi
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Siap Menerapkan Sistem Ini?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Jangan ragu untuk berdiskusi mengenai kebutuhan lembaga pendidikan Anda. Sistem kami fleksibel dan siap dikembangkan lebih lanjut.
          </p>
          <a
            href="https://wa.me/6281318446604"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Hubungi Saya (Miqdad)
          </a>
          <p className="mt-8 text-sm text-slate-500">
            © {new Date().getFullYear()} School & Pesantren Management Systems.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;