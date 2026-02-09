import { Student } from "./types";

export const parseCSV = (csvText: string): Student[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  const students: Student[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length === headers.length) {
      const student: any = {};
      headers.forEach((header, index) => {
        student[header] = currentLine[index].trim();
      });
      students.push(student as Student);
    }
  }
  return students;
};

export const formatDateIndo = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const generateId = () => Math.random().toString(36).substr(2, 9);