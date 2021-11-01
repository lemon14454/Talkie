import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, FC, useContext } from "react";

interface ContextInterface {
  contacts: {
    id: string;
    name: string;
  }[];
  createContact: (id: string, name: string) => void;
}

const ContactsContext = createContext<ContextInterface | null>(null);

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider: FC = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id: string, name: string) {
    setContacts((prevContacts: any) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
