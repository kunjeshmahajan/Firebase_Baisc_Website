import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC2pJ9p4av67GLeV7lzvWDuX5QsiUSoDOI",
    authDomain: "fir-9-kunjesh.firebaseapp.com",
    projectId: "fir-9-kunjesh",
    storageBucket: "fir-9-kunjesh.appspot.com",
    messagingSenderId: "529624308247",
    appId: "1:529624308247:web:40ffd9b1ef42d7de479a52"
  };


initializeApp(firebaseConfig)

const db =getFirestore()
const auth = getAuth()



const colRef = collection(db,'books')


const q = query(colRef,orderBy('createdAt'))


onSnapshot(q,(snapshot)=>{
    let books = []
     snapshot.docs.forEach((doc)=>{
         books.push({...doc.data(),id : doc.id})
     })
     console.log(books)
})

  const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()


  addDoc(colRef,{
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createdAt: serverTimestamp()

  })
  .then(()=>{
    addBookForm.reset()
  })
  
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db,'books',deleteBookForm.id.value)
  
  deleteDoc(docRef)
  .then(()=>{
    deleteBookForm.reset()
  })
})







 
  const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()


  const docRef = doc(db,'books',updateForm.id.value)

  updateDoc(docRef,{
      title:'updated title'
  })
  .then(()=>{
      updateForm.reset()
  })


  
})


const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
      console.log('user create :',cred.user)
      signupForm.reset()
  })
  .catch((err)=>{
      console.log(err.message)
  })


})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
   .then(()=>{
       console.log('signed out')
   })
   .catch((err)=>{
       console.log(err.message)
   })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth,email,password)
   .then((cred)=>{
       console.log('user Logged in', cred.user)
       loginForm.reset()
   })
   .catch((err)=>{
       console.log(err.message)

   })
  
})