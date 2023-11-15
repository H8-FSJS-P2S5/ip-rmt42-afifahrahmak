import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();


    const handleLogout = async () => {
        localStorage.clear();
        // toast.info('🖐️ SEE YOU LATER 🖐️', {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        navigate("/landing");
    }


    return(
        <>
        </>
    )

}