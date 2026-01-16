// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a
//           href='https://vite.dev'
//           target='_blank'
//         >
//           <img
//             src={viteLogo}
//             className='logo'
//             alt='Vite logo'
//           />
//         </a>
//         <a
//           href='https://react.dev'
//           target='_blank'
//         >
//           <img
//             src={reactLogo}
//             className='logo react'
//             alt='React logo'
//           />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
//     </>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import MovieDetail from "./pages/MovieDetail";
import SearchPage from "./pages/Search.tsx";

// Inisialisasi Query Client untuk TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Container Utama dengan tema gelap sesuai Figma */}
        <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white selection:bg-red-600">
          <Navbar /> {/* Komponen Navigasi Reusable */}
          <main className="grow">
            <Routes>
              {/* Routing Halaman */}
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
          <Footer /> {/* Footer Struktural */}
        </div>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
