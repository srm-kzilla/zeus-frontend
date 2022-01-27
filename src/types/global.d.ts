export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDate?: string;
  speaker?: any[];
  eventCover: string;
  isCompleted: boolean;
}

export interface User {
  name: string;
  email: string;
  phoneNumber: number;
  feedback: string;
  slug: string;
}
