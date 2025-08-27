import "@/styles/globals.css";
import Wrapper from "@/wrapper/wrapper";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }: AppProps) {
  return (

    <>
    <Wrapper>
      <Component {...pageProps} />
        <ToastContainer />
    
    </Wrapper>
       
 
    </>
  );
}
