export interface Event {
  _id: string;
  slug: string;

  // 1st
  title: string;
  tagline: string;
  eventCover: string;

  // 2nd
  description: string;
  startDate?: string;

  // 3rd
  timeline: { date?: string; title?: string; description: string }[];

  // 4th
  speakers: { slug?: string; image?: string; name?: string; about: string }[];

  // 5th
  prizes: {
    amount?: string;
    description?: string;
    asset?: string;
    sponsor?: string;
  }[];

  isCompleted: boolean;
}

export interface User {
  name: string;
  email: string;
  phoneNumber: number;
  feedback: string;
  slug: string;
}
