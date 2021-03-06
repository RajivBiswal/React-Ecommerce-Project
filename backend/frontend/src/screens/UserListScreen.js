import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from '../actions/userActions';


const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else {
            history.push('/login')
        }
    },[dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure You Want To Delete This User?')){
            dispatch(deleteUser(id))
        }
    }


    return (
        <div>
            <h2>USERS</h2>
            {loading
            ? (<Loader />)
            : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL ID</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ?(
                                    <i className='fas fa-check' style={{color: 'green'}}></i>
                                ): (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sn'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='light' className='btn-sn' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'/>
                                        </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )

}

export default UserListScreen;