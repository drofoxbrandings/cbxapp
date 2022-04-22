import axios from "axios";
import SecureLS from 'secure-ls'

const baseUrl = 'https://cbxtrack.herokuapp.com'
// const baseUrl = 'http://localhost:5000'

const ls = new SecureLS({ encodingType: "aes" })

const token = ls.get('AuthToken')
console.log(token)

const config = {
    headers: { Authorization: token }
};

export const Login = (loginData) => axios.post(baseUrl + '/api/auth/login', loginData).then(res => { return res });
export const ResetPasswordLink = (email) => axios.post(baseUrl + '/api/auth/sendPasswordResetLink', email).then(res => { return res });
export const ResetPassword = (password) => axios.post(baseUrl + '/api/auth/resetPassword', password).then(res => { return res });
export const ChangePassword = (data) => axios.post(baseUrl + '/api/auth/changePassword', data, config).then(res => { return res });


export const getSingleUser = (uid) => axios.get(baseUrl + '/api/user/getSingleUser/' + uid, config).then(res => { return res });

export const getShipment = (limit, offset) => axios.get(baseUrl + `/api/shipment/listShipment`, config).then(res => { return res.data });