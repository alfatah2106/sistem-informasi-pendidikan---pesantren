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
  avatar: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'Absensi' | 'Nilai';
  kelas: string;
  mapel: string;
  materi?: string; // Specific to Absensi
  jenisUjian?: string; // Specific to Nilai
  count: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}