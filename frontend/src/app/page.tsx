"use client";
import Card from "@/components/card";
import DetailedModal from "@/components/detailed-modal";
import { listApartment } from "@/api";
import { BASEURL } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

type Apartment = {
  id: string;
  name: string;
  land_area: number;
  price: number;
};

type ListRes = {
  meta: {};
  data: Apartment[];
};

export default function Home() {
  const [apartments, setApartments] = useState<ListRes | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const aparts = await listApartment();
    setApartments(aparts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100  text-black">
      <header className="bg-white shadow ">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center">
            Product Listing Page
          </h1>
        </div>
      </header>

      <main className="container  mx-auto px-4 py-8">
        {/* <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} /> */}

        {isLoading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : apartments?.data.length === 0 ? (
          <div className="text-center text-gray-500">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apartments?.data.map((apartment) => (
              <Card
                apartment={apartment}
                onSelect={() => {
                  setSelectedProductId(apartment.id);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {selectedProductId && (
        <DetailedModal
          apartmentId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
}
