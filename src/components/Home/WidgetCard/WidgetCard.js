import React, { useState } from 'react'
import {Card,CardContent,Grid,Stack,Typography,Button,Box} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from '../../reusable/CustomModal';
import { deleteWidgetByName, updateWidgetByName } from '../../../services/widgetService';
const WidgetCard = ({ widget,setWidgets }) => {

  const  {description,name,price }=widget;
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [handleProceed,setHandleProceed]=useState(null)
  //Handle edition
  const handleEditClick = () => {
    setActionType('edit');
    setHandleProceed(()=>handleUpdate);
    setModalOpen(true)
  };

  const handleDeleteClick = () => {
    setActionType('delete');
    setHandleProceed(()=>handleDelete);
    setModalOpen(true)

  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setHovered(false)
  };
 
  const handleUpdate=(data)=>{
    console.log(data)
     //TODO call API again to make sure to pull the most updated data
    updateWidgetByName(name,{price:data.price,description:data.description})
    .then((data)=>{
      handleCloseModal()
      setWidgets(prevWidgets =>
        prevWidgets.map(item =>
          item.name === data.result.name ? { ...item, ...data.result } : item
        )
      );
    })
      .catch((error) => console.error('Error fetching widgets', error))
  }
  const handleDelete=()=>{
    deleteWidgetByName(name)
    .then((data)=>{
      handleCloseModal()
      setWidgets(prevWidgets =>
        prevWidgets.filter(widget =>
          widget.name !== name
        )
      );
    })
      .catch((error) => console.error('Error fetching widgets', error))
  }

  return (
    <Grid item xs={12} sm={6} md={3} > 
      <Card sx={{cursor:'pointer'}}  onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      >
        <CardContent sx={{position:'relative'}}>
          
          <Stack spacing={2}>
            <Typography component="div" variant="h5" textAlign={'center'}>
              {name}
            </Typography>
            <Typography color="text.secondary" variant="body2" fontSize={"0.7rem"}>
              {description}
            </Typography>
            <Typography component="div" gutterBottom variant="p" color={'green'} fontSize={"0.8rem"} textAlign={'right'}>
              ${price}
            </Typography>
          </Stack>
          {hovered && (
        <Box  display={'flex'}  position={'absolute'} left={'0'} top={'0'} width={'100%'} height={'100%'}>
          <Button variant="contained"  onClick={handleEditClick} sx={{ bgcolor: '#37D330', transition: 'background-color 0.3s', color: 'white',width:'100%', '&:hover': { bgcolor: '#3DEF35' } }} startIcon={<EditIcon />}>Edit</Button>
          <Button variant="contained" onClick={handleDeleteClick} sx={{ bgcolor: '#930505', transition: 'background-color 0.3s', color: 'white',width:'100%','&:hover': { bgcolor: '#AB0707' } }} startIcon={<DeleteIcon />}>Delete</Button>
        </Box>
      )}
        </CardContent>
        <CustomModal open={modalOpen} handleClose={handleCloseModal} actionType={actionType} data={{name:name,price:price,description:description}} handleAction={handleProceed} />

      </Card>
  </Grid>)
}

export default WidgetCard
