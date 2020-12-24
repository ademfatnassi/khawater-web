import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Grid } from 'semantic-ui-react'

const ArticleForm = () => {
    const [searsh, setSearsh] = useState("")
    const history = useHistory();

    // const [title, setTitle] = useState("")
    // const [cover, setCover] = useState("")
    // const [description, setDescription] = useState("")

    const [values, setValues] = useState({ title: "", cover: "https://source.unsplash.com/random", description: "" });
    const handleChange = (e) => {
        const name = e.target.name;
        setValues({ ...values, [name]: e.target.value })
    }
    const handleSubmittedValues = () => {
        const payload = {
            title: values.title, cover: values.cover, content: values.description
        }
        axios.post(`${process.env.REACT_APP_API_ENDPONIT}/articles`, payload);
        history.push('/home')

    }

    return (
        <Grid columns={2} padded>
            <Grid.Column>
                <Container>
                    <Form>
                        <Form.Field>
                            <input value={searsh} placeholder='Search' onChange={(e) => { setSearsh(e.target.value) }} />
                        </Form.Field>
                    </Form>
                </Container>
            </Grid.Column>
            <Grid.Column>
                <Container>
                    <Form onSubmit={handleSubmittedValues}>
                        <Form.Field>
                            <label htmlFor='title'>Title</label>
                            <input name="title" placeholder='Title' value={values.title} onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='cover'>Cover</label>
                            <input name="cover" placeholder='cover' value={values.cover} onChange={handleChange} />
                        </Form.Field>
                        <Form.TextArea rows={15} label='Description' name="description" placeholder='Tell us more ...' value={values.description} onChange={handleChange} />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Container>
            </Grid.Column>
        </Grid>
    )
}

export default ArticleForm
