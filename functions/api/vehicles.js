export function onRequestGet() {
  return Response.json({ success: true });
}

/* export function onRequestPost(request) {
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
 */
