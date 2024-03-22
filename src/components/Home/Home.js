import React, { useEffect, useState } from 'react'
import {Grid,Stack,Card,CardContent,Typography,Pagination,Box,Divider} from '@mui/material';
import WidgetCard  from './WidgetCard/WidgetCard'

import SearchBar from './SearchBar/SearchBar';
import { fetchAllWidgets, fetchWidgetByName } from '../../services/widgetService';

const WidgetList = () => {
  const [widgets, setWidgets] = useState([])
  const [displayOrder,setDisplayOrder]=useState(false);
  const [searchText,setSearchText]=useState("");
  // Pagination state
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
    pageSize: 2 // You can set default page size here
});

  useEffect(() => {
    fetchWidgetByName(searchText,paginationData.currentPage-1,paginationData.pageSize,displayOrder)
    .then((data)=>{
      const { content, totalPages, totalElements,pageNumber } = data;
      setWidgets(content)
    
      setPaginationData({
        ...paginationData,
        totalPages: totalPages,
        totalElements: totalElements
    });
    })
      .catch((error) => console.error('Error fetching widgets', error))
  },[paginationData.currentPage,searchText])

  const onOrderChange = ()=>{
    setDisplayOrder((prev) => !prev);
  }
  const onSearch=(text)=>{
    setSearchText(text);
  }

  // Pagination event handler
  const handleChangePage = (event, newPage) => {

    setPaginationData({
      ...paginationData,
      currentPage:newPage,
  });
  };

  return (
    <Box mx="auto" my={10} width="80%">
      <Box width={"100%"} mb={3}>
        <SearchBar searchText={searchText} displayOrder={displayOrder} onSearch={onSearch} onOrderChange={onOrderChange}/>      
        <Divider style={{ margin: '8px 0', height: '1px', backgroundColor: '#ccc' }} variant="fullWidth" color="black"  />

      </Box>
      <Grid container spacing={2}>
        {widgets.length==0 && (
        <Box display="flex" justifyContent="center" width={'100%'} style={{ marginTop: '20px' }}>
            <Typography  variant='h3'>Could not find elements</Typography>
          </Box>
        )}
        {widgets.map((widget,index) => (
          <WidgetCard key={index} widget={widget} ></WidgetCard>
        ))}
      </Grid>
      {/* Pagination component */}
      {widgets.length>0 && 
      <Pagination
        count={paginationData.totalPages}
        page={paginationData.currentPage}
        onChange={handleChangePage}
        style={{ marginTop: '20px' }}
      />
    }
    </Box>
  );
}

export default WidgetList
