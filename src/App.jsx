import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./routes";

function App() {
  const queryClient = new QueryClient();
  return (
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
  

//it is importnt to know what we are doing


      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
