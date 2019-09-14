import '../../assets/styles/auth.css';
const LogOut = () => {
	return localStorage.removeItem('token');
};

export default LogOut;
