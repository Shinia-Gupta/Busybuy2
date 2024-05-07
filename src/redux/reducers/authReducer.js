// import React, { useState, useContext, createContext, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth, googleProvider,db } from "../../config/firebaseInit";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../config/firebaseInit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  message: "",
  error: null,
  currentUserData:null
};

//CREATING A ASYNC THUNK FOR USER REGISTRATION
export const registerWithSiteEmailPassAsync = createAsyncThunk(
  "auth/registerSiteEmailPass",
  async ({ username, email, password }, thunkAPI) => {
    console.log(firebaseAuth);
    const userCreds = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCreds.user;
    await setDoc(doc(db, "users", user.uid), {userId:user.uid,email:user.email,cart:[],orders:[],cartAmount:0,});
    // console.log(user.uid,"user");
    const res1=await setDoc(doc(db, "cart",user.uid), []);
    console.log(res1,"res1");
    const res2=await setDoc(doc(db, "orders",user.uid), []);
    console.log(res2,"res2");
    return await updateProfile(user, { displayName: username });

    // thunkAPI.dispatch(actions.setInitialState(user))
    // return user;
    // await addDoc(collection(db,'users'),{userId:user.uid,email:user.email,cart:[],orders:[],cartAmount:0});
  }
);

export const loginWithSiteEmailPassAsync=createAsyncThunk("auth/loginSiteEmailPass",async ({email, password})=>{
  console.log(firebaseAuth,email,password);
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
})

export const signinWithGoogleAsync=createAsyncThunk("auth/signinWithGoogle",async ()=>{
    //  if(initialState.currentUser){
    //   await setDoc(doc(db, "cart",initialState.currentUser.uid), []);
    //   await setDoc(doc(db, "orders",initialState.currentUser.uid), []);
      
    //  }
     const user= await signInWithPopup(firebaseAuth, googleProvider);

     return  await setDoc(doc(db, "users", user.uid), {userId:user.uid,email:user.email,cart:[],orders:[],cartAmount:0,});



})

export const fetchUserRefAsync=createAsyncThunk("auth/fetchUserData",async()=>{
  console.log("func not working");
  console.log( initialState.currentUser.uid);
  const docRef = doc(db, "users", initialState.currentUser.uid);
  console.log("func not working 2");

  console.log(docRef, "docRef ");

  const docSnap = await getDoc(docRef);
  console.log(docSnap, "docsnap ");
  const userRef = docSnap.exists() ? docSnap.data() : [];
  console.log(userRef,"...user ref data");
  return userRef;
})
// console.log(fetchUserRefAsync,".........fetchuserrf ");
export const resetPwdAsync=createAsyncThunk("auth/resetPassword",async ({email})=>{
    const auth = getAuth();
    return await sendPasswordResetEmail(auth, email);
})

console.log(initialState);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state,action)=>{
        state.currentUser=null;
        state.message="User logged out successfully";
        signOut(firebaseAuth);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerWithSiteEmailPassAsync.pending,(state,action)=>{
        state.loading=true;
    })
    .addCase(
      registerWithSiteEmailPassAsync.fulfilled,
      (state, action) => {
        // console.log(action.payload, "register with email pass fulfilled");
        // state.currentUser = action.payload.user;
        state.loading=false;
      })
      .addCase(registerWithSiteEmailPassAsync.rejected,(state,action)=>{
        console.log(action.payload,"register with email pass rejected");
        state.error=action.payload;
        state.loading=false;
    })
    .addCase(loginWithSiteEmailPassAsync.pending,(state,action)=>{
state.loading=true;
    })
    .addCase(loginWithSiteEmailPassAsync.fulfilled,(state,action)=>{
      console.log(action.payload.user);
// const obj={...action.payload.user};
        initialState.currentUser="hello";
        // console.log(obj);
        console.log(initialState);
        initialState.loading=false;

      //   return {
      //     ...state,
      //     currentUser: { ...action.payload.user },
      //     loading: false // Update loading status
      // };
      return {
        ...initialState
      }

    })
    .addCase(loginWithSiteEmailPassAsync.rejected,(state,action)=>{
      // console.log(action,"login usewr with creds rejected");

        state.error=action.payload;
        state.loading=false;
    })
    .addCase(signinWithGoogleAsync.pending,(state,action)=>{
        state.loading=true;

    })
    .addCase(signinWithGoogleAsync.fulfilled,(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;

    })
    .addCase(resetPwdAsync.pending,(state,action)=>{
        state.loading=true;
    })
    .addCase(resetPwdAsync.fulfilled,(state,action)=>{
        state.message="Reset password link sent to your email";
    })
    .addCase(resetPwdAsync.rejected,(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    }).addCase(fetchUserRefAsync.pending,(state,action)=>{
      state.loading=true;

  }).addCase(fetchUserRefAsync.fulfilled,(state,action)=>{
    state.loading=false;
    console.log(action.payload,"...action user data");
    state.currentUserData=action.payload;
    

}).addCase(fetchUserRefAsync.rejected,(state,action)=>{
  console.log('hello');
  console.log(action.payload);
  console.log(initialState);

  state.error=action.payload;
  state.loading=false;
})

  },
});
console.log(initialState.currentUserData);
export const authReducer=authSlice.reducer;
export const actions=authSlice.actions;
export const authSelector=(state)=>state.authReducer;

//2. create context provider
// export const AuthProvider = (props) => {
//   // const [currentUser,setCurrentUser]=useState();
//   // const [loading,setLoading]=useState(true);

//   //website's registration and login
//   const registerWithSiteEmailPass = async (username, email, password) => {
//     // const userCreds= await createUserWithEmailAndPassword(firebaseAuth,email,password);
//     // const user=userCreds.user;
//     // // console.log(user);
//     // await addDoc(collection(db,'users'),{userId:user.uid,email:user.email,cart:[],orders:[],cartAmount:0});
//     // // return await updateProfile(user,{displayName:username});
//   };

//   const loginWithSiteEmailPass = async (email, password) => {
//     // return await signInWithEmailAndPassword(firebaseAuth, email, password);
//   };

//   //google registration/login
//   const signinWithGoogle = async () => {
//     // return await signInWithPopup(firebaseAuth, googleProvider);
//   };

//   //reset password with email
//   const resetPwd = async (email) => {
//     // const auth = getAuth();
//     // return await sendPasswordResetEmail(auth, email);
//   };

//   //logout user
//   const logout = () => {
//     return signOut(firebaseAuth);
//   };

//   useEffect(() => {
//     // setLoading(true);
//     const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       // console.log(user,"-----user auth");
//       // setLoading(false);
//     });
//     // unsubscribe();
//     // return unsubscribe;
//   }, []);

//   return (
//     //providing the context
//     <AuthContext.Provider
//       value={{
//         registerWithSiteEmailPass,
//         loginWithSiteEmailPass,
//         logout,
//         resetPwd,
//         currentUser,
//         signinWithGoogle,
//         loading,
//         setLoading,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

//3. custom hook to consume the context

// export const useAuth = () => useContext(AuthContext);
