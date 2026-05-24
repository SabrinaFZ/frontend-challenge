import { Car } from "@/types/car";
import { Workshop } from "@/types/workshop";

export const carFixtures: Car[] = [
  {
    id: "1",
    model: "Golf",
    year: "2020",
    price: "20000",
    engine: "1.5L TSI",
    transmission: "Manual",
  },
  {
    id: "2",
    model: "Passat",
    year: "2022",
    price: "32000",
    engine: "2.0L TDI",
    transmission: "Automatic",
  },
  {
    id: "3",
    model: "Polo",
    year: "2019",
    price: "15000",
    engine: "1.0L TSI",
    transmission: "Manual",
  },
];

export const workshopFixtures: Workshop[] = [
  {
    id: "1",
    name: "VW Center Berlin",
    location: "Berlin, Germany",
    phone: "+49 30 1234567",
  },
  {
    id: "2",
    name: "VW Center Munich",
    location: "Munich, Germany",
    phone: "+49 89 7654321",
  },
];
