"use client";

import Slider from "./slider";

type Apartment = {
  id: string;
  name: string;
  land_area: number;
  images: string[];
  price: number;
};

type CardProps = {
  apartment: Apartment;
  onSelect: () => void;
};

export default function Card({ apartment, onSelect }: CardProps) {
  return (
    <div
      key={apartment.id}
      className="bg-white border max-h-full p-4 rounded shadow  h-full flex flex-col"
    >
      <div className="flex flex-col justify-between  flex-grow">
        <div>
          <Slider>
            {apartment.images.map((img, i) => (
              <img key={i} src={img} />
            ))}
          </Slider>
          <h2 className="text-base line-clamp-1 font-medium mt-2">
            {apartment.name}
          </h2>
          <p className="text-sm	italic">Land Area: {apartment.land_area}m</p>
          <p className="text-lg font-semibold mt-2">
            <span className="relative -top-1 font-medium text-sm">$</span>
            {apartment.price}
          </p>
        </div>
        <button
          onClick={() => onSelect()}
          className="text-sm font-medium mt-2 px-4 py-2 bg-yellow-300 text-black hover:bg-yellow-400 rounded-lg w-fit"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
