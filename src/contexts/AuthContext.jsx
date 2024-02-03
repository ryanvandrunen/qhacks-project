import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState() 
    const [loading, setLoading] = useState()

    function signup(email, password) { 
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // async function verify(user) {
    //     try {
    //         await user.sendEmailVerification();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    function login(email, password) {
        try{
            return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => auth.signInWithEmailAndPassword(email, password));
        } catch (e) {
            console.error('Could not set user persistence:', (e))
        }
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        //verify
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext
