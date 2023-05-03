import express from "express";

// Routers import
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express()
// Receive JSON
app.use(express.json())
// Send Info through the URL
app.use(express.urlencoded({ extended: true }))

// Home
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Routers
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

// Initialize the server on port 8080
app.listen(8080, () => {
  console.log("Open server on port 8080");
});

