export const reservationsAPI = {
    listReservations,
    bookReservation,
}


async function listReservations(email){
    const body = {
        "email": email,
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/reservation/list', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const payload = await response.json();
    // pass response to payload
    payload["status"] = response["status"]
    return payload;
}

async function bookReservation(vin, startDate, endDate, email, type){
    const body = {
        "vin": vin,
        "email": email,
        "startDate": startDate,
        "endDate": endDate,
        "type": type
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/reservation/book', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const payload = await response.json();
    // pass response to payload
    payload["status"] = response["status"]
    return payload;
}
