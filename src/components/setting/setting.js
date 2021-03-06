import React, { Component } from 'react';
import Header from '../header';
import Menus from "../menus/menus";
import {Card, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


import './setting.css';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {logout} from "../../actions/login.action";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import {
    // itoplusUrl,
    alfoodUrl,
    mainUrl,
} from "../../constants";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import Swal from "sweetalert2";

const styles = theme => ({
    root: {
        width: '100%',
        paddingTop: '10px'
    },
    margin: {
        margin: theme.spacing(1),
    },
    card: {
        marginTop: '10px'
    },
    inline: {
        display: 'inline',
    },
    btn_right: {
        textAlign: 'right',
        display: 'block'
    },
    image: {
        width: '60px',
        height: '60px',
        marginRight: '15px'
    },
    text_right:{
        textAlign: 'right'
    },
    text_center:{
        textAlign:'center',
        marginTop: '10px'
    },
    imageCenter:{
        textAlign:'center',
        margin:'0 auto',
    }
});
class Setting extends Component {
    state={
        name:'',
        link:'',
        image:'',
        url:'',
        value: '',
        copied: false,
        payment:0,
        showBtnCopyLink:true
    }
    logout=()=>{

        this.props.logout(this.props.history);
    }
    editProfile=()=>{

        this.props.history.push('/edit-profile');
    }

    about=()=>{
        this.props.history.push('/about');
    }
    help=()=>{
        this.props.history.push('/help');
    }
    changePassword=()=>{
        this.props.history.push('/change-password');
    }


    async componentDidMount() {
        let name = await localStorage.getItem('name');
        let link = await localStorage.getItem('link');
        let image = await localStorage.getItem('image');
        let profile = await localStorage.getItem('profile');
        profile = JSON.parse(profile);
        //console.log(profile);
        // this.setState({name:name, link:link,image:image});

        // if(profile.payment === 1){
        //     this.setState({
        //         link:link,
        //         showBtnCopyLink:true
        //     });
        // }else{
        //     this.setState({
        //         link:'********',
        //         showBtnCopyLink:false
        //     });
        // }
        this.setState({
            name:name,
            image:image,
            url:`${mainUrl}/register?link=${link}`,
            payment:profile.payment,
            link:link 

        });
    }
    goToCreateShopping=()=>{
        window.open(alfoodUrl, '_blank');
    }
    sharedComponentToFacebook=()=>{
        Swal.fire({
            title: '',
            text: "Copy Link Success",
            icon: 'success',
            timer: 1000,
            buttons: false,
        });
    }
    render() {

        const {classes} = this.props;
        return (
            <div className={classes.root}>
               <Header header='Setting'/>



                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}><br/>
                                <Avatar className="image_size"
                                        alt="profile image"
                                        src={this.state.image}/>
                            </Grid>
                        </Grid><br/><br/>
                        <div className="profile">
                            <div className="profile_name">{this.state.name}
                                <IconButton   aria-label="delete" color="primary" onClick={this.editProfile}>
                                    <CreateIcon style={{color:'gray'}}/>
                                </IconButton>
                            </div>
                            {/*<div className="profile_name" style={{color:'#4abdac'}}>link:{this.state.link}</div>*/}
                        </div>
                    </CardContent>
                </Card>

                <div style={{marginTop:'-30px'}}>
                    <div style={{textAlign:"center"}}>
                        Link: {this.state.link}
                    </div>
                    <div style={{marginBottom:'20px',textAlign:'center'}} className='mb-10'>
                        {this.state.showBtnCopyLink === true &&(
                            <Button variant="contained" color="primary" id="btn-primary" onClick={this.sharedComponentToFacebook}>
                                <CopyToClipboard text={this.state.url}
                                                onCopy={() => this.setState({copied: true})}>
                                    <span>คัดลอกลิงก์</span>
                                </CopyToClipboard>
                            </Button>
                        )}
                        


                        {' '}
                        <Button variant="contained" color="primary" id="btn-success" onClick={this.goToCreateShopping}>
                            <img alt="login_image" style={{width:'20px'}} src={`${process.env.PUBLIC_URL}/assets/images/cart.png`}/>{' '}สร้างร้านค้า
                        </Button>
                    </div>


                    <Card id="border-radius-3px">
                        <CardContent onClick={this.changePassword} style={{paddingBottom:'10px'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    เปลี่ยนรหัสผ่าน
                                </Grid>
                                <Grid item xs={2}>
                                    <ArrowDropDownIcon style={{color:"gray"}}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
                <div className=''>
                    <Card id="border-radius-3px">
                        <CardContent onClick={this.about} style={{paddingBottom:'10px'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    เกี่ยวกับแอพ
                                </Grid>
                                <Grid item xs={2}>
                                    <ArrowDropDownIcon style={{color:"gray"}}/>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </div>
                <div className=''>
                    <Card id="border-radius-3px">
                        <CardContent onClick={this.help} style={{paddingBottom:'10px'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    ช่วยเหลือ
                                </Grid>
                                <Grid item xs={2}>
                                    <ArrowDropDownIcon style={{color:"gray"}}/>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </div>
                {/*<div className='mb-10'>*/}
                {/*    <Button variant="contained" fullWidth>Add payment method</Button>*/}
                {/*</div>*/}
                <div className='mb-10' style={{marginBottom:'60px',padding:'10px'}}>
                    <Button id="btn-danger" onClick={this.logout} variant="contained" fullWidth>ออกจากระบบ</Button>
                </div>
                <br/><br/>

                <Menus/>
            </div>
        );
    }
}

const mapStateToProps = ({ loginReducer }) => ({
    loginReducer,
});
const mapDispatchToProps = {
    logout
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Setting));
