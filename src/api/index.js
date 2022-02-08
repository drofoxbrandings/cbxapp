import axios from "axios";

// const baseUrl = 'https://cbxtrack.herokuapp.com'
const baseUrl = 'http://localhost:5000'

export const Login = (loginData) => axios.post(baseUrl + '/api/auth/login', loginData).then(res => { return res });
export const ResetPasswordLink = (email) => axios.post(baseUrl + '/api/auth/sendPasswordResetLink', email).then(res => { return res });
export const ResetPassword = (password) => axios.post(baseUrl + '/api/auth/resetPassword', password).then(res => { return res });