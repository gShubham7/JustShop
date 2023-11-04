require("dotenv").config();

const expres = require("express");
const cors = require("cors");
// const UserRoute = require("./routes/user.routes");
// const ProductRoute = require("./routes/product.routes");
// const CartRoute = require("./routes/cart.routes");
// const OrderRoute = require("./routes/order.routes");
const pool = require("./config/db");
const app = expres();
const port = process.env.PORT;
app.use(cors());
app.use(expres.json());
// app.use('/user',UserRoute)
// app.use('/product',ProductRoute)
// app.use('/cart',CartRoute)
// app.use('/order',OrderRoute)

app.get("/", async (req, res) => {
  res.send("welcome to home page");
});

// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *",
//       [description]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

app.listen(port, async () => {
  console.log(`listening on http://localhost:${port}`);
});
