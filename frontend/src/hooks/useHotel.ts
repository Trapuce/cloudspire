import { useState, useEffect } from "react";
import { hotelApi } from "@/services/api";
import { Hotel } from "@/types/hotel";

export const useHotel = (id: number) => {
  const [data, setData] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await hotelApi.getHotel(id);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchHotel,
  };
};
