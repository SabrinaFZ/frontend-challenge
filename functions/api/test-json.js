import vehicles from "./vehicles/data.js";

export function onRequestGet() {
  return new Response(JSON.stringify(vehicles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
