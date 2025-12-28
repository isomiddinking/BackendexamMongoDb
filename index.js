const expess = require("express");
const {connect} = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = expess();

//middlewares
app.use(expess.json());
app.use(cors());
                            
//Database connection
async function connectDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("MangoDB ga ulandi ✅");
    } catch (error) {
        console.log('MangoDb ulanishda xatolik ❌', error.message);
    }
}
connectDB();


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Router-users
const {users} = require('./routes/userRoute');
app.use('/users', users)

// Router-products
const {product} = require('./routes/productRoute');
app.use('/products', product)

// Router-car
const { car } = require("./routes/CarRoute");
app.use('/car', car)

// Router-edu
const { edu } = require("./routes/eduRoute");
app.use('/edu', edu) 

// Router-house
const { House } = require("./routes/houseRoute");
app.use('/house', House) 

// Run code
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server ishga tushdi port http://localhost:${PORT}`));