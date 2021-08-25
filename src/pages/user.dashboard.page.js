import React from "react";
import {Navbar, Spinner} from "react-bootstrap";
import "./../css/user-dashboard.css";
import {connect} from "react-redux";
import {truckActions} from "../actions/truck.actions";
import {reservationActions} from "../actions/reservations.actions";
import {truckAPI} from "../api/truck.api";
import {reservationsAPI} from "../api/reservations.api";
import store from "../store";
import {history} from "../history";
import Button from "react-bootstrap/Button";


class UserDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // availableTrucks: store.getState().truckReducer.availableTrucks,
            availableTrucks: [],
            searchingForTruck: false,
            searchForTruckDone: false,
            searchingForReservations: true,
            bookedReservation: false,
            signedIn: store.getState().userReducer.signedIn,
            role: store.getState().userReducer.role,
            email: store.getState().userReducer.email,
            reservations: [],
        }

        if (!this.state.signedIn || !("user" === this.state.role)){
            history.push("/");
        }

        this.handleChange = this.handleChange.bind(this);
        this.loadReservations = this.loadReservations.bind(this);
        this.loadAvailableTrucks = this.loadAvailableTrucks.bind(this);
        this.reserveTruck = this.reserveTruck.bind(this);
    }

    async loadReservations() {
        let {email} = this.state;

        let response = await reservationsAPI.listReservations(email);

        response.reservations.forEach(reservation => {
            let startTime = parseInt(reservation.start_time);
            reservation.start_time = reformatDate(new Date(startTime * 1000));

            let endTime = parseInt(reservation.end_time);
            reservation.end_time = reformatDate(new Date(endTime * 1000));
        })

        return response;
    }

    componentDidMount() {
        this.loadReservations().then(r =>
            this.setState({
                reservations: r.reservations,
                searchingForReservations: false,
            }));
    }

    async reserveTruck(event){
        let vin = event.target.getAttribute("vin");
        let {reservationStartDate, reservationEndDate, email, truckType, reservations} = this.state;

        let startTime = (new Date(reservationStartDate).getTime())/1000;
        let endTime = (new Date(reservationEndDate).getTime())/1000;

        let response = await reservationsAPI.bookReservation(vin, startTime, endTime, email, truckType);

        if (response.status === 200) {
            let reservation = {
                start_time : reformatDate(new Date(startTime * 1000)),
                end_time : reformatDate(new Date(endTime * 1000)),
                reservation_id: response.reservationId,
                type: truckType
            }

            reservations.push(reservation);

            this.setState({
                bookedReservation: true,
                availableTrucks: [],
                reservations: reservations
            })
        }
    }

    async loadAvailableTrucks() {
        let {truckType, reservationStartDate, reservationEndDate} = this.state;

        // transform dates to seconds since epoch
        let startTime = (new Date(reservationStartDate).getTime())/1000;
        let endTime = (new Date(reservationEndDate).getTime())/1000;

        this.setState({
            searchingForTruck: true,
            bookedReservation: false,
            searchForTruckDone: false
        })
        let response = await truckAPI.searchTruck(truckType, startTime, endTime);

        this.setState({
            availableTrucks: response.trucks,
            searchingForTruck: false,
            searchForTruckDone: true
        })

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    render() {

        let {availableTrucks, reservations, searchingForReservations, searchingForTruck, bookedReservation, searchForTruckDone} = this.state

        // Existing Reservations Section
        let reservationsDiv;
        if (searchingForReservations) {
            reservationsDiv = <Spinner animation={"border"}/>
        } else {
            if (reservations.length === 0) {
                reservationsDiv =
                    <div>
                        No Reservations Found!
                    </div>
            } else {
                reservationsDiv =
                    <div>
                        <table>
                            <tr>
                                <th className="table-header"> Reservation Id </th>
                                <th className="table-header"> Start Time </th>
                                <th className="table-header"> End Time </th>
                                <th className="table-header"> Truck Type </th>
                            </tr>
                            {reservations.map(reservation => (
                                <tr>
                                    <td className="table-data">
                                        {reservation.reservation_id}
                                    </td>
                                    <td className="table-data">
                                        {reservation.start_time}
                                    </td>
                                    <td className="table-data">
                                        {reservation.end_time}
                                    </td>
                                    <td className="table-data">
                                        {reservation.type} ft
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
            }
        }

        // Available Reservations Section
        let availableReservationsDiv;
        if (searchingForTruck) {
            availableReservationsDiv = <Spinner animation={"border"}/>

        }

        else if (bookedReservation) {
            availableReservationsDiv =
                <div>
                    Reservation Booked! Check Reservations above to confirm!
                </div>
        }

        else {

            if (availableTrucks.length === 0) {
                if (searchForTruckDone) {
                    availableReservationsDiv =
                        <div>
                            No Trucks Available!
                        </div>
                } else {
                }
            }

            else {
                availableReservationsDiv =
                    <div>
                        <table>
                            <tr>
                                <th className="table-header"> VIN </th>
                                <th className="table-header"> Book Reservation </th>
                            </tr>
                            {availableTrucks.map(truck => (
                                <tr>
                                    <td className="table-data">
                                        {truck.vin}
                                    </td>
                                    <td className="table-data">
                                        <Button className="btn btn-success" onClick={this.reserveTruck} vin={truck.vin}> Book </Button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
            }
        }

        return (
                <div className="user-dashboard-page">
                    <Navbar>
                        <div className="navbar-header"> GO </div>
                    </Navbar>

                    <p className="table-title"> Reservations </p>
                    <div className="reservations-div-wrapper">
                        {reservationsDiv}
                    </div>

                    <div className="user-main-container">
                        <div className="user-left-container">
                            <div>
                                <p className="table-title"> Reserve Truck </p>
                                <div className="book-reservation-div-wrapper">
                                    <div className="reserve-truck-form">
                                        Select Truck Type

                                        <div>
                                            <label className="truck-type-label" htmlFor="radio8ft"> 8 ft </label>
                                            <input type="radio"  value="8" name="truckType" onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label className="truck-type-label" htmlFor="10ft"> 10 ft </label>
                                            <input type="radio"  value="10" name="truckType" onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <label className="truck-type-label" htmlFor="14ft"> 14 ft </label>
                                            <input type="radio"  value="14" name="truckType" onChange={this.handleChange}/>
                                        </div>

                                        <label className="date-label"> Reservation Start: </label>
                                        <div>
                                            <input type="date" name="reservationStartDate" onChange={this.handleChange}/>
                                        </div>

                                        <label className="date-label"> Reservation End: </label>
                                        <div>
                                            <input type="date" name="reservationEndDate" onChange={this.handleChange}/>
                                        </div>

                                        <div className="register-button-container">
                                            <Button className="btn btn-primary sign-in-button w-100" onClick={this.loadAvailableTrucks}> Check Availability </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-right-container">
                            {availableReservationsDiv}
                        </div>
                    </div>
                </div>
        )
    }
}

function mapState(state) {
    const { searchTruck } = state.truckReducer;
    const { listReservations } = state.reservationReducer;
    return {
        searchTruck,
        listReservations,
        numberOfAvailableTrucks: state.numberOfAvailableTrucks,
        availableTrucks: state.availableTrucks,
    };
}


const actionCreators = {
    searchTruck: truckActions.searchTruck,
    listReservations: reservationActions.listReservations,
};

const connectedUserDashboardPage = connect(mapState, actionCreators)(UserDashboardPage);
export { connectedUserDashboardPage as UserDashboardPage };


// helper functions
function reformatDate(date) {
    let reformattedDate = ""
    let day = new Intl.DateTimeFormat('en', {day: 'numeric'}).format(date);
    let month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    let year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    let minute = new Intl.DateTimeFormat('en', {minute: 'numeric'}).format(date);
    minute = minute.length === 2 ? minute : "0" + minute;
    let hourMeridiem = new Intl.DateTimeFormat('en', {hour: 'numeric'}).format(date);
    let split = hourMeridiem.split(" ");
    let hour = split[0];
    let meridiem = split[1];

    reformattedDate = (day + "-" + month + "-" + year + " " + hour + ":" + minute + " " + meridiem);
    return reformattedDate
}