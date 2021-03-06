import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Formik} from 'formik';
import {login,loginSocial} from "../../actions/login.action";
import Swal from 'sweetalert2';
import {connect} from "react-redux";

import './login.css';
import { server,apiUrl } from "../../constants";
import * as Yup from 'yup';
import FacebookLogin from "react-facebook-login";

// import axios from 'axios'
import { httpClient } from "./../../utils/HttpClient";


// import GoogleLogin from 'react-google-login';


const styles = theme => ({
    paper: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
     state={
        id:'',
        name:'',
        email:''
    }
    async componentDidMount(){
         //onsole.log(process.env.REACT_APP_NAME)
        if (localStorage.getItem(server.TOKEN_KEY) != null){
            console.log('isLogin');
            this.props.history.push("/home")
        }

        const query = new URLSearchParams(this.props.location.search);
        let token = query.get('token');
        

        if(token === null || token === '' || token === undefined){
            let backendUrl = process.env.REACT_APP_BACKEND;
            let mainUrl = process.env.REACT_APP_MAINURL;
            return window.location.href =  `${backendUrl}/user/login?redirectUrl=${mainUrl}`;
        }else{
            let url = process.env.REACT_APP_APIURL;
            const apiUrl = `${url}/auth/login-by-token?token=${token}`;
            let result = await httpClient.get(apiUrl);

            if (result.data.status === 'success') {
                //localStorage.setItem(server.TOKEN_KEY, result.data.user.auth_key);
                //localStorage.setItem(server.TOKEN_KEY, )
                let {data} = result.data;

                localStorage.setItem(server.TOKEN_KEY, data.user.auth_key);
                localStorage.setItem('link', data.profile.link);
                localStorage.setItem('name', data.profile.name);
                localStorage.setItem('image', data.profile.avatar_path);

                localStorage.setItem('profile',JSON.stringify(data.profile));

                //setTimeout(function(){
                    window.location.reload();
                // })
            }
        }
        
         
    }
    goHome =()=>{
        this.props.history.push('/home');
    }
    register=()=>{
        this.props.history.push('/register');
    }
    // facebookLogin=()=>{
    //     const query = new URLSearchParams(this.props.location.search);
    //     let link = query.get('link');
    //     this.props.history.push('/facebook?link='+link+'&status=1');
    // }
    responseFacebook = async (response) => {
        const query = new URLSearchParams(this.props.location.search);
        let link = query.get('link');
        if(link === undefined || link === null){
            link = await localStorage.getItem('query_link');
            if(link === undefined){
                link = process.env.REACT_APP_DEFAULTLINK;
            }
        }
        if(response.error !== undefined){
            //message
            Swal.fire({
                title: '',
                text: response.error.message,
                icon: 'warning',
                timer: 2000,
                buttons: false,
            });
        }
        if(response.id !== undefined){
            console.log("response");
            console.log(response.id);
            let formData = new FormData();
            formData.append("id", response.id);
            formData.append("name", response.name);
            formData.append("email", response.email);
            this.props.loginSocial(formData, this.props.history)
            setTimeout(()=>{
                // console.error(this.props.loginReducer.isError);
                if(this.props.loginReducer.isError === true){
                    let {errMessage} = this.props.loginReducer;
                    Swal.fire({
                        title: '',
                        text: errMessage,
                        icon: 'warning',
                        timer: 2000,
                        buttons: false,
                    });
                }else{
                    this.goHome();
                }
            },1000);
        }


    }
    // forgot=()=>{
    //     this.props.history.push('/forgot');
    // }



    // responseGoogle = async (response) => {
    //      console.log(response);
    // }

    showForm = ({values, handleChange, handleSubmit, setFieldValue ,errors, touched})=>{
        const {classes} = this.props;
        return (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="username"
                    autoComplete="email"
                    autoFocus
                    value={values.username}
                    onChange={handleChange}
                />
                {errors.username && touched.username ? (
                    <div style={{color:'red'}}>{errors.username}</div>
                  ) : null}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && touched.password ? (
                    <div style={{color:'red'}}>{errors.password}</div>
                ) : null}

                <div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        id="btn-primary"
                    >
                        Sign In
                    </Button>
                </div>
                <div>
                    <FacebookLogin
                        appId="824540648022199" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        autoLoad={false}
                        callback={this.responseFacebook}
                    />
                </div>
                <div id="login-with-google">
                    {/*<GoogleLogin*/}
                    {/*    clientId="344060547201-s8nvulgcr5a5ei2p10ho79fcn8fqorhd.apps.googleusercontent.com" //CLIENTID NOT CREATED YET*/}
                    {/*    buttonText="LOGIN WITH GOOGLE"*/}
                    {/*    onSuccess={this.responseGoogle}*/}
                    {/*    onFailure={this.responseGoogle}*/}
                    {/*/>*/}
                </div>


            </form>


        )
    }
    render() {
        const {classes} = this.props;

        const SignupSchema = Yup.object().shape({
            username: Yup.string().required('Email ต้องไม่เป็นค่าว่าง'),
            password: Yup.string().required('Password ไม่เป็นค่าว่าง'),
        });


        return (
            <div className="page-login" style={{marginTop:"60px",textAlign:"center"}}>
                Loading...
            </div>
        );
    }
}

const mapStateToProps = ({ loginReducer }) => ({
    loginReducer,
});
const mapDispatchToProps = {
    login,
    loginSocial
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
