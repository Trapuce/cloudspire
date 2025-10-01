import { useState, useEffect } from "react";
import { hotelApi } from "@/services/api";
import { Hotel, PaginatedResponse } from "@/types/hotel";

interface UseHotelsParams {
  page?: number;
  per_page?: number;
  q?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export const useHotels = (params: UseHotelsParams = {}) => {
  const [data, setData] = useState<PaginatedResponse<Hotel> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hotelApi.getHotels(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [params.page, params.per_page, params.q, params.sort, params.order]);

  return {
    data,
    loading,
    error,
    refetch: fetchHotels,
  };
};
