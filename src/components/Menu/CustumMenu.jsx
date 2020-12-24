import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import isLoggedIn from '../../utils/isLoggedIn';
const CustumMenu = () => {
    const history = useHistory();

    const [activeItem, setActiveItem] = useState("home")
    const [profile, setProfile] = useState("user")
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const me = () => {
        let token = localStorage.getItem("khawater")
        axios
            .get(`${process.env.REACT_APP_API_ENDPONIT}/users/me/` + token)
            .then((res) => {
                setProfile(res.data.profile);
            })
    }

    useEffect(() => {
        me();
    }, [])

    function logout() {
        localStorage.removeItem("khawater")
        history.push('/login')
    }
    return (
        <Segment inverted attached>
            <Menu inverted pointing secondary >
                <Menu.Item
                    as={Link}
                    to="/home"
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    as={Link}
                    to="/new-article"
                    name='Add Article'
                    active={activeItem === 'Add Article'}
                    onClick={handleItemClick}
                />
                {isLoggedIn() && <Menu.Menu position='right'>
                    <Menu.Item
                        name={profile}
                    />
                    <Menu.Item
                        name='logout'
                        onClick={logout}
                    />
                </Menu.Menu>
                }
            </Menu>
        </Segment>
    )
}

export default CustumMenu
