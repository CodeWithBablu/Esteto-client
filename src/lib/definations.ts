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
  user: string;
  postdetail: string;
}
