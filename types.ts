
export enum Subject {
  SCIENCE = 'Science',
  MATHS = 'Maths',
  FOUNDATION = 'Foundation'
}

export enum Standard {
  STD_5 = 'Std 5',
  STD_6 = 'Std 6',
  STD_7 = 'Std 7',
  STD_8 = 'Std 8',
  STD_9 = 'Std 9',
  STD_10 = 'Std 10',
  STD_11 = 'Std 11',
  STD_12 = 'Std 12'
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export interface MonitoringUserData {
  id: string;
  identifier: string; // email or phone
  password: string;
  location: { lat: number; lng: number };
  status: 'online' | 'offline';
  lastSeen: string;
}

export type ViewState = 'SUBJECTS' | 'STANDARDS' | 'WORKSPACE' | 'DEVICE_HUB' | 'ADMIN_DASHBOARD';
