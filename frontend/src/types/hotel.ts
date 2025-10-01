export interface HotelPicture {
  id: number;
  hotel_id: number;
  filepath: string;
  filesize: number;
  position: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: number;
  name: string;
  address1: string;
  address2?: string;
  zipcode: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  description?: string;
  max_capacity: number;
  price_per_night: number;
  pictures?: HotelPicture[];
  first_picture?: HotelPicture;
  created_at: string;
  updated_at: string;
}

export interface HotelFormData {
  name: string;
  address1: string;
  address2?: string;
  zipcode: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  description?: string;
  max_capacity: number;
  price_per_night: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
