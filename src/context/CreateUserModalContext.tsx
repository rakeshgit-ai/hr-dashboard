import React, { createContext, useContext, useState } from "react";

const CreateUserModalContext = createContext<{
  show: boolean;
  open: () => void;
  close: () => void;
} | undefined>(undefined);

export function CreateUserModalProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <CreateUserModalContext.Provider
      value={{
        show,
        open: () => setShow(true),
        close: () => setShow(false),
      }}
    >
      {children}
    </CreateUserModalContext.Provider>
  );
}

export function useCreateUserModal() {
  const ctx = useContext(CreateUserModalContext);
  if (!ctx) throw new Error("useCreateUserModal must be used within CreateUserModalProvider");
  return ctx;
}