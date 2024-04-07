import axios from 'axios';

export const createOrder = async order => {
  try {
    
    const { data } = axios.post('/api/orders/create', order);

    return data;
  } catch (error) {

  }
};

export const completeOrder = async user => {
  try {
    
    const { data } = axios.post('/api/orders/completeorder', user);

    return data;
  } catch (error) {

  }
};


export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const approveOrder = async orderId => {
  const {approved} = await axios.put('/api/orders/approveorder/' + orderId);
  return approved;
}

export const serveItem = async (orderId, itemFoodId) => {
  const {approved} = await axios.put('/api/orders/serveitem/' + orderId + '/' + itemFoodId);
  return approved;
}

export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {}
};

export const trackOrder = async () => {
  const { data } = await axios.get('/api/orders/track');
  return data;
};

export const refreshOrder = async () => {
  const { data } = await axios.get('/api/orders/refresh');
  return data;
};

export const trackOrderById = async orderId => {
  const { data } = await axios.get(`/api/orders/trackbyid/${orderId}`);
  return data;
};

export const getAll = async state => {
  const { data } = await axios.get(`/api/orders/${state ?? ''}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allstatus`);
  return data;
};