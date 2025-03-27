export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  isRunning: boolean;
  category: string;
  createdAt: number;
  completedAt?: number;
} 