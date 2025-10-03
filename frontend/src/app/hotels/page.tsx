"use client";

import {
  Box,
  Flex,
  Heading,
  Button,
  Spinner,
  Alert,
  Text,
} from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hotelApi } from "@/services/api";
import { Hotel, PaginatedResponse } from "@/types/types";
import { 
  SearchAndFilters, 
  HotelGrid, 
  HotelTable, 
  Pagination 
} from "@/components/hotels";
import { toaster } from "@/components/ui/toaster";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function HotelsPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const [data, setData] = useState<PaginatedResponse<Hotel> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // État pour le modal de confirmation
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    hotel: Hotel | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    hotel: null,
    isLoading: false,
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hotelApi.getHotels({
        page: currentPage,
        per_page: perPage,
        q: searchQuery,
        sort: sortBy,
        order: sortOrder,
      });
      setData(response);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Erreur lors du chargement des hôtels"
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [currentPage, perPage, searchQuery, sortBy, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); 
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(price));
  };

  const getHotelImage = (hotel: Hotel) => {
    if (hotel.first_picture?.url) {
      return hotel.first_picture.url;
    }
    if (hotel.pictures && hotel.pictures.length > 0) {
      return hotel.pictures[0].url;
    }
    return "/placeholder-hotel.svg"; 
   
  };

  const handleView = (hotel: Hotel) => {
    router.push(`/hotels/${hotel.id}`);
  };

  const handleEdit = (hotel: Hotel) => {
    router.push(`/hotels/${hotel.id}/edit`);
  };

  const handleDelete = (hotel: Hotel) => {
    setConfirmDialog({
      isOpen: true,
      hotel: hotel,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDialog.hotel) return;

    setConfirmDialog(prev => ({ ...prev, isLoading: true }));

    try {
      await hotelApi.deleteHotel(confirmDialog.hotel.id);
      await fetchHotels();
      
      toaster.create({
        title: "Succès",
        description: "Hôtel supprimé avec succès",
        type: "success",
        duration: 4000,
      });

      setConfirmDialog({
        isOpen: false,
        hotel: null,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Erreur lors de la suppression"
      toaster.create({
        title: "Erreur",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
      
      setConfirmDialog(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      hotel: null,
      isLoading: false,
    });
  };

  const renderPaginationButtons = () => {
    if (!data?.meta) return null;

    const { current_page, last_page } = data.meta;
    const buttons = [];

    buttons.push(
        <Button
          key="prev"
          variant="outline"
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
        >
          ◀ Précédent
        </Button>
    );

    for (let i = 1; i <= Math.min(last_page, 5); i++) {
      buttons.push(
        <Button
          key={i}
          colorScheme={i === current_page ? "teal" : undefined}
          variant={i === current_page ? "solid" : "outline"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    buttons.push(
        <Button
          key="next"
          variant="outline"
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
        >
          Suivant ▶
        </Button>
    );

    return buttons;
  };

  return (
    <Box p={8}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg"> Gestion des Hôtels</Heading>
        <Button
          colorScheme="teal"
          onClick={() => router.push('/hotels/new')}
          aria-label="Créer un nouvel hôtel"
          _focus={{
            boxShadow: "0 0 0 3px var(--chakra-colors-teal-200)"
          }}
        >
          <FaPlus style={{ marginRight: '8px' }} />
          Nouvel Hôtel
        </Button>
      </Flex>

      {/* Search & Filters */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(field, order) => {
          setSortBy(field);
          setSortOrder(order);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Loading State */}
      {loading && (
        <Flex justify="center" align="center" py={8}>
          <Spinner size="lg" color="teal.500" />
          <Text ml={4}>Chargement des hôtels...</Text>
        </Flex>
      )}

      {/* Error State */}
      {error && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erreur!</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {/* Affichage des hôtels */}
      {!loading && !error && data && (
        <>
          {viewMode === "grid" ? (
            <HotelGrid
              hotels={data.data}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getHotelImage={getHotelImage}
              formatPrice={formatPrice}
            />
          ) : (
            <HotelTable
              hotels={data.data}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getHotelImage={getHotelImage}
              formatPrice={formatPrice}
            />
          )}

          <Pagination
            data={data}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {/* Stats */}
          {data.meta && (
            <Text textAlign="center" mt={4} color="gray.600" fontSize="sm">
              Affichage de {data.meta.from} à {data.meta.to} sur {data.meta.total} hôtels
            </Text>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && data && data.data.length === 0 && (
        <Flex justify="center" align="center" py={12} direction="column" gap={4}>
          <Text fontSize="lg" color="gray.500">
            Aucun hôtel trouvé
          </Text>
          <Text fontSize="sm" color="gray.400">
            Essayez de modifier vos critères de recherche
          </Text>
        </Flex>
      )}

      {/* Modal de confirmation de suppression */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'hôtel"
        description={`Êtes-vous sûr de vouloir supprimer l'hôtel "${confirmDialog.hotel?.name}" ? Cette action est irréversible et supprimera définitivement toutes les données associées à cet hôtel.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        isLoading={confirmDialog.isLoading}
      />
    </Box>
  );
}
