import { useAppContext } from "@/context/useAppContext";
import { Car } from "@/types/car";
import axios from "axios";
import { useCallback, useState } from "react";

export const useUpdate = (car: Car) => {
  const { update } = useAppContext();
  const [formData, setFormData] = useState(car);

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
    async (e: React.FormEvent, id: string) => {
      e.preventDefault();
      try {
        const response = await axios.put<Car>(
          `http://localhost:3001/data/${id}`,
          formData
        );

        update(id, response.data);

        return true;
      } catch (error) {
        console.error("Error submitting form:", error);
        return false;
      }
    },
    [formData, update]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};
