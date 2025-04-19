import { useAppContext } from "@/context/useAppContext";
import { Car } from "@/types/car";
import axios from "axios";
import { useCallback, useState } from "react";

export const useAdd = () => {
  const { add } = useAppContext();
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    price: "",
    engine: "",
    transmission: "",
  });

  const isFormValid = useCallback(() => {
    const { model, year, price, engine, transmission } = formData;
    return !!(model && year && price && engine && transmission);
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post<Car>("/api/vehicles", formData);

        setFormData({
          model: "",
          year: "",
          price: "",
          engine: "",
          transmission: "",
        });

        add(response.data);

        return true;
      } catch (error) {
        console.error("Error submitting form:", error);
        return false;
      }
    },
    [formData, add]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};
