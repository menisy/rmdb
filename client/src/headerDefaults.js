function setHeader(axios)
{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken')
}
exports.setHeader = setHeader;
