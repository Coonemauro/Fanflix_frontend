import React from 'react'
import footerStyles from './Footer.styles'
import { Text, Container, ActionIcon, Group, rem, Title } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { Link } from 'gatsby';
import logo from '../../images/homepage/logo.png';
import facebookIcon from '../../images/homepage/facebook.svg';
import instagramIcon from '../../images/homepage/instagram.svg';
import tiktokIcon from '../../images/homepage/tiktok.svg';
import footerbanner from '../../images/homepage/footer-banner.png';

const Footer: React.FC = () => {
    const { classes, theme } = footerStyles()
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
      const socialIcons = [
        { icon: <img src={tiktokIcon} alt="Twitter" style={{ width: '24px', height: '24px' }} />, link: '#' },
        { icon: <img src={facebookIcon} alt="Facebook" style={{ width: '24px', height: '24px' }} />, link: '#' },
        { icon: <img src={instagramIcon} alt="Instagram" style={{ width: '24px', height: '24px' }} />, link: '#' },
      ];

    return (
        <>
        <img src={footerbanner} alt="footer-banner" className={classes.banner}/>
        <footer className={classes.footer}>
            <Link to="/">
                <div className={classes.logo}>
                    <img src={logo} alt="Logo" className={classes.logoimage} />
                </div>
            </Link>

            <div className={classes.footercontent}>
                <div className={classes.itemcontainer}>
                    {links.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className={classes.item}
                    >
                        {item.label} <span className="ml-2">↗</span>
                    </a>
                    ))}
                </div>
                <div className={classes.contactinfo}>
                    {address.map((line, idx) => (
                    <p key={idx}>{line}</p>
                    ))}
                </div>
            </div>

            <div className={classes.social}>
                {socialIcons.map((item, index) => (
                    <ActionIcon key={index} component="a" href={item.link} size="xxl" variant="transparent">
                        {item.icon}
                    </ActionIcon>
                ))}
            </div>
        </footer>
        </>
    )
}

export default Footer



