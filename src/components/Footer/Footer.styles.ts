import { createStyles, rem } from '@mantine/core'

const footerStyles = createStyles(theme => ({
  banner: {
    width: '100%',
  },
  footer: {
    backgroundColor: '#061035',
    position: 'relative',
    paddingTop: rem(80),   
    paddingBottom: rem(40), 
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  logoimage: {
    width: '180px',
    height: 'auto',
  },
  footericon: {
    width: "24px",
    height: "24px",  
  },
  footercontent: {
    backgroundColor: '#121C40',
    marginLeft: rem(32),
    marginRight: rem(32),
    borderRadius: rem(16), 
    padding: rem(24),
    color: theme.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  contactinfo: {
    marginTop: rem(24), 

    [theme.fn.largerThan('md')]: {
      marginTop: 0, 
    },

    textAlign: 'right',
    fontWeight: 600, 
    fontSize: theme.fontSizes.sm, 

    '& > * + *': {
      marginTop: rem(4), 
    },
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    gap: rem(24),
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  item: {
    fontWeight: 600,
    textDecoration: 'underline',
    color: '#FFC845',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  itemcontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: rem(16), 

  },
}))

export default footerStyles
