import { Routes, Route,useLocation } from 'react-router-dom';
import { Login, Main, Home,Productdetails,Register,Post,PostNew,NewsManager,ProFile,Payment, MainSort} from '../../client/src/pages/public';
import { path } from '../../client/src/ultils/constants';
import { ToastContainer } from 'react-toastify';
import { useContext,useEffect } from 'react';
import { UserContext } from './context/UserContext';
function App() {
  const {user, loginContext} = useContext(UserContext);
  const location = useLocation();
  useEffect (() => {
    if(localStorage.getItem("token"))
    {
      loginContext(localStorage.getItem("token"),localStorage.getItem("userid"),localStorage.getItem("firstname"),localStorage.getItem("lastname"),localStorage.getItem("role")
      ,localStorage.getItem("avatar"),localStorage.getItem("userphone"),localStorage.getItem("useraddress"),localStorage.getItem("usergender"),localStorage.getItem("birthday")
   );
    }},[])
  return (
    <div className="App">
      <div key={location.search}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
          <Route path={path.PRODUCT} element={<Productdetails />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.MAINSORT} element={<MainSort />} />
        </Route>
        <Route path={path.POST} element={<Post/>} >
        <Route index element={<PostNew />} />
        <Route path={path.NEWSMANAGER} element={<NewsManager />} />
        <Route path={path.PROFILE} element={<ProFile />} />
        <Route path={path.PAYMENT} element={<Payment />} />
        </Route>
        
      </Routes>
      </div>
    </div>
  );
}

export default App;

