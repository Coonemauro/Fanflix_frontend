import { createStyles, rem } from '@mantine/core'
import { keyframes } from '@emotion/react'

const scroll = keyframes({
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  });
const headerStyles = createStyles(theme => ({
    header: {
        backgroundColor: '#3d0d20',
        paddingBottom: rem(48),
        paddingTop: '5vh',
        zIndex: 100000,
        width: '100%',
        //maxWidth: '16',
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        backgroundColor: '#fec84f',
        width: '90vw',
        margin: 'auto',
        borderRadius: '20px 20px 0 0'

    },
    zTop: {
        zIndex: 100000,
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#0077cc',
        paddingLeft: rem(16),   // 1rem
        paddingRight: rem(16),
        paddingTop: rem(6.4),   // 0.4rem
        paddingBottom: rem(6.4),
        borderRadius: rem(20),
        margin: rem(4),         // 0.25rem
        fontWeight: 700,        // font-bold
        fontSize: rem(13.6), 
        textDecoration: 'none',
        [theme.fn.smallerThan(1100)]: {
            fontSize: theme.fontSizes.sm,
        },

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    hiddenMobile: {
        [theme.fn.smallerThan('1024')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('1024')]: {
            display: 'none',
        },
    },

    hiddenVerySmall: {
        [theme.fn.smallerThan(500)]: {
            display: 'none',
        },        
    },

    input: {
        paddingRight: theme.spacing.sm,
        backgroundColor: 'white',
        border: 'none',
        color: '#0077cc',
        fontWeight: 600,
        '::placeholder': {
            color: '#0077cc',
            fontWeight: 600,
            opacity: 1, 
        }
    },

    redBanner: {
        backgroundColor: '#e63946',
        color: '#fff',
        fontWeight: 700,
        padding: `${rem(16)} ${rem(8)}`, 
        textAlign: 'center',
        fontSize: rem(20.8), 
        display: 'flex',
        gap: rem(32),
        overflow: 'hidden',
    },
    scrollingText: {
        display: 'flex',
        gap: rem(48), 
        animation: `${scroll} 20s linear infinite`,
        whiteSpace: 'nowrap',
    },
    headerContent: {
        width: '90vw',
        marginInline: 'auto',        
        marginBlockStart: 0,          
        marginBlockEnd: 0,            
        backgroundColor: '#fec84f',
        paddingBottom: rem(24),      
        borderBottomLeftRadius: rem(20),
        borderBottomRightRadius: rem(20),
    },
    whitebackground:{
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: rem(24),
        borderBottomRightRadius: rem(24),
        marginInline: 'auto',        
        marginBlockStart: 0,         
        marginBlockEnd: 0,           
        padding: rem(32),            
        maxWidth: '86vw',
        display: 'flex',
        gap: rem(32),                 
        height: '70vh',
    },
    headertext: {
        flex: 1,
        minWidth: rem(300),
        paddingLeft: '5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    headingTitle: {
        marginBottom: rem(24),
        fontWeight: 800,
        lineHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: rem(20),
      },
    
      red: {
        color: '#e63946',
        fontSize: rem(32),
      },
    
      pink: {
        color: '#d63384',
        fontSize: rem(32),
      },
    
      yellow: {
        color: '#fec84f',
        fontSize: rem(32),
      },
    
      buttonAll: {
        display: 'inline-block',
        padding: `${rem(12)} ${rem(32)}`,
        backgroundColor: '#d62828',
        marginTop: rem(16),
        color: '#fff',
        textDecoration: 'none',
        borderRadius: rem(999),
        fontWeight: 700,
        fontSize: rem(16),
      },
      logo: {
        width: rem(160), 
        height: 'auto',
      },
      videoContainer: {
        flex: 1,
        minWidth: rem(300),
        position: 'relative',
        backgroundColor: '#fef3c7',
        borderRadius: rem(20),
        overflow: 'hidden',
        height: '60vh',
      },
}))

export default headerStyles
