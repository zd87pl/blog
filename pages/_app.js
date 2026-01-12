import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import 'normalize.css/normalize.css';
import '../styles/main.scss';
import ThemeStyles, { ThemeProvider } from 'components/ThemeStyles/ThemeStyles';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <ThemeStyles />
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </ThemeProvider>
  );
}
