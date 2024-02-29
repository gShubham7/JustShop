import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  return (
    <Grid container spacing={2} py={5}>
      <Grid item xs={6} sm={4} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <ProductCard />
      </Grid>
    </Grid>
  );
};

export default AllProducts;
