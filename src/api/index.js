import axios from "axios";

const baseUrl = 'https://cbxtrack.herokuapp.com'

export const Login = (loginData) => axios.post(baseUrl + '/api/auth/login', loginData).then(res => { return res });