import { User } from '../types';



const mockUsers: User[] = [
  {
    id: 1,
    name: "Luis",
    email: "admin@example.com",
    password: "Admin123",
    role: "admin",
    createdAt: "2024-01-10T12:00:00Z",
    updatedAt: "2025-01-20T15:30:00Z",
    lastLogin: "2025-01-25T08:15:00Z",
    isActive: true,
    phoneNumber: "+52 123 456 7890",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jose",
    email: "user@example.com",
    password: "User123",
    role: "usuario",
    createdAt: "2024-02-05T09:45:00Z",
    updatedAt: "2025-01-22T11:20:00Z",
    lastLogin: "2025-01-28T10:30:00Z",
    isActive: true,
    phoneNumber: "+52 987 654 3210",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Pedro",
    email: "operator@example.com",
    password: "Operator123",
    role: "operador",
    createdAt: "2024-03-15T14:20:00Z",
    updatedAt: "2025-01-18T16:45:00Z",
    lastLogin: "2025-01-27T07:00:00Z",
    isActive: false,
    phoneNumber: "+52 555 123 4567",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  }
];

export default mockUsers;
