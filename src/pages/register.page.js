import React from "react";
import {userActions} from "../actions/user.actions";
import {connect} from "react-redux";
import logo from "../assets/go_logo.png";
import Button from "react-bootstrap/Button";
import "./../css/register.css";
import store from "../store";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);


        this.state = store.getState().userReducer;
        this.state.password = "";
        this.state.firstName = '';
        this.state.lastName = '';
        this.state.phoneNumber ='';
        this.state.role = 'user';
        this.state.signedIn = false;
        this.state.adminKey = '';

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let { email, password, firstName, lastName, phoneNumber, role, adminKey } = this.state;

        if (email && password && firstName && lastName && phoneNumber) {
            if (adminKey.length > 0) {
                role = "admin";
                this.props.register(email, firstName, lastName, phoneNumber, password, role, adminKey);
            } else {
                let null_admin_key = "";
                this.props.register(email, firstName, lastName, phoneNumber, password, role, null_admin_key);
            }
        }
    }

    render() {
        const { email, password, firstName, lastName, phoneNumber, adminKey} = this.state;
        return (
            <div className="register-page">
                <img className="logo" src={logo} alt="GO" />
                <div className="register-header">
                    Register
                </div>
                <form name="form">
                    <div className="register-form">
                        <label htmlFor="text"> First Name </label>
                        <input type="text" className="form-control" name="firstName" placeholder="John" value={firstName} onChange={this.handleChange} />
                    </div>
                    <div className="register-form">
                        <label htmlFor="text"> Last Name </label>
                        <input type="text" className="form-control" name="lastName" placeholder="Smith" value={lastName} onChange={this.handleChange} />
                    </div>

                    <div className="register-form">
                        <label htmlFor="text"> Email Address </label>
                        <input type="email" className="form-control" name="email" placeholder="john@chariot.com" value={email} onChange={this.handleChange} />
                    </div>

                    <div className="register-form">
                        <label htmlFor="text"> Phone Number </label>
                        <input type="text" className="form-control" name="phoneNumber" placeholder="(212)-999-00000" value={phoneNumber} onChange={this.handleChange} />
                    </div>

                    <div className="register-form">
                        <label htmlFor="password"> Password </label>
                        <input type="password" className="form-control" name="password" placeholder="********" value={password} onChange={this.handleChange} />
                    </div>

                    <div className="register-form">
                        <label htmlFor="adminKey"> Admin Key (Optional) </label>
                        <input type="password" className="form-control" name="adminKey" placeholder="********" value={adminKey} onChange={this.handleChange} />
                    </div>

                </form>
                <div className="register-button-container">
                    <Button className="btn btn-primary sign-in-button w-100" onClick={this.handleSubmit}> Register </Button>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { register } = state.userReducer;
    return { register };
}

const actionCreators = {
    register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };