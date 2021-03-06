import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class MemberGrid extends Component {
    render() {
        const {classes,onClick, key} = this.props;
        const {member} = this.props;

        return (
            <List className={classes.root} key={key}>
                <ListItem alignItems="flex-start" onClick={onClick}>
                    <ListItemAvatar>
                        <Avatar alt="Avatar image" src={member !== undefined ? member.avatar_path:""}/>
                    </ListItemAvatar>
                    <ListItemText style={{color:'rgb(245, 130, 32)'}}
                        primary={member !== undefined ? member.name:''}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Member type: {member !== undefined ? member.member_type :'Non'}
                                </Typography><br/>
                                Register date:  {member !== undefined ? member.create_date:''}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </List>
        );
    }
}

export default withStyles(styles)(MemberGrid);
