import { Context, useContext } from "react";

export function useCheckIsNullableContext<T>(context: Context<T | null>) {
    const currentUserContext = useContext(context);
  
    if (!currentUserContext) {
      throw new Error(
        "Current context has to be used within Provider"
      );
    }
  
    return currentUserContext;
  };