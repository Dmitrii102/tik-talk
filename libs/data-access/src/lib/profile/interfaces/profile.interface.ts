export interface Profile {
  firstName: string;
  id: number;
  username: string;
  description: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
}
