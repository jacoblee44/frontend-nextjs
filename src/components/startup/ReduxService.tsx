import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearAuth, storeAuth } from "@/redux/reducers/authSlice";
import { AuthService } from "@/services/auth";
import { selectReduxService, updateReduxServiceProps } from "@/redux/reducers/reduxServiceSlice";

interface ReduxServiceProps {
  children?: React.ReactNode,
}

const ReduxService: React.FC<ReduxServiceProps> = (props) => {
  const dispatch = useAppDispatch();
  const authService = new AuthService();
  const ready = useAppSelector(selectReduxService).isReady;

  const updateReduxService = () => {
    dispatch(updateReduxServiceProps({
      isReady: true,
    }));
  };

  const updateAuthInfo = () => {
    if (authService.isLoggedIn()) {
      dispatch(storeAuth({
        loggedIn: true,
        token: authService.getToken(),
        userData: authService.getUserData(),
      }));
    } else {
      dispatch(clearAuth());
    }
  };

  useEffect(() => {
    updateAuthInfo();
    updateReduxService();
  }, []);

  return (
    <>
      {ready && (
        <>
          {props.children}
        </>
      )}
    </>
  );
};

export { ReduxService };
