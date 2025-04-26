import React, { useState } from 'react';

const Footer = ({ 
  isDarkMode = true,
  siteName = "Moodflix",
  year = new Date().getFullYear(),
  showDisclaimer = true,
  minimal = false
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const bgColor = isDarkMode ? 'bg-black' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const headingColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-300';
  const hoverColor = isDarkMode ? 'hover:text-white' : 'hover:text-gray-900';
  const highlightColor = isDarkMode ? 'text-red-600' : 'text-red-600';
  
  // Content sections for the footer
  const sections = [
    {
      id: 'about',
      title: 'About',
      links: ['About Us', 'Blog', 'Careers', 'Partners']
    },
    {
      id: 'browse',
      title: 'Browse',
      links: ['Movies', 'TV Shows', 'New & Popular', 'My List']
    },
    {
      id: 'help',
      title: 'Help',
      links: ['FAQ', 'Contact Us', 'Help Center', 'Supported Devices']
    },
    {
      id: 'legal',
      title: 'Legal',
      links: ['Terms of Use', 'Privacy Policy', 'Cookie Preferences', 'Corporate Information']
    }
  ];

  return (
    <footer className={`${bgColor} w-full transition-colors duration-300`}>
      {/* Main Footer Content */}
      <div className="max-w-full mx-auto">
        {/* Legal Disclaimer Banner */}
        {showDisclaimer && (
          <div className={`w-full py-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div className="w-screen px-4 sm:px-6 lg:px-8">
              <p className={`text-center text-sm ${headingColor}`}>
                <span className={highlightColor}>{siteName}</span> ⚖️ We're currently in beta. Direct links will be removed post 10k daily visitors to ensure legal compliance.
              </p>
            </div>
          </div>
        )}

        {/* Desktop Footer */}
        <div className="hidden md:block text-center">
          <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Site Info */}
              {!minimal && (
                <div className="col-span-2 lg:col-span-4 mb-6 text-center">
                  <h2 className={`${headingColor} text-xl font-semibold mb-4`}>{siteName}</h2>
                  <p className={`${textColor} text-sm max-w-3xl m-auto  text-center`}>
                    This site is for educational and informational purposes only. 
                    {siteName} is not affiliated with, endorsed by, or in any way officially connected 
                    with Netflix or any other streaming service.
                  </p>
                </div>
              )}
              
              {/* Footer Sections */}
              {/* {sections.map(section => (
                <div key={section.id}>
                  <h3 className={`${headingColor} text-lg font-medium mb-4`}>{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link}>
                        <a 
                          href="#" 
                          className={`text-sm ${textColor} ${hoverColor} transition-colors duration-200`}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
            </div>
            
            {/* Social Icons */}
            <div className="mt-3 mb-4 text-center   ">
              <div className="flex space-x-5 justify-center">
                <a href="#" aria-label="Instagram" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Legal Full Disclaimer */}
            {showDisclaimer && !minimal && (
              <div className={`${borderColor} border-t border-b py-6 mb-6`}>
                <div className={`${textColor} text-sm space-y-3`}>
                  <p>
                    <strong>{siteName}</strong> does not host, store, or own any content displayed on this website. 
                    All content is sourced and linked from third-party providers.
                  </p>
                  <p>
                    This site is operated for educational and informational purposes only. 
                    We have no intention of copyright infringement and respect the intellectual property rights of others.
                  </p>
                  <p>
                    <strong>{siteName}</strong> is not affiliated with, endorsed by, or in any way officially connected with 
                    Netflix or any other streaming service mentioned on this site.
                  </p>
                  <p>
                    If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, 
                    please contact us immediately.
                  </p>
                </div>
              </div>
            )}
            
            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-6">
              <div className={`${textColor} text-sm mb-4 md:mb-0`}>
                
                © {year} {siteName}. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6">
                <button 
                  aria-label="Select language" 
                  className={`flex items-center ${textColor} ${hoverColor} text-sm transition-colors duration-200`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>English</span>
                </button>
                
                <button 
                  aria-label="Help center" 
                  className={`flex items-center ${textColor} ${hoverColor} text-sm transition-colors duration-200`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden">
          <div className="px-4 py-8">
            {/* Mobile Accordion */}
            {/* {sections.map(section => (
              <div key={section.id} className={`${borderColor} border-b`}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full py-4 flex justify-between items-center"
                  aria-expanded={expandedSection === section.id}
                >
                  <span className={`${headingColor} font-medium`}>{section.title}</span>
                  <svg 
                    className={`w-5 h-5 ${textColor} transform ${expandedSection === section.id ? 'rotate-180' : ''} transition-transform duration-200`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === section.id && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      {section.links.map(link => (
                        <li key={link}>
                          <a 
                            href="#" 
                            className={`text-sm ${textColor} ${hoverColor} transition-colors duration-200`}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))} */}
            
            {/* Social Icons - Mobile */}
            <div className="flex justify-center space-x-6 ">
              <a href="#" aria-label="Instagram" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className={`${textColor} ${hoverColor} transition-colors duration-200`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Mobile Disclaimer - Simplified */}
            {showDisclaimer && (
              <div className="py-2 px-2 text-center">
                <p className={`${textColor} text-xs`}>
                  {siteName} does not host any content. All links are from third-party sources.
                  For educational purposes only. Not affiliated with any streaming services.
                </p>
              </div>
            )}
            
            {/* Mobile Copyright */}
            <div className="text-center py-4">
              <p className={`${textColor} text-xs`}>
                © {year} {siteName}. All rights reserved.
              </p>
              
              <div className="mt-4 flex justify-center space-x-4">
                <button className={`text-xs ${textColor} ${hoverColor} transition-colors duration-200`}>
                  <span>English</span>
                </button>
                <button className={`text-xs ${textColor} ${hoverColor} transition-colors duration-200`}>
                  <span>Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;