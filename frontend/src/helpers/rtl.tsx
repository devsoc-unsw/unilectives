import {
  defaultSlice,
  initialState,
} from "src/logic/redux/reducers/defaultSlice/defaultSlice";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactNode } from "react";

const preloadedInitialState = {
  app: initialState,
};

const render = (
  ui: JSX.Element,
  state?: any,
  {
    store = configureStore({
      reducer: {
        app: defaultSlice.reducer,
      },
      preloadedState: state || preloadedInitialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override methods
export { render, preloadedInitialState };
