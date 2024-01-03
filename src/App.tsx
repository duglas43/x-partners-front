import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useLazyGetMeQuery } from "./store/api/api";
import { AppLayout, AuthProtect } from "./layouts";
import {
  NotFoundPage,
  SignInPage,
  SignUpPage,
  AccountPage,
  PeoplePage,
} from "./pages";

const App: FC = () => {
  const [getMe] = useLazyGetMeQuery();
  React.useEffect(() => {
    getMe();
  }, [getMe]);
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<AuthProtect />}>
          <Route path="/" element={<AppLayout />}>
            <>
              <Route path="/" element={<AccountPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
