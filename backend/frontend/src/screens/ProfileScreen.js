import { useState, useEffect } from "react";
import { Form, Button, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";


const ProfileScreenn = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // we get userdetail value from  reducer via useSelector & destructure it(2 line)
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  //Getting userlogin value from reducer via useSelector & destructure the data we need
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;


  // if user already logged in then we send him to redirect page via useEffect
  useEffect(() => {
    //check if ther's a user if not send back to login page
    if (!userInfo) {
      history.push("/login");
    } else {
      //if user then check wherther user information being loaded
      // if not then dispatch to get the data
      //dispatch reset value for update profile if  update is successful
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        //if we get the data we can set the state
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match! Please re-enter");
    } else {
      dispatch(
        updateUserProfile({
          'id': user._id,
          'name': name,
          'email': email,
          'password': password,
        })
      );
      setMessage('')
    }
  };
  return (
      <Col md={9}>
        <h2> USER PROFILE</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        
        <Form onSubmit={submitHandler}>

          <Form.Group controlId="name">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      
  );
};

export default ProfileScreenn;
