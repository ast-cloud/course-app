import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, signIn, useSession, signOut } from 'next-auth/react';
import {useRouter} from 'next/router';
import { AppBar, Footer } from 'ui';
import {RecoilRoot} from 'recoil';
import Head from 'next/head';


export default function App({ Component, pageProps, router }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <RecoilRoot>
      <Head>
        <title>Course Hub</title>
      </Head>
      <App2 Component={Component} pageProps={pageProps} router={router}></App2>
    </RecoilRoot>
  </SessionProvider>
}



function App2({Component, pageProps}: AppProps){  

  const router = useRouter();
  const session = useSession();

  return <div className='background-image'>
    <AppBar router={router} session={session} signIn={signIn} signOut={signOut} ></AppBar>
    <Component {...pageProps} />
    <Footer/>
  </div>
}