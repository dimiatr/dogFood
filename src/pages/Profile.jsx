import { BoxArrowInLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, color, setUser }) => {
    const navigate = useNavigate();

    const captionStyle = {
        fontWeight: 'bold',
        color: color,
    }

    const logOut = (e) => {
        e.preventDefault();
        setUser('')
        localStorage.removeItem("rockUser");
        localStorage.removeItem("rockToken");
        localStorage.removeItem("rockId");
        navigate("/")
    }

    return <>
        <h1>Личный кабинет</h1>
        <div>
            Добро пожаловать, <span style={captionStyle}>{user}</span> !
        </div>
        <a to="" onClick={logOut} title='Выйти'>
            <BoxArrowInLeft />
        </a>
    </>
}

export default Profile;