import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Typography, Button, Box } from '@mui/material';
import ProductList from './components/ProductList';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseTime, setResponseTime] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const start = Date.now();

      const response = await axios.get('http://localhost:3003/products');
      const end = Date.now();

      setProducts(response.data);
      setResponseTime(end - start);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth={false} className="App" style={{ backgroundColor: '#EAEAEA' }}>
      <ToastContainer />
      <Typography variant="h3" component="h1" gutterBottom>Product List</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Response Time: {responseTime} ms</Typography>
            <Button
              variant="contained"
              onClick={fetchProducts}
              sx={{ marginTop: '10px', textTransform: 'none', backgroundColor: '#000000', color: 'white', '&:hover': { backgroundColor: '#e64a19' } }}
            >
              Reload Products
            </Button>
          </Box>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
}

export default App;