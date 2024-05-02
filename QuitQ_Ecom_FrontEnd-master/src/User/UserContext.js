import React,{Children, createContext,useState} from 'react'

const UserContext = createContext();

const UserProvider = ({children})=>{
    const [userData, setUserData] = useState({
        userId: null,
        username: '',
        contactNumber: '',
        dateOfBirth: null, 
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        userRole: '',
        userStatus: ''
      });

    const [productToDisplay,setProductsToDisplay] = useState([])

    

    return(
        <UserContext.Provider value={{userData,setUserData,productToDisplay,setProductsToDisplay}}>
            {children}
        </UserContext.Provider>
    );
};
export {UserProvider,UserContext}
