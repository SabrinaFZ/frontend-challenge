export function onRequestGet() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
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
