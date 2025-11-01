import React from 'react'


const UserContext = React.createContext({ userid : '', firstname : '', lastname: '',role: '', avatar: '',userphone:'',useraddress:'',usergender:false,birthday:'',auth: false });


// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {

  const [user, setUser] = React.useState({ userid : '', firstname : '', lastname: '',role: '', avatar: '',userphone:'',useraddress:'',usergender:false,birthday:'',auth: false });

  const loginContext = (token,userid,firstname,lastname,role,avatar,userphone,useraddress,usergender,birthday) => {
    setUser((user) => ({
      userid: userid,
      firstname:firstname,
      lastname:lastname,
      role:role,
      avatar:avatar,
      userphone:userphone,
      useraddress:useraddress,
      usergender:usergender,
      birthday:birthday,
      auth: true,
    }));
    localStorage.setItem('token',token);
    localStorage.setItem('userid',userid);
    localStorage.setItem('firstname',firstname);
    localStorage.setItem('lastname',lastname);
    localStorage.setItem('role',role);
    localStorage.setItem('avatar',avatar);
    localStorage.setItem('userphone',userphone);
    localStorage.setItem('useraddress',useraddress);
    localStorage.setItem('usergender',usergender);
    localStorage.setItem('birthday',birthday);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
    localStorage.removeItem('userphone');
    localStorage.removeItem('useraddress');
    localStorage.removeItem('usergender');
    localStorage.removeItem('birthday');
    // localStorage.removeItem('path')
    setUser((user) => ({
      userid : '',
      firstname:'',
      lastname:'',
      role:'',
      avatar:'',
      userphone:'',
      useraddress:'',
      usergender:false,
      birthday:'',
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