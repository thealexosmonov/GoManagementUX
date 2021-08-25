import React from "react";
import Button from "react-bootstrap/Button";
import "./../css/admin-dashboard.css";
import {connect} from "react-redux";
import {truckActions} from "../actions/truck.actions";
import { Navbar } from 'react-bootstrap';
import store from "../store";
import {history} from "../history";

class AdminDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vin: '',
            truckType: '',
        };

        this.state = store.getState().userReducer;
        this.state.vin = '';
        this.state.truckType = '';

        if (!this.state.signedIn || !("admin" === this.state.role)){
            history.push("/");
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let {vin, truckType} = this.state;

        if (vin && truckType) {
            this.props.registerTruck(vin, truckType);
        }
    }

    render() {

        let {vin} = this.state;


        return (
            <div className="admin-dashboard-page">
                <Navbar>
                    <div className="navbar-header"> GO </div>
                </Navbar>

                <div className="admin-main-container" >
                    <div className="admin-left-container">
                        <div className="table-label"> Truck Inventory </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">VIN</th>
                                <th scope="col">Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>049a6e2d-2dc3-404a-8399-c90690509a87</td>
                                <td>14</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>06cee819-4913-4360-a70a-ea3b95eaea06</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>074ff6df-3159-45ba-9e55-c0653d08aa33</td>
                                <td>8</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="admin-right-container">
                        <div className="register-truck-header">
                            Register Truck
                        </div>
                        <div className="register-truck-form">
                            <form name="form">
                                <div className="vin-form">
                                    <label htmlFor="text"> VIN (Vehicle Identification Number) </label>
                                    <input type="text" className="form-control" name="vin" placeholder="4Y1SL65848Z411439" value={vin} onChange={this.handleChange} />
                                </div>
                                Select Truck Type
                                <div>
                                    <input type="radio"  value="8" name="truckType" onChange={this.handleChange}/>
                                    <label className="truck-type-label" htmlFor="radio8ft"> 8 ft </label>
                                </div>
                                <div>
                                    <input type="radio"  value="10" name="truckType" onChange={this.handleChange}/>
                                    <label className="truck-type-label" htmlFor="10ft"> 10 ft </label>
                                </div>
                                <div>
                                    <input type="radio"  value="14" name="truckType" onChange={this.handleChange}/>
                                    <label className="truck-type-label" htmlFor="14ft"> 14 ft </label>
                                </div>
                            </form>
                            <div className="register-button-container">
                                <Button className="btn btn-primary sign-in-button w-100" onClick={this.handleSubmit}> Register Truck </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    const { registerTruck } = state.truckReducer;
    return { registerTruck };
}

const actionCreators = {
    registerTruck: truckActions.registerTruck,
};

const connectedAdminDashboardPage = connect(mapState, actionCreators)(AdminDashboardPage);
export { connectedAdminDashboardPage as AdminDashboardPage };