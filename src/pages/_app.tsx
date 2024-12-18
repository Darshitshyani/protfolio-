import "@/styles/globals.css";
import Wrapper from "@/wrapper/wrapper";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (

    <>
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
    </>
  );
}
