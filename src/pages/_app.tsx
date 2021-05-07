import '../styles/globals.css'
import {HomeContextProvider} from '../context/HomeContext';

function MyApp({ Component, pageProps }) {
  return (
    <HomeContextProvider>
      <Component {...pageProps} />
    </HomeContextProvider>
  );
}

export default MyApp
