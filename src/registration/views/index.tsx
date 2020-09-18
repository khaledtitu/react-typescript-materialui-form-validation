import React, { useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import {FormValues, FormIStatus, FormIStatusProps} from '../types/registration';
import { Formik, Form, FormikProps } from 'formik';
import {validationRules} from  '../validation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        '& > *': {
          margin: theme.spacing(5),
        },
    },
    center: {
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '90%',
        marginX: '20px', 
    },
    FormControl: {
        margin: '20px 10px '
    },
    RadioGroup: {
        paddingLeft: '100px',
    },
    FormControlLabel: {
        marginLeft: '70px',
        marginTop: '-25px'
    },
    submitButton: {
        marginTop: '24px',
    },
    buttonStyle: {
        marginLeft:'25px',
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
  }),
);

const initialFValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
}

const formStatusProps: FormIStatusProps  = {
    success: {
        message: 'Created successfully.',
        type: 'success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}
const RegistrationForm: React.FC= () =>  {
    const classes = useStyles({})
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<FormIStatus>({
        message: '',
        type: '',
    })
    const createNewUser = async (data: FormValues, resetForm: Function) => {
        try {
            if (data) {
                setFormStatus(formStatusProps.success)
                resetForm({})
            }
        } catch (error) {
            const response = error.response
            setFormStatus(formStatusProps.error)

        } finally {
            setDisplayFormStatus(true)
        }
    }
    return (
      <Container maxWidth="md">
        <Grid container>
            <Formik
                initialValues={initialFValues}
                onSubmit={(values: FormValues, actions) => {
                    createNewUser(values, actions.resetForm)
                     actions.setSubmitting(false)
                }}
                validationSchema={validationRules}
            >
                {(props: FormikProps<FormValues>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
                    return (
                        <Card>
                              <h1 className={classes.center}>React Typescript Registration Form </h1>
                              <Form className={classes.root} noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid> 
                                        {displayFormStatus && (
                                            <div className="formStatus">
                                                {formStatus.type === 'error' ? (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        {formStatus.message}
                                                    </p>
                                                ) : formStatus.type ===
                                                  'success' ? (
                                                    <p
                                                        className={
                                                            classes.successMessage
                                                        }
                                                    >
                                                        {formStatus.message}
                                                    </p>
                                                ) : null}
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                      <TextField 
                                          id="firstName" 
                                          label="First Name" 
                                          variant="outlined" 
                                          name='firstName'
                                          value={values.firstName}
                                          className={clsx(classes.margin, classes.textField)}
                                          helperText={
                                              errors.firstName && touched.firstName
                                                  ? errors.firstName
                                                  : ''
                                          }
                                          error={
                                              errors.firstName && touched.firstName
                                                  ? true
                                                  : false
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}


                                      />
                                      <TextField 
                                            id="lastName" 
                                            label="Last Name" 
                                            name='lastName'
                                            variant="outlined" 
                                            value={values.lastName}
                                            className={clsx(classes.margin, classes.textField)}
                                            helperText={
                                                errors.lastName && touched.lastName
                                                    ? errors.lastName
                                                    : ''
                                            }
                                            error={
                                                errors.lastName && touched.lastName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                      />
                                      <TextField 
                                          id="email" 
                                          name="email"
                                          label="Email Address" 
                                          variant="outlined" 
                                          value={values.email}
                                          className={clsx(classes.margin, classes.textField)}
                                          helperText={
                                              errors.email && touched.email
                                                  ? errors.email
                                                  : ''
                                          }
                                          error={
                                              errors.email && touched.email
                                                  ? true
                                                  : false
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                      />

                                        <div>
                                            <FormControl component="fieldset" className={classes.FormControl}>
                                                  <FormLabel component="legend">Gender : </FormLabel>
                                                  <RadioGroup 
                                                      aria-label="gender" 
                                                      name="gender" 
                                                      id="gender"
                                                      value={values.gender} 
                                                      row 
                                                      defaultValue="top"
                                                      className={classes.RadioGroup}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                  >
                                                        <FormControlLabel 
                                                            value="male" 
                                                            control={<Radio />} 
                                                            label="male"  
                                                            labelPlacement="end"
                                                            className={classes.FormControlLabel}
                                                        />
                                                        <FormControlLabel 
                                                            value="Female" 
                                                            control={<Radio />} 
                                                            label="Female" 
                                                            labelPlacement="end"
                                                            className={classes.FormControlLabel}
                                                        />
                                                  </RadioGroup>
                                                  <FormHelperText
                                                        error={
                                                            errors.gender && touched.gender
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {errors.gender && touched.gender
                                                            ? errors.gender
                                                            : ''
                                                        }
                                                  </FormHelperText>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className={classes.submitButton}
                                >
                                    <Button
                                        className={classes.buttonStyle}
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Form>
                          </Card>
                    )
                }}
            </Formik>
        </Grid>
      </Container>

    );
  };
  export default RegistrationForm