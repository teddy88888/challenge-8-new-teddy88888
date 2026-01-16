// src/components/Footer.jsx
const Footer = () => (
  <footer className="bg-black border-t border-gray-900 py-12 px-10 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">MOVIE EXPLORER</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          Discover the latest trending movies and explore your favorite cinema
          content.
        </p>
      </div>
      <br />
      <br />
    <div className="flex gap-10 text-gray-400 text-sm">
      <div className="flex flex-col gap-2">
         <span className="text-white font-bold mb-2">Platform</span>
         <a href="#" className="hover:text-red-500">
            About Us
         </a>
        <a href="#" className="hover:text-red-500">
            FAQ
        </a>
      </div>
      <div className="flex flex-col gap-2">
         <span className="text-white font-bold mb-2">Legal</span>
         <a href="#" className="hover:text-red-500">
            Privacy Policy
         </a>
         <a href="#" className="hover:text-red-500">
            Terms of Service
         </a>
       </div>
      </div>
    </div>
    <div className="text-center text-gray-600 text-xs mt-12 border-t border-gray-900 pt-8">
      © 2026 Movie Explorer App. Powered by TMDB API.
    </div>
  </footer>
);
export default Footer;
