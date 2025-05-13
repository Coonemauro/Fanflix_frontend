import React from 'react';
import footerStyles from './Footer.styles'
import logo from '../../images/homepage/logo.png';
import facebookIcon from '../../images/homepage/facebook.svg';
import instagramIcon from '../../images/homepage/instagram.svg';
import tiktokIcon from '../../images/homepage/tiktok.svg';
import footerbanner from '../../images/homepage/footer-banner.png';

const Footer: React.FC = () => {
  const links = [
    { label: 'De Warmste Week', link: '#' },
    { label: 'De Warmste Producten', link: '#' },
    { label: 'Schrijf je in voor onze nieuwsbrief', link: '#' }
  ];

  const address = [
    'De Warmste Week',
    'Auguste Reyerslaan 52',
    'B-1043 Brussel',
    'BTW BE0244.142.664'
  ];

  return (
    <>
      <img src={footerbanner} alt="Footer banner" className="w-full" />

      <footer className="bg-[#061035] relative pt-20 pb-10">
        {/* Logo bovenaan */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="Logo-fanflix" className="w-45 h-auto" />
        </div>

        {/* Hoofdcontent */}
        <div className="bg-[#121C40] mx-8 rounded-2xl p-6 md:flex justify-between items-start text-white">
          <div className="space-y-4">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="font-semibold underline hover:no-underline flex items-center text-[#FFC845]"
              >
                {item.label} <span className="ml-2">↗</span>
              </a>
            ))}
          </div>

          <div className="mt-6 md:mt-0 text-right space-y-1 font-semibold text-sm">
            {address.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center mt-6 space-x-6">
          <a href="#"><img src={facebookIcon} alt="Facebook" className="w-6 h-6" /></a>
          <a href="#"><img src={instagramIcon} alt="Instagram" className="w-6 h-6" /></a>
          <a href="#"><img src={tiktokIcon} alt="Tiktok" className="w-6 h-6" /></a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
