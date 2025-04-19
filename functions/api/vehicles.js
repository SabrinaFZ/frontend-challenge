import vehicles from "./vehicles/data.js";

export function onRequestGet() {
  return Response.json(vehicles);
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
