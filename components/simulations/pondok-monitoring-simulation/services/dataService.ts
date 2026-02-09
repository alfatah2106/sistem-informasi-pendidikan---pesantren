import { Student } from '../types';

const CSV_DATA = `NISN,NAMA,KELAS,HALAQOH,GEDUNG,SYUQQOH,KAMAR
0098273641,Ahmad Fauzi,7,Ust. Umar,Arofah,Najran,1
0087615243,Budi Santoso,8,Ust. Abdul,Muzdalifah,Badr,2
0076543210,Cahyo Nugroho,7,Ust. Abdul,Arofah,Najran,2
0091234567,Dedi Setiawan,8,Ust. Umar,Muzdalifah,Badr,1
0082345678,Eko Prasetyo,7,Ust. Umar,Arofah,Najran,1
0073456789,Farhan Ali,8,Ust. Abdul,Muzdalifah,Badr,2
0064567890,Gilang Ramadhan,7,Ust. Abdul,Muzdalifah,Badr,1
0055678901,Haryono,8,Ust. Umar,Arofah,Najran,2
0046789012,Indra Wijaya,7,Ust. Umar,Muzdalifah,Badr,2
0037890123,Joko Susilo,8,Ust. Abdul,Arofah,Najran,1`;

export const parseStudents = (): Student[] => {
  const lines = CSV_DATA.trim().split('\n');
  const headers = lines[0].split(','); // NISN,NAMA,KELAS...
  
  const students: Student[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length === headers.length) {
      students.push({
        nisn: currentLine[0],
        nama: currentLine[1],
        kelas: currentLine[2],
        halaqoh: currentLine[3],
        gedung: currentLine[4],
        syuqqoh: currentLine[5],
        kamar: currentLine[6],
      });
    }
  }
  return students;
};

// Mock dropdown data
export const DROPDOWNS = {
  keterangan_absensi: ['Hadir', 'Sakit', 'Izin', 'Alpha'],
  daur: ['Daur Subuh', 'Daur Siang', 'Daur Maghrib', 'Daur Malam'],
  jenis_keterlambatan: ['Telat Jamaah', 'Telat Sekolah', 'Telat Kegiatan', 'Telat Daur'],
  gedung: ['Arofah', 'Muzdalifah', 'Mina'],
  pelanggaran: ['Merokok', 'Kabur', 'Berkelahi', 'Mencuri', 'Bawa HP', 'Tidak Bahasa'],
  keterangan_daur: ['Lengkap', 'Kurang Lengkap', 'Tidak Ada', 'Kabur'],
};

// Mock Musyrif Data
export const MOCK_MUSYRIF = [
  { id: 1, nama: 'Ust. Abdullah', gedung: 'Arofah' },
  { id: 2, nama: 'Ust. Hamzah', gedung: 'Arofah' },
  { id: 3, nama: 'Ust. Khalid', gedung: 'Muzdalifah' },
];
