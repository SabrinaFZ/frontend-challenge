import axios from "axios";
import { useCallback, useState } from "react";

export const useAdd = () => {
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
        await axios.post("http://localhost:3001/data", formData);

        return true;
      } catch (error) {
        console.error("Error submitting form:", error);
        return false;
      }
    },
    [formData]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};
