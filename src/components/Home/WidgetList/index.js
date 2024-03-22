import React, { useEffect, useState } from 'react'
import {Grid,Stack,Card,CardContent,Typography,Pagination,Box,Divider} from '@mui/material';
import WidgetCard  from '../WidgetCard'
import { fetchAllWidgets } from '../../../lib/apiConnect'
import SearchBar from '../SearchBar/SearchBar';

const WidgetList = () => {
  const [widgets, setWidgets] = useState([])
  const [displayOrder,setDisplayOrder]=useState(true);
  const [searchText,setSearchText]=useState("");
  
  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error('Error fetching widgets', error))
  }, [])

  const onOrderChange = ()=>{
    setDisplayOrder((prev) => !prev);
  }
  const onSearch=(text)=>{
    setSearchText(text);
    console.log(searchText);
  }
  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(widgets.length / itemsPerPage);

  // Pagination event handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate which data to display based on the current page
  const startIndex = (page - 1) * itemsPerPage;
  //const visibleWidgets= widgets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box mx="auto" my={10} width="80%">
      <Box width={"100%"} mb={3}>
        <SearchBar searchText={searchText} displayOrder={displayOrder} onSearch={onSearch} onOrderChange={onOrderChange}/>      
        <Divider style={{ margin: '8px 0', height: '1px', backgroundColor: '#ccc' }} variant="fullWidth" color="black"  />

      </Box>
      <Grid container spacing={2}>
        {widgets.map((widget,index) => (
          <WidgetCard key={index} widget={widget} ></WidgetCard>
        ))}
      </Grid>
      {/* Pagination component */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: '20px' }}
      />
    </Box>
  );
}

export default WidgetList
