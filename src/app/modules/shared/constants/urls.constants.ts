import {environment} from '../../../../environments/environment';

const baseURL = environment.apiURL;

const v1Base = `${baseURL}/v1`;

export const v1URL = {
  login: {
    method: 'post',
    url: `https://reqres.in/api/login`
  },

  exchangeRates: {
    method: 'get',
    url: `https://v6.exchangerate-api.com/v6/9c88f158433f11fdb44bb58d/latest/INR`
  },

  users: {
    login: {
      method: 'post',
      url: `${v1Base}/users/login`
    },
    register: {
      method: 'post',
      url: `${v1Base}/users`
    },
    fetchProfile: {
      method: 'get',
      url: `${v1Base}/fetchProfile`
    }
  },
  expenses:{
    fetchAllExpenses:{
      method: 'get',
      url: `${v1Base}/expenses`
    }
  }
};
