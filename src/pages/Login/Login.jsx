import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from '../../logo.svg';
import isLoggedIn from '../../utils/isLoggedIn';

const Login = () => {
    const history = useHistory();
    useEffect(() => {
        if (isLoggedIn()) {
            history.push('/home')
        }
    })
    const [values, setValues] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        const name = e.target.name;
        setValues({ ...values, [name]: e.target.value })
    }
    const handleSubmittedValues = () => {
        const payload = {
            email: values.email, password: values.password
        }
        axios
            .post(`${process.env.REACT_APP_API_ENDPONIT}/users/login`, payload)
            .then(res => {
                localStorage.setItem('khawater', res.data.token);
                toast.success('Loggedin!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => history.push('/home'), 2000)
                // history.push('/home')
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // console.log(err.response.data.message);
            })
        // console.log(payload);
    }

    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={logo} /> Log-in to your account
            </Header>
                    <Form size='large' onSubmit={handleSubmittedValues}>
                        <Segment stacked>
                            <Form.Input onChange={handleChange} name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                onChange={handleChange}
                                name="password"
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            <Button color='teal' fluid size='large'>
                                Login
                        </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="register"> Sign Up</Link>
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

export default Login
