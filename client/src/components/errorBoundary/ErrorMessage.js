import img from '../../assets/image/error.png';

const ErrorMessage = ({ children }) => {
    return (
        <div>
            <img style={{ display: 'block', width: "200px", height: "200px", objectFit: 'contain', margin: "0 auto" }} src={img} alt="Error" />
            <div style={{textAlign: 'center', fontSize: '25px'}}>{children}</div>
        </div>
    )
}

export default ErrorMessage;