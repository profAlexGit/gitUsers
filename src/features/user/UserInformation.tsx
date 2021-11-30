import {useEffect, useMemo, useState} from "react";
import './user.css';
import {
    fetchUserByLogin,
    getUsers, IUser, updateUser
} from './userSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export const UserInformation: React.FC = () => {
    const users = useAppSelector(getUsers);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<IUser | null>(null)

    const id = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }, [])

    useEffect(() => {
        if (!id) {
            return;
        }
        const user = findUserByIdFromState(+id);
        if (user) {
            setUser(user);
        }
    }, [users])

    useEffect(() => {
        if (!id) {
            return
        }
        const user = findUserByIdFromState(+id);
        if (user) {
            setUser(user);
        }
        if (user && !user.name) {
            getUser(user.login);
        }
    }, [])

    const getUser = async (login: string) => {
        const fullUser = await dispatch(fetchUserByLogin(login))
        await dispatch(updateUser(fullUser.payload))
    }

    const findUserByIdFromState = (id: number) => {
        return users.find((u) => u.id === id);
    }


    return <div className='user_information'>
        <img src={user?.avatar_url} alt=""/>
        <h3>{user?.name}</h3>
        <span>EMAIL: {user?.email || 'отсутствует'}</span>
        <span>BLOG: {user?.blog || 'отсутствует'}</span>
    </div>
}
