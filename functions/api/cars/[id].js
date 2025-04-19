import cars from "./data.js";

export function onRequestGet(context) {
  const id = context.params.id;

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const car = cars.find((car) => car.id === id);

  if (!car) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(car);
}

export async function onRequestPut({ request, params }) {
  const id = params.id;
  const { model, year, price, engine, transmission } = await request.json();
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) {
    return Response.json({ error: "car not found" }, { status: 404 });
  }
  cars[carIndex] = {
    id,
    model,
    year,
    price,
    engine,
    transmission,
  };
  return Response.json(cars[carIndex]);
}

export function onRequestDelete({ params }) {
  const id = params.id;
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) {
    return Response.json({ error: "Car not found" }, { status: 404 });
  }
  const deletedCar = cars.splice(carIndex, 1);
  return Response.json(deletedCar[0]);
}
