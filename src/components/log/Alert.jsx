import Swal from 'sweetalert2';
import history from '../../history';

const Alert = () => {

    const showAlert = () => {
        Swal.fire({
            icon: 'error',
            text: 'You must login first',
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: '#2754d5',
            backdrop: true
        })
            .then((result) => {
                if (result.value) {
                    history.push('/login');
                }
            }); 
    }

    return ( 
        <>
            {showAlert()}
        </>
    );
}
 
export default Alert;