import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';

function Product({ product }) {
  const addToCart = () => {
    fetch('http://localhost:3002/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: '66671dc97b7c339804db4fd5', productId: product._id, quantity: 1 }),
    })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        toast.success(`Item added to cart admin.`);
      } else {
        toast.error('Failed to add item to cart.');
      }
    })
    .catch(error => {
      toast.error('Error adding item to cart.');
    });
  };

  return (
    <Card style={{ margin: '20px', width: '345px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="150"
        image={product.pict}
        title={product.name}
        style={{ objectFit: 'cover' }}
      />
      <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
            ${product.price}
          </Typography>
          <Button
            variant="contained"
            onClick={addToCart}
            sx={{ marginTop: '10px', textTransform: 'none', backgroundColor: '#000000', color: 'white', '&:hover': { backgroundColor: '#e64a19' } }}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;