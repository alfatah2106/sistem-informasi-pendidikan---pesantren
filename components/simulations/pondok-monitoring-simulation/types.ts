export interface Student {
  nisn: string;
  nama: string;
  kelas: string;
  halaqoh: string;
  gedung: string;
  syuqqoh: string;
  kamar: string;
}

export interface User {
  name: string;
  email: string;
  role: 'USTADZ' | 'PENGAWAS';
  gedung: string;
  syuqqoh: string;
  avatar: string;
}

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type ViewType = 'home' | 'absensi' | 'konseling' | 'pengawasan' | 'daur' | 'terlambat' | 'pelanggaran';

export interface CartItem {
  nisn: string;
  nama: string;
  gedung: string;
}
