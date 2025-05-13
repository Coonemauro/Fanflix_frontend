import React from 'react';
import { Container, MantineProvider, MantineThemeOverride, rem } from '@mantine/core';
import { Box } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import MenuBar from './Header/Header';
import Footer from './Footer/Footer';
import Seo from './Seo';

type LayoutProps = {
  children: React.ReactNode
  title: string
  width?: number
  noMenuBar?: boolean
  hideMenuBar?: boolean
}

const bvtvTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Quicksand, sans-serif',
  primaryColor: 'orange',
  focusRingStyles: {
    inputStyles: (theme) => ({
      border: `0.02rem solid ${theme.colors.orange[3]}`,
      borderRadius: "0.5rem",
      outline: "none",
      boxShadow: `0 0 0 0.02rem ${theme.colors.orange[3]}`,
    }),
  },
    
  /*breakpoints: {
    xs: '@media (max-width: 320px)',
    sm: '@media (max-width: 599px)',
    md: '@media (max-width: 1023px)',
    lg: '@media (max-width: 1335px)',
    xl: '@media (min-width: 1336px)',
  }*/
};


export function Layout({ children, title, noMenuBar = false, hideMenuBar = false }: LayoutProps) {
  return (
      <MantineProvider theme={bvtvTheme} withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" style={{ zIndex: 1000000}}/>
        <section>
          {!noMenuBar && 
            <MenuBar hideMenuBar = {hideMenuBar}/>
          }
          <Box
            component="main"
            sx={{
              background: 'linear-gradient(to bottom, #FFE39F 0%, #FFC845 10%, #3366FF 40%, #CC66CC 60%, #FF6680 80%, #E53935 100%)',
              minHeight: '100vh',
            }}
          >
            <Seo title={title}>
              {children}
            </Seo>
          </Box>
          <Footer />
        </section>
      </MantineProvider>
  )
}
