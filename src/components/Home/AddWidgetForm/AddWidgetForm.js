
import React, { useState } from 'react';
import { Button,TextField,Typography,Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./AddWidgetForm.css"
import { addWidget } from '../../../services/widgetService';
const AddWidgetForm = ({onResetWidgetsAndPagination})=>{

    return (
        <>
            <Typography my={2}  variant='h5' textAlign={'center'}>Add widget</Typography>
          <Formik
            initialValues={{
              name: '',
              description: '',
              price: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters')
                .max(100, 'Name must be at most 100 characters'),
              description: Yup.string()
                .required('Description is required')
                .min(5, 'Description must be at least 5 characters')
                .max(1000, 'Description must be at most 1000 characters'),
              price: Yup.number()
                .required('Price is required')
                .min(1, 'Price must be at least 1')
                .max(20000, 'Price must be up to 20000')
                .typeError('Price must be a number')
                .test('decimal-places', 'Price must have up to two decimal places', (value) => {
                    if (!value) return true; // Skip validation if value is empty
                    const regex = /^\d+(\.\d{1,2})?$/; // Regex for up to two decimal places
                    return regex.test(value.toString());
                  }),
            })}
            onSubmit={(values,{setSubmitting,resetForm }) => {
                setSubmitting (true)
                addWidget(values)
                .then((response)=>{
                    onResetWidgetsAndPagination();
                    resetForm();
                    console.log("Submitting Widget")
                })    
                  .catch((error) => console.error('Error fetching widgets', error))
                  .finally(()=>{
                    setSubmitting (false)
                  })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={5}>
                  <Field
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    helperText={<ErrorMessage name="name" className='error-message'  />}
                  />
                </Box>
                <Box mb={5}>
                  <Field
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    helperText={<ErrorMessage name="description" className='error-message'  />}
                  />
                </Box>
                <Box mb={5}>
                <Field
                as={TextField}
                label="Price"
                variant="outlined"
                fullWidth
                type="text" // Change type to text
                name="price"
                helperText={<ErrorMessage name="price" className='error-message' />}
                    />
                </Box>
                <Box sx={{display:"flex",justifyContent:'center'}}>
                <Button type="submit"  variant="contained" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>      
                </Box>
              </Form>
            )}
          </Formik>
        </>
      );
    };

    export default AddWidgetForm;
