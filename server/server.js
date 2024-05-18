const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const shopRoutes=require('./routes/shopRoutes');
const productRoutes=require('./routes/productRoutes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes); // Use shop routes
app.use('/api/products',productRoutes)
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

