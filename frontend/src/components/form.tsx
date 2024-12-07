import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { postApartment, uploadImages } from "@/api";

type Apartment = {
  name: string;
  building_number?: string;
  land_area: number;
  about?: string;
  address: string;
  images: string[];
  price: number;
};

export default function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apartmentBody, setApartmentBody] = useState<Apartment>({
    name: "",
    building_number: "",
    land_area: 0,
    about: "",
    address: "",
    images: [],
    price: 0,
  });
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
    }
  };

  const handleChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setApartmentBody({
      ...apartmentBody,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageUrls = await uploadImages(images);

    const respone = await postApartment({
      ...apartmentBody,
      images: imageUrls,
    });

    if (respone?.ok) {
      window.location.reload();
    }

    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-between">
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Full Name
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="e.g. Apartment#8542"
            name="name"
            value={apartmentBody.name}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Building Number
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="e.g. 22A"
            name="building_number"
            value={apartmentBody.building_number}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Land Area
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="153"
            name="land_area"
            value={apartmentBody.land_area}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Address
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="e.g. Paris, France"
            name="address"
            value={apartmentBody.address}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="justify-content-between">
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Price
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="153"
            name="price"
            value={apartmentBody.price}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Images
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="file"
            multiple
            name="images"
            onChange={handleImageChange}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Form.Label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            About
          </Form.Label>
          <Form.Control
            className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            as="textarea"
            rows={5}
            placeholder="Write some details about the property ...."
            name="about"
            value={apartmentBody.about}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
