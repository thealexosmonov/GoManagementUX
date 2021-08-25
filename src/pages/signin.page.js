import React from "react";
import {userActions} from "../actions/user.actions";
import logo from "./../assets/go_logo.png";
import {connect} from "react-redux";
import "./../css/signin.css";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import store from "../store";

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState().userReducer;
        this.state.password = "";


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;
        if (email && password) {
            this.props.signin(email, password);
        }
    }

    render() {
        const { email, password } = this.state;
        return (

            <div className="sign-in-page">
                <img className="logo" src={logo} alt="GO" />
                <div className="sign-in-header">
                    Please Sign In
                </div>
                <form name="form">
                    <div>
                        <input type="email" className="form-control" name="email" placeholder="alex@chariot.com" value={email} onChange={this.handleChange} />
                        <input type="password" className="form-control" name="password" placeholder="********" value={password} onChange={this.handleChange} />
                    </div>
                </form>
                <div className="sign-in-button-container">
                    <Button className="btn btn-primary sign-in-button w-100" onClick={this.handleSubmit}> Sign In</Button>
                </div>
                <Link to="/register">
                    <button type="button" className="btn btn-outline-secondary w-100" > Register </button>
                </Link>
            </div>
        );
    }
}

function mapState(state) {
    const { signIn } = state.userReducer;
    return { signIn };
}

const actionCreators = {
    signin: userActions.signin,
};

const connectedSignInPage = connect(mapState, actionCreators)(SignInPage);
export { connectedSignInPage as SignInPage };