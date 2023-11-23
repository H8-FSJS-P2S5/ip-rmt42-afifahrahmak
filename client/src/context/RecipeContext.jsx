import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const RecipeContext = createContext()

export const RecipeContextProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const token = localStorage.getItem("access_token");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await axios({
                    url: "https://cyto-h8.pramresto.site/recipes",
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        search,
                        filter,
                        page
                    }
                })

                let { results, totalPage, total } = result
                setTotalPage(totalPage)
                setData(results)
                console.log(results)

            }
            catch ({response}) {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                console.log(error)
            }
        }
        fetchData()
    }, [search, filter, page])


    return (
        <RecipeContext.Provider
            value={{data, search, setSearch, filter, setFilter, totalPage, page, setPage}}
        >
            {children}
        </RecipeContext.Provider>
    )
} 

