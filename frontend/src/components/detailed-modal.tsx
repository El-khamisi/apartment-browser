"use client";
import { getApartment } from "@/api";
import Image from "next/image";
import { useEffect, useState } from "react";

type Apartment = {
  id: string;
  name: string;
  building_number?: string;
  land_area: number;
  about?: string;
  address: string;
  price: number;
  created_at: string;
};

type ModalProps = {
  apartmentId: string;
  onClose: () => void;
};

export default function DetailedModal({ apartmentId, onClose }: ModalProps) {
  const [apartment, setApartment] = useState<Apartment | null>(null);

  const fetchApartment = async () => {
    const apartment = await getApartment(apartmentId);
    setApartment({
      ...apartment,
      created_at: new Date(apartment.created_at).toLocaleDateString(),
    });
  };
  useEffect(() => {
    fetchApartment();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white mx-2 p-6 rounded shadow-lg flex flex-col md:flex-row gap-10 sm:w-2/3 lg:w-2/4">
        <div>
          <h2 className="text-lg font-semibold mb-4">{apartment?.name}</h2>

          <p className="text-gray-700 text-sm leading-6 mb-4 line-clamp-6">
            {apartment?.address}
          </p>

          <p className="text-gray-700 text-sm leading-6 mb-4 line-clamp-6">
            {apartment?.building_number} | {apartment?.land_area}m
          </p>
          <p className="text-lg font-semibold mb-4">{apartment?.about}</p>
          <p className="text-2xl font-semibold mb-4">
            <span className="relative -top-2 font-medium text-base">$</span>
            {apartment?.price}
          </p>
          <p className="text-gray-700 text-sm leading-6 mb-4 line-clamp-6">
            Posted At: {apartment?.created_at}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
