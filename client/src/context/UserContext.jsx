import React from 'react'


const UserContext = React.createContext({ userid : '', firstname : '', lastname: '',role: '', avatar: '',userphone:'',auth: false });


// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {

  const [user, setUser] = React.useState({ userid : '', firstname : '', lastname: '',role: '', avatar: '',userphone:'',auth: false });

  const loginContext = (token,userid,firstname,lastname,role,avatar,userphone) => {
    setUser((user) => ({
      userid: userid,
      firstname:firstname,
      lastname:lastname,
      role:role,
      avatar:avatar,
      // path:path,
      userphone:userphone,
      auth: true,
    }));
    localStorage.setItem('token',token);
    localStorage.setItem('userid',userid);
    localStorage.setItem('firstname',firstname);
    localStorage.setItem('lastname',lastname);
    localStorage.setItem('role',role);
    localStorage.setItem('avatar',avatar);
    localStorage.setItem('userphone',userphone);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    localStorage.removeItem('userphone');
    // localStorage.removeItem('path')
    setUser((user) => ({
      userid : '',
      firstname:'',
      lastname:'',
      role:'',
      avatar:'',
      userphone:'',
      // path:'',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export  {UserContext, UserProvider};