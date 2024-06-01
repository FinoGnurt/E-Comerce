import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";

import { Container, Box, Typography, CircularProgress } from "@mui/material";
import VerticalCard from "../components/verticalCard/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <Container maxWidth="lg">
      {loading && (
        <Box textAlign="center" my={3}>
          <CircularProgress />
          <Typography variant="body1">Loading...</Typography>
        </Box>
      )}

      <Typography variant="h6" my={3}>
        Search Results: {data.length}
      </Typography>

      {data.length === 0 && !loading && (
        <Box bgcolor="white" textAlign="center" p={3} borderRadius={1}>
          <Typography variant="body1">No Data Found....</Typography>
        </Box>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </Container>
  );
};

export default SearchProduct;
