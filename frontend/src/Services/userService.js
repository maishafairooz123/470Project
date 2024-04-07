import axios from 'axios';

export const getUser = () => 
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

export const login = async (employee, password) => {
    const {data} = await axios.post('api/users/login', {employee, password});
    localStorage.setItem('user', JSON.stringify(data));
    return data;

}

export const register = async registerData => {
    const {data} = await axios.post('api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const callwaiter = async user => {
    const {response} = await axios.put('api/users/callwaiter', user);
    return response;
}

export const answerCaller = async user => {
    const {response} = await axios.put('api/users/answercaller', user);
    return response;
}

export const getPendingCallers = async () => {
    const {data} = await axios.get('api/users/getpendingcallers');
    return data;
}

export const getAllUser = async () => {
    const {data} = await axios.get('/api/users/getAll');
    return data;
}

export const updateAdmin = async (userId, isAdmin) => {
    const response = await axios.put(`/api/users/${userId}`, { admin: isAdmin });
    return response.data; 

}