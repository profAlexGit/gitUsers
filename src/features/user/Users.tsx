import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Link} from 'react-router-dom';
import {useEffect} from "react";
import {fetchUsers} from "./userSlice";
import {
    getUsers
} from './userSlice';

import './user.css';

export const Users: React.FC = () => {
   const users = useAppSelector(getUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return <ul className='list_users'>
        {users.map((u) => {
            return <li
                key={u.id}
            >
                <Link to={`/user?id=${u.id}`} className={'user_card'}>
                    <img
                        className='user_cardAvatar'
                        src={u.avatar_url} alt=""/>
                    <span>{u.login}</span>
                </Link>

            </li>
        })}
    </ul>
}
