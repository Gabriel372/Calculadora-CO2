import { createContext ,useState } from 'react';
const ApiContext = createContext();

const MyProvider = ({ children }) => {
  const [Admincontext, setAdmincontext] = useState({});

  return (
    <ApiContext.Provider value={{ Admincontext ,setAdmincontext }}>
      {children}
    </ApiContext.Provider>
  );
};

export  {ApiContext, MyProvider} ;