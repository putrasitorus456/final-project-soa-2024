import React from 'react';
import Grid from '@mui/material/Grid';
import Product from './Product';

function ProductList({ products }) {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;