import { useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const useMessage = () => {
    return useCallback((text, caseType) => {
        if (text) {
            switch (caseType) {
                case "error":
                    toast.error(`🦄 ${text}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                case "":
                    break;
                default:
                    toast(`🦄 ${text}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
            }
            
        }
    }, [])
}