const GetStorageToken = () => {
   const storage = localStorage.getItem("session");
   if(storage) {
       const session = JSON.parse(storage);
       console.log(session);
       if (session && Date.parse(session.expiration) > Date.now())
           return session.token;
       else
           return undefined;
   }
};

const SetToken = (token: string) => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 59);
    if(!token)
        return;
   localStorage.setItem('session', JSON.stringify({token, expiration}));
}

export const GetAuthHeader = () => {
    return {
        Authorization: "Bearer " + GetStorageToken()
    };
};

export const IsAuthenticated = () => {
    return GetStorageToken();
}

// const apiUrl = process.env.REACT_APP_BASE_URL + '/api';
const apiUrl =  "http://localhost:5000/api";;


export const Login = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/Auth/login`, {method: 'POST', headers: {...GetAuthHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({email, password})});
    if(response.ok) {
        const body = response.json();
        const data = await body;
        SetToken(data.token);
    }else {alert("auth failed... Username or passowrd might be wrong")
    return false;

}
    return true;

}

export const Logout = () => {
    localStorage.removeItem('session');
}



