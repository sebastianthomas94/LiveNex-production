import { useEffect } from "react";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl  font-semibold">LiveNex</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold">
            The easiest way to live stream and record
          </h2>
          <p className="mt-4 text-lg">
            A professional live streaming and recording studio in your browser.
            Record your content, or stream live to Facebook, YouTube, and other
            platforms.
          </p>
          <Link to="/signup">
            <button className="mt-8 bg-yellow-400 text-blue-900 hover:bg-yellow-500 py-2 px-6 rounded-full text-lg font-semibold">
              Get started - it's free!
            </button>
          </Link>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <p className="mt-4">
                LiveNex is user-friendly and requires no technical expertise.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Custom Branding</h3>
              <p className="mt-4">
                Brand your streams with custom logos, overlays, and backgrounds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">
                Multi-Platform Streaming
              </h3>
              <p className="mt-4">
                Stream to multiple platforms simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 LiveNex. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
