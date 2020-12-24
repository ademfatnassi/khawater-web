import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';
import isLoggedIn from '../../utils/isLoggedIn';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn()) {
            history.push('/home')
        }
    })
    const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const handleChange = (e) => {
        const name = e.target.name;
        setValues({ ...values, [name]: e.target.value })
    }
    const handleSubmittedValues = () => {
        const payload = {
            firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password
        }
        axios
            .post(`${process.env.REACT_APP_API_ENDPONIT}/users`, payload)
            .then(() => {
                toast.success('Account created successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => history.push('/home'), 2000)
            })
            .catch((err) => {
                toast.warn('Error occur!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        history.push('/login')

        // setValues({ firstName: "", lastName: "", email: "", password: "" });
        // console.log(payload);
    }
    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={logo} /> Sign-in to your account
            </Header>
                    <Form size='large' onSubmit={handleSubmittedValues}>
                        <Segment stacked>
                            <Segment.Group horizontal >
                                <Segment>
                                    <Form.Input onChange={handleChange} name='firstName' fluid icon='user' iconPosition='left' placeholder='First Name' />
                                </Segment>
                                <Segment>
                                    <Form.Input onChange={handleChange} name='lastName' fluid icon='user' iconPosition='left' placeholder='Last Name' />
                                </Segment>
                            </Segment.Group>
                            <Form.Input onChange={handleChange} name='email' fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                onChange={handleChange}
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            <Button color='teal' fluid size='large'>
                                Register
                        </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <Link to="login"> Sign In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Register
