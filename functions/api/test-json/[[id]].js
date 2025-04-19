import vehicles from "./data.js";

export function onRequestGet(context) {
  const id = context.params.id;

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const vehicle = vehicles.find((vehicle) => vehicle.id === id);

  if (!vehicle) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify(vehicle), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
/* 
export function onRequestPut(request) {
  const { id, model, year, price, engine, transmission } = request.json();
  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);
  if (vehicleIndex === -1) {
    return Response.json({ error: "Vehicle not found" }, { status: 404 });
  }
  vehicles[vehicleIndex] = {
    id,
    model,
    year,
    price,
    engine,
    transmission,
  };
  return Response.json(vehicles[vehicleIndex]);
}

export function onRequestDelete(request) {
  const { id } = request.json();
  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);
  if (vehicleIndex === -1) {
    return Response.json({ error: "Vehicle not found" }, { status: 404 });
  }
  const deletedVehicle = vehicles.splice(vehicleIndex, 1);
  return Response.json(deletedVehicle[0]);
}
 */
