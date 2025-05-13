import { createStyles, rem } from '@mantine/core'

const headerStyles = createStyles(theme => ({
    header: {
        position: 'fixed',
        top: 0,
        zIndex: 100000,
        width: '100%',
        //maxWidth: '16',
        left: '50%',
        transform: 'translateX(-50%)'
    },

    zTop: {
        zIndex: 100000,
    },

    logo: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 20,
        marginRight: 0,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 1000,
        fontSize: 24,

        [theme.fn.smallerThan(450)]: {
            fontSize: 20,
            paddingLeft: 6,
            paddingRight: 6,    
            marginLeft: 8,
            marginRight: 0,
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.white,
        fontWeight: 550,
        fontSize: theme.fontSizes.md,
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

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
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

    search: {
        paddingRight: theme.spacing.sm,
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },
}))

export default headerStyles
