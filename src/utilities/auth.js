export const login = (email, password) => {
    const auth = JSON.parse(localStorage.getItem('auth')) ?? {};
    
    // Passwords should never be stored in plain text as is done in the code below.
    // This code serves as just a demonstration and is not intended as an example
    // of production ready code.

    if(auth[email]?.password === password){
        return auth[email];
    }

    return null;
}

export const saveUserCart = (email, cart) => {
    const auth = JSON.parse(localStorage.getItem('auth')) ?? {};
    auth[email].cart = cart;
    localStorage.setItem('auth', JSON.stringify(auth));
}

export const createUser = (name, email, password) => {
    const auth = JSON.parse(localStorage.getItem('auth')) ?? {};
    const cart = [];
    if (auth[email]) {
        throw new Error(`User ${email} already exists.`);
    }

    // Passwords should never be stored in plain text as is done in the code below.
    // This code serves as just a demonstration and is not intended as an example
    // of production ready code.
    auth[email] = { name, email, password, cart };
    localStorage.setItem('auth', JSON.stringify(auth));
}