export const userAPI = {
    signin,
    register
}


async function signin(email, password) {
    const body = {
        "email": email,
        "password": password
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/user/signin', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const payload = await response.json();
    payload["status"] = response["status"]
    payload["email"] = email
    return payload;
}


async function register(email, firstName, lastName, phoneNumber, password, role, adminKey) {
    const body = {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "password": password,
        "role": role,
        "adminKey": adminKey
    };

    const response = await fetch('https://zvxa485kf5.execute-api.us-east-1.amazonaws.com/prod/user/update', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const payload = await response.json();
    payload["status"] = response["status"]
    payload["email"] = email
    return payload;
}