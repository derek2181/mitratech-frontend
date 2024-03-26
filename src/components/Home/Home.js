import React, { useEffect, useState } from 'react'
import {Grid,Stack,Card,CardContent,Typography,Pagination,Box,Divider,Accordion,AccordionSummary,AccordionDetails} from '@mui/material';
import WidgetCard  from './WidgetCard/WidgetCard'

import SearchBar from './SearchBar/SearchBar';
import { fetchAllWidgets, fetchWidgetByName } from '../../services/widgetService';
import AddWidgetForm from './AddWidgetForm/AddWidgetForm';
import AddIcon from '@mui/icons-material/Add';

const WidgetList = () => {
  //Widget elements
  const [widgets, setWidgets] = useState([])
  //Modal state
  
  // Pagination state
  const [paginationData, setPaginationData] = useState({
    searchText:"",
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
    sort:false,
    pageSize: 4 // You can set default page size here
});

//Accordion state
const [expanded, setExpanded] = useState(false);

  const handleAccordionClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const onResetWidgetsAndPagination=()=>{
    setPaginationData({
      searchText:"",
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      sort:false,
      pageSize: 4
    })
   fetchData('',1,4,false);
    
  }
  const fetchData=(searchText,currentPage,pageSize,sort)=>{
    fetchWidgetByName(paginationData.searchText,paginationData.currentPage-1,
      paginationData.pageSize,paginationData.sort)
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
  }
  useEffect(() => {
    fetchData(paginationData.searchText,paginationData.currentPage-1,
      paginationData.pageSize,paginationData.sort);
    
  },[paginationData.currentPage,paginationData.searchText,paginationData.sort])

  const onOrderChange = ()=>{
    setPaginationData((prev)=>({
      ...paginationData,
    sort:!prev.sort,
    currentPage:1,
    }));
  }
  const onSearch=(text)=>{
    setPaginationData({
      ...paginationData,
      searchText:text,
      currentPage:1,
  });
  }

  // Pagination event handler
  const handleChangePage = (event, newPage) => {

    setPaginationData({
      ...paginationData,
      currentPage:newPage,
  });
  };

  return (
    <Box mx="auto" my={10} width="80%" pb={10} >
      <Box width={"100%"} mb={3}>
        <SearchBar searchText={paginationData.searchText} displayOrder={paginationData.sort} onSearch={onSearch} onOrderChange={onOrderChange}/>      
        <Divider style={{ margin: '20px 0', height: '1px', backgroundColor: '#ccc' }} variant="fullWidth" color="black"  />

        <Accordion expanded={expanded} onChange={handleAccordionClick}>
      <AccordionSummary
        expandIcon={<AddIcon />}
        aria-controls="add-element-content"
        id="add-element-header"
      >
        <Typography>Add Widget</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <AddWidgetForm onResetWidgetsAndPagination={onResetWidgetsAndPagination}></AddWidgetForm>
      </AccordionDetails>
    </Accordion>

        <Divider style={{ margin: '20px 0', height: '1px', backgroundColor: '#ccc' }} variant="fullWidth" color="black"  />

      </Box>
      <Grid container spacing={2}>
        {widgets.length==0 && (
        <Box display="flex" justifyContent="center" width={'100%'} style={{ marginTop: '20px' }}>
            <Typography  variant='h3'>Could not find elements</Typography>
          </Box>
        )}
        {widgets.map((widget) => (
          <WidgetCard key={widget.name} widget={widget} setWidgets={setWidgets} ></WidgetCard>
        ))}
      </Grid>
      {/* Pagination component */}
      {widgets.length>0 && 
      <Box display="flex" justifyContent="center" width={'100%'} style={{ marginTop: '20px' }}>

      
      <Pagination
        count={paginationData.totalPages}
        page={paginationData.currentPage}
        onChange={handleChangePage}
        style={{ marginTop: '20px' }}
      />
      </Box>
    }
    </Box>
  );
}

export default WidgetList
