import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

function HomeButton({id}) {
    const navigate = useNavigate()
    const goToDetails = () => {
        navigate(`/details/${id}`)
    }

    const purchase = async () => {
        try {
            const {data} = await axios({
                method: "GET",
                url: `http://localhost:3000/payment/midtrans/token/${id}`,
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            window.snap.pay(data.transaction_token, {
                onSuccess: async function(result){
                  /* You may add your own implementation here */
                  await axios({
                    method: "POST",
                    url: `http://localhost:3000/inventories/${id}`,
                    data: {
                        orderId: data.orderId
                    },
                    headers: {
                        Authorization: localStorage.getItem("Authorization")
                    }
                  })
                  Swal.fire({
                    title: "Payment Successful!",
                    text: `You have completed a transaction!`,
                    icon: "success"
                  });
                  navigate("/inventory")
                },
                onPending: function(result){
                  /* You may add your own implementation here */
                  alert("wating your payment!"); console.log(result);
                },
                onError: function(result){
                  /* You may add your own implementation here */
                  alert("payment failed!"); console.log(result);
                },
                onClose: function(){
                  /* You may add your own implementation here */
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'you closed the popup without finishing the payment',
                  });
                }
              })
            console.log(data)
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        <ButtonGroup aria-label="Basic example" style={{width: "100%"}}>
            <Button variant="secondary" style={{width: "50%"}} onClick={goToDetails}>See Details</Button>
            <Button variant="success" style={{width: "50%"}} onClick={purchase}>Purchase</Button>
        </ButtonGroup>
    )
}

export default HomeButton