import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Grid } from 'semantic-ui-react';
import CustumCard from '../../components/Card/CustumCard';
import CustumMenu from '../../components/Menu/CustumMenu';
import isLoggedIn from '../../utils/isLoggedIn';
const Home = () => {
    const [khawater, setKhawater] = useState([]);
    const getArticles = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPONIT}/articles`)
            setKhawater(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn()) {
            history.push('/')
            history.replace('login')
        }
    })
    useEffect(() => {
        getArticles()
    }, [])

    return (
        <div>
            <CustumMenu />
            <Container>
                <Grid doubling columns={5}>
                    {
                        khawater.length && khawater.map(el => (
                            <Grid.Column key={el._id}>
                                <CustumCard imgSrc={el.cover} description={el.content} title={el.title} articleId={el._id} />
                            </Grid.Column>
                        ))

                    }
                    {
                        khawater.length === 0 && <p style={{ fontSize: '4em', margin: "auto", padding: "6em" }}>No khawater 🤦</p>
                    }
                </Grid>
            </Container>
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
        </div>
    )
}

export default Home
