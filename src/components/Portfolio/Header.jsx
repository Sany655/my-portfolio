import React from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/1 backdrop-blur-lg shadow-lg'
            : 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 text-black shadow-xl'
        }`}
      >
        <div className="container mx-auto px-6">
          {!isScrolled && (
            <div className="py-6 text-center text-black">
              <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
                Welcome to My Portfolio
              </h1>
              <p className="text-lg mt-2 opacity-90">
                Explore my work and get in touch!
              </p>
            </div>
          )}
            <nav>
              <ul className="flex space-x-8 py-4 justify-center">
                <li>
                  <a
                    href="#about"
                    className={`transition-colors duration-200 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-gray-300'
                        : 'text-white hover:text-gray-700'
                    } font-semibold`}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className={`transition-colors duration-200 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-gray-300'
                        : 'text-white hover:text-gray-700'
                    } font-semibold`}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={`transition-colors duration-200 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-gray-300'
                        : 'text-white hover:text-gray-700'
                    } font-semibold`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
        </div>
      </header>
      <div className="h-36"></div>
    </>
  );
}

export default Header;