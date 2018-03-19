const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

//Login API call
export const login = (payload) =>
    fetch(`${api}/login/loginFunction`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//Signup API call
export const signup = (payload) =>
    fetch(`${api}/signup/signupFunction`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
      .catch(error => {
            console.log("This is error");
            return error;
});

export const updateUserdata = (payload) =>
    fetch(`${api}/users/updateUserdata`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//Get data for the user Profile
export const getDataUserprofile = (payload) =>
    fetch(`${api}/users/getDataUserprofile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//Logout
export const logout = () =>
    fetch(`${api}/users/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//checklogin
export const checklogin = () =>
    fetch(`${api}/users/checklogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//checklogin
export const postProject = (payload) =>
    fetch(`${api}/users/postProject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//Get data for the user Profile
export const fetchProjects = (payload) =>
    fetch(`${api}/users/fetchProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const getProjects = (payload) =>
    fetch(`${api}/users/getProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const getworkProjects = (payload) =>
    fetch(`${api}/users/getworkProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const getbidprojectdetails = (payload) =>
    fetch(`${api}/users/getbidprojectdetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const getprojectsthatbid = (payload) =>
    fetch(`${api}/users/getprojectsthatbid`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const getProjectsthatbidbyfreelancer = (payload) =>
    fetch(`${api}/users/getProjectsthatbidbyfreelancer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const bidproject = (payload) =>
    fetch(`${api}/users/bidproject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)

    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const hirefreelancer = (payload) =>
    fetch(`${api}/users/hirefreelancer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});
