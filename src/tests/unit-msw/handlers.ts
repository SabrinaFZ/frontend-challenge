import { http, HttpResponse } from "msw";
import { Car } from "@/types/car";
import { Workshop } from "@/types/workshop";
import { carFixtures, workshopFixtures } from "./fixtures";

// Each test starts with a fresh copy of the fixtures so write operations
// (POST/PUT/DELETE) are isolated. resetDb() is invoked in setup.ts before
// every test.
let cars: Car[] = [];
let workshops: Workshop[] = [];

export const resetDb = () => {
  cars = carFixtures.map((c) => ({ ...c }));
  workshops = workshopFixtures.map((w) => ({ ...w }));
};

export const handlers = [
  http.get("/api/cars", () => HttpResponse.json(cars)),

  http.get("/api/cars/:id", ({ params }) => {
    const car = cars.find((c) => c.id === params.id);
    if (!car) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(car);
  }),

  http.post("/api/cars", async ({ request }) => {
    const body = (await request.json()) as Omit<Car, "id">;
    const created: Car = { id: String(cars.length + 1), ...body };
    cars.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put("/api/cars/:id", async ({ params, request }) => {
    const body = (await request.json()) as Car;
    const index = cars.findIndex((c) => c.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    cars[index] = { ...body, id: String(params.id) };
    return HttpResponse.json(cars[index]);
  }),

  http.delete("/api/cars/:id", ({ params }) => {
    const index = cars.findIndex((c) => c.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const [removed] = cars.splice(index, 1);
    return HttpResponse.json(removed);
  }),

  http.get("/api/workshops", () => HttpResponse.json(workshops)),

  http.get("/api/workshops/:id", ({ params }) => {
    const workshop = workshops.find((w) => w.id === params.id);
    if (!workshop) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(workshop);
  }),
];
