import { useState } from 'react';
import { Card, CardContent, Stack, Typography, Button, Modal,Box,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Reusable Modal Component
const CustomModal = ({ open, handleClose,handleAction,data, actionType }) => {
    const [formData, setFormData] = useState({name:data.name, price: data.price, description: data.description });
    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
          ...prevState,
          [field]: value
        }));
      };
  return (
    <Modal open={open} onClose={handleClose}  >
        <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>

        
      <Card  sx={{width:'400px', height:'400px'}}>
        <Stack>
        <CardContent sx={{height:'300px'}}>
          {actionType === 'edit' ? (
            <>
              {/* Edit Modal Content */}
              <Typography variant='h5' textAlign={'center'}>Edit widget</Typography>
              <Box display={'flex'} sx={{flexDirection:'column'}}  height={'100%'} justifyContent={'space-evenly'} alignItems={'center'}>
              <TextField
                    label="Name"
                    value={formData.name}
                    disabled
                />
                <TextField
                    label="Price"
                    value={parseFloat(formData.price)}
                    type="number"
                    onChange={e => handleInputChange('price', e.target.value)}
                />
                <TextField
                    label="Description"
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                />
           </Box>
            </>
          ) : (
            <>
            <Typography variant='h5' textAlign={'center'}>Delete widget</Typography>
            
             <Box display={'flex'} flexDirection={'column'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
             <Typography variant='h5' textAlign={'center'}> Widget: {formData.name}</Typography>
             <Typography variant='p' textAlign={'center'}>Are you sure that you want to delete this widget? This deletion can be undone</Typography>
             </Box>
            </>
          )}
            
        </CardContent>
        <Box display={'flex'} height={'100px'} width={'100%'} justifyContent={'space-between'} alignItems={'end'} p={2}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant='contained'  onClick={()=>handleAction({price:formData.price,description:formData.description})}>Proceed</Button>
        </Box>
        </Stack>
      </Card>
      </Box>
    </Modal>
  );
};

export default CustomModal;

