import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Slash from './slash'
import Profilesetting from './profile'
import Posts from './posts'
import Usersearch from './usersearch'
import Chats from './chats';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Slash/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile/:username' element={<Profilesetting/>}></Route>
          <Route path='/profile' element={<Profilesetting/>}></Route>
          <Route path='/posts' element={<Posts/>}></Route>
          <Route path='/usersearch' element={<Usersearch/>}></Route>
          {/* <Route path='/' element={}></Route>  here it is post impentation path*/}
          <Route path='/chats' element={<Chats/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
