import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";


function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: "",
                duration: 5000,
                removeDelay: 1000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },

                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "green",
                    secondary: "black",
                  },
                },
              }}
            />
            <AppRouter />
          </LocalizationProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;
