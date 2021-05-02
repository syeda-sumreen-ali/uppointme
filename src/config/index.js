import react, { createContext } from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext= createContext();


export const AuthProvider = ({children})=>{
    return(
        <AuthContext.Provider>

            value={{
                user,
                setUser,
                login: async (email, password)=>{
                    try {
                        await auth.signInWithEmaiAndPassword(email,password)
                    } catch (error) {
                     console.log(e)   
                    }
                },
                register:async(email,password)=>{
                    try {
                        await auth.createUserWithEmailAndPassword(email,passowrd)
                    } catch (error) {
                        
                    }
                }
            }}
            {children}
        </AuthContext.Provider>
    )
}