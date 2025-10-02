import axios from "axios";
import { Hotel, HotelFormData, HotelPicture, PaginatedResponse, ApiResponse } from "@/types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const hotelApi = {
  // Get all hotels with pagination and search
  getHotels: async (params?: {
    page?: number;
    per_page?: number;
    q?: string;
    sort?: string;
    order?: "asc" | "desc";
  }): Promise<PaginatedResponse<Hotel>> => {
    const response = await api.get("/hotels", { params });
    return response.data;
  },

  // Get a single hotel by ID
  getHotel: async (id: number): Promise<ApiResponse<Hotel>> => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  },

  // Create a new hotel
  createHotel: async (data: HotelFormData): Promise<ApiResponse<Hotel>> => {
    const response = await api.post("/hotels", data);
    return response.data;
  },

  // Update a hotel
  updateHotel: async (id: number, data: Partial<HotelFormData>): Promise<ApiResponse<Hotel>> => {
    const response = await api.put(`/hotels/${id}`, data);
    return response.data;
  },

  deleteHotel: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/hotels/${id}`);
    return response.data;
  },

 
  uploadPicture: async (hotelId: number, file: File): Promise<ApiResponse<HotelPicture>> => {
    const formData = new FormData();
    formData.append("picture", file);
    
    const response = await api.post(`/hotels/${hotelId}/pictures`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updatePicturePosition: async (
    hotelId: number,
    pictureId: number,
    position: number
  ): Promise<ApiResponse<HotelPicture>> => {
    const response = await api.patch(`/hotels/${hotelId}/pictures/${pictureId}`, {
      position,
    });
    return response.data;
  },

  // Upload multiple pictures for a hotel
  uploadMultiplePictures: async (hotelId: number, files: File[]): Promise<ApiResponse<HotelPicture[]>> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("pictures[]", file);
    });
    
    const response = await api.post(`/hotels/${hotelId}/pictures/multiple`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete a picture
  deletePicture: async (hotelId: number, pictureId: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/hotels/${hotelId}/pictures/${pictureId}`);
    return response.data;
  },
};

export default api;
