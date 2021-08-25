export const truckAPI = {
    registerTruck,
    searchTruck
}


async function registerTruck(vin, type){
    const body = {
        "vin": vin,
        "type": type
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/truck/update', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const payload = await response.json();
    console.log(payload);
    // pass response to payload
    payload["status"] = response["status"]
    return payload;
}

async function searchTruck(type, startTime, endTime) {
    const body = {
        "type": type,
        "startTime": startTime,
        "endTime": endTime
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/truck/search', {
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