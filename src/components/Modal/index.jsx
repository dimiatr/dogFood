import { useState } from 'react';
import './style.css';

const Modal = ({active, setActive}) => {
    const [auth, setAuth] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [testPwd, setTestPwd] = useState('');

    const testAcces = {
        color: pwd === testPwd ? 'forestgreen' : 'crimson'
    }

    const switchAuth = (e) => {
        e.preventDefault()
        setAuth(!auth)
        clearForm()
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPwd('');
        setTestPwd('');
    }

    const sendForm = async (e) => {
        e.preventDefault();
        let body = {
            email: email,
            password: pwd
        }
        if (!auth) {
            body.name = name;
            body.group = 'group-12'
        }
        let log = 'https://api.react-learning.ru/signin'
        let reg = 'https://api.react-learning.ru/signup'

        let res = await fetch(auth ? log : reg, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        let data = await res.json() 
        if (!data.err) {
            if (!auth) {
                delete body.name;
                delete body.group;
                let resLog = await fetch(log, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                let dataLog = await resLog.json() 
                if(!data.err) {
                    localStorage.setItem('rockUser', dataLog.data.name);
                    clearForm();
                    setActive(false)
                } 
            } else { 
                if(!data.err) {
                localStorage.setItem('rockUser', data.data.name);
                clearForm();
                setActive(false);
            }
        }
        }
    }

    return <div className="modal-wrapper" style={{display: active ? 'flex' : 'none'}}>
        <div className="modal">
            <div className="btn">
            <button onClick={() => setActive(false)}>Закрыть окно</button>
            </div>
            <h3>Авторизация</h3>
            <form onSubmit={sendForm}>
                {!auth && <label>
                    Имя пользователя
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </label>}
                <label>
                    Электронный адрес
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Пароль
                    <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}/>
                </label>
                {!auth && <label>
                    Повторить пароль
                    <input
                    type="password"
                    value={testPwd}
                    onChange={(e) => setTestPwd(e.target.value)}
                    style={testAcces}
                    />
                </label>}
                <div className="modal-ctrl">
                    <button className='modal-btn'
                    disabled={!auth && (!pwd || pwd !== testPwd)}
                    >
                        {auth ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    <a href='' className='modal-link' onClick={switchAuth}>
                        {auth ? 'Регистрация' : 'Войти'}
                        </a>
                </div>
            </form>
        </div>
    </div>
}

export default Modal;