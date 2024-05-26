export interface UserType {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Estate {
  _id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: 'buy' | 'rent';
  property: 'apartment' | 'house' | 'condo' | 'land';
  createdAt?: string;
  updatedAt?: string;
  isSaved?: boolean;
  user: {
    _id: string,
    username: string,
    avatar: string,
  },
  postdetail: {
    _id: string,
    desc: string;
    utilities: string;
    pet: string;
    income: string;
    size: number;
    school: number;
    bus: number;
    restaurant: number;
  }
}

export interface EstateRaw {
  _id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: 'buy' | 'rent';
  property: 'apartment' | 'house' | 'condo' | 'land';
  createdAt?: string;
  updatedAt?: string;
  isSaved?: boolean;
  user: string;
  postdetail: string;
}

export interface ChatType {
  _id: string;
  messages: string[];
  participants: UserType[];
  post: string;
  seenBy: string[];
  latestMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageType {
  chatId: string;
  text: string;
  sender: string;
  createdAt: string;
}