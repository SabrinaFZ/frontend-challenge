import vehicles from "./vehicles/data.js";

export function onRequestGet() {
  return Response.json(vehicles);
}

export async function onRequestPost({ request }) {
  const { model, year, price, engine, transmission } = await request.json();

  const id =
    vehicles.length > 0 ? Math.max(...vehicles.map((v) => +v.id)) + 1 : 1;

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
