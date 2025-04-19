import vehicles from "./vehicles/data.js";

export function onRequestGet() {
  return Response.json(vehicles);
}

export async function onRequestPost({ request }) {
  const { model, year, price, engine, transmission } = await request.json();

  // generates a 6-digit number
  const id = Math.floor(100000 + Math.random() * 900000);

  const newVehicle = {
    id: id.toString(),
    model,
    year,
    price,
    engine,
    transmission,
  };
  vehicles.push(newVehicle);
  return Response.json(newVehicle);
}
