import vehicles from "./vehicles/data";

export function onRequestGet() {
  return new Response("Vehicles API root works", { status: 200 });
}

export function onRequestPost(request) {
  const { id, model, year, price, engine, transmission } = request.json();
  const newVehicle = {
    id,
    model,
    year,
    price,
    engine,
    transmission,
  };
  vehicles.push(newVehicle);
  return Response.json(newVehicle);
}
