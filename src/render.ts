fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => console.log("Productos:", data))
  .catch((err) => console.error("Error:", err));
