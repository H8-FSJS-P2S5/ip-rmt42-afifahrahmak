import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'

export const homeContext = createContext()

export const HomeContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [profile, setProfile] = useState([])
    const [updrade, setUpdrade] = useState(false)

    const fetchPost = async () => {
        try {
            if (localStorage.getItem('token')) {
                const { data } = await axios({
                    method: 'GET',
                    url: 'http://localhost:3000/posts',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setUser(data.user)

                let random = data.data.sort(() => Math.random() - 0.5)
                setPosts(random)
            } else {
                const { data } = await axios({
                    method: 'GET',
                    url: 'http://localhost:3000/pub/posts'
                })
                let random = data.data.sort(() => Math.random() - 0.5)
                setPosts(random)
            }

        } catch (error) {
            Swal.fire({
                text: error.response.data.message,
                icon: 'warning',
                confirmButtonText: "Back",
                confirmButtonColor: "red",
                customClass: {
                    popup: 'custom-pop-up'
                }
            })
        }
    }

    const getProfile = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:3000/profile/${user.username}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setProfile(data)
        } catch (error) {
            Swal.fire({
                text: "you closed the popup without finishing the payment",
                icon: 'warning',
                confirmButtonText: "Back",
                confirmButtonColor: "red",
                customClass: {
                    popup: 'custom-pop-up'
                }
            })
        }
    }

    // const handleOnUpgrade = async () => {
    //     try {
    //         const { data } = await axios({
    //             method: 'GET',
    //             url: `http://localhost:3000/payment/${user.id}`,
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })

    //         window.snap.pay(data.transaction_token, {
    //             onSuccess: async function () {
    //                 /* You may add your own implementation here */
    //                 await axios({
    //                     method: 'PATCH',
    //                     url: `http://localhost:3000/${user.id}`,
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem('token')}`
    //                     },
    //                     data: {
    //                         orderId: data.orderId
    //                     }
    //                 })
    //             },
    //             onClose: function () {
    //                 /* You may add your own implementation here */
    //                 Swal.fire({
    //                     text: "you closed the popup without finishing the payment",
    //                     icon: 'warning',
    //                     confirmButtonText: "Back",
    //                     confirmButtonColor: "red",
    //                     customClass: {
    //                         popup: 'custom-pop-up'
    //                     }
    //                 })
    //             }
    //         })

    //         setUpdrade(true)
    //     } catch (error) {
    //         Swal.fire({
    //             text: error.response.data.message,
    //             icon: 'warning',
    //             confirmButtonText: "Back",
    //             confirmButtonColor: "red",
    //             customClass: {
    //                 popup: 'custom-pop-up'
    //             }
    //         })
    //     }
    // }


    useEffect(() => {
        fetchPost()
    }, [updrade])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProfile()
        }
    }, [posts, updrade])

    return (
        <homeContext.Provider value={{posts, setPosts, user, setUser, profile, setProfile}}>
            {children}
        </homeContext.Provider>
    )

}
