// an atom is one piece of data that you want to share
// across different components (similiar to state)
import {atom, useAtom} from 'jotai';

// create an atom for the flash message and export it for other
// components to use
export const flashMessageAtom = atom({
    "message": "",
    "type":"info"  // could be success, info or error
}); 

// create a custom hook
// a hook is a way for components to get additional functionalities 
export const useFlashMessage = ()=>{

    // get the flash message
    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    // the showMessage funnction provides a standardized way to set the
    // flash message
    const showMessage = (message, type) => {
        setFlashMessage({
            "message": message,
            "type": type
        })
    }

    const clearMessage = () =>{
        setFlashMessage({
            "message": "",
            "type": "info"
        })
    }

    const getMessage = () => {
        return flashMessage;
    }

    // whatever we return from the hook are additional values (i.e data)
    // or functionalities the component will have access to
    return {
        showMessage, clearMessage, getMessage
    }
}
