export const connectWithForm = (data, path, method='POST', token='') => {
  return fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const connectWithBody = (data, path, method='POST', token='') => {
  return fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const connect = (path, method = 'GET') => {
  return fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const logout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return (
      fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'GET',
      })
        //.then((response) => console.log(response))
        .catch((err) => console.log(err))
    );
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }

  return false;
};
