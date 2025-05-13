import * as React from "react"
import { HeadFC, Link, PageProps } from "gatsby"
import { Button, Container, Group, Title, createStyles, rem, Text } from "@mantine/core";
import Seo from "../components/Seo";

const NotFoundPage: React.FC<PageProps> = () => {
  const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: rem(80),
      paddingBottom: rem(80),
    },

    label: {
      textAlign: 'center',
      fontWeight: 900,
      fontSize: rem(220),
      lineHeight: 1,
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(120),
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: 'center',
      fontWeight: 900,
      fontSize: rem(38),

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(32),
      },
    },

    description: {
      maxWidth: rem(500),
      margin: 'auto',
      marginTop: theme.spacing.xl,
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
  }));

  const { classes } = useStyles();

  return (
    <Seo title="Page not found">
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group position="center">
          <Link to="/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </Seo>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
