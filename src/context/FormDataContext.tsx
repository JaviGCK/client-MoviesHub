import { FC, ReactNode, createContext, useContext, useState } from 'react';


const FormDataContext = createContext<any | undefined>(undefined);
interface Props {
  children: ReactNode;
}

export const FormDataProvider: FC<Props> = ({ children }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    origin: '',
    poster: '',
    year: '',
    description: '',
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};


export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be use on FormDataProvider');
  }
  return context;
};
