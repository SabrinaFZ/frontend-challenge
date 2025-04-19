import cars from "./cars/data.js";

export function onRequestGet() {
  return Response.json(cars);
}

export async function onRequestPost({ request }) {
  const { model, year, price, engine, transmission } = await request.json();

  // generates a 6-digit number
  const id = Math.floor(100000 + Math.random() * 900000);

  const newCar = {
    id: id.toString(),
    model,
    year,
    price,
    engine,
    transmission,
  };
  cars.push(newCar);
  return Response.json(newCar);
}
