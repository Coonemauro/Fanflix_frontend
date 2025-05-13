import * as React from "react"
import { Link, PageProps } from "gatsby"
import { Text, Button, Group, Title, createStyles, rem, Container, SimpleGrid, Card } from "@mantine/core";
import { IconShare, IconStars, IconUserCheck, IconVideo } from "@tabler/icons-react";
import { Layout } from "../components/Layout";

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

const JoinPage: React.FC<PageProps> = () => {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      position: 'relative',
      boxSizing: 'border-box',
      //backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    inner: {
      position: 'relative',
      paddingTop: rem(60),
      paddingBottom: rem(20),

      [theme.fn.smallerThan('sm')]: {
        paddingBottom: rem(80),
        paddingTop: rem(20),
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: rem(62),
      fontWeight: 900,
      lineHeight: 1.1,
      margin: 0,
      padding: 0,
      color: theme.white,

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(42),
        lineHeight: 1.2,
      },
    },

    description: {
      marginTop: theme.spacing.xl,
      fontSize: rem(24),

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(18),
      },
    },

    controls: {
      marginTop: `calc(${theme.spacing.xl} * 2)`,

      [theme.fn.smallerThan('sm')]: {
        marginTop: theme.spacing.xl,
      },
    },

    control: {
      height: rem(54),
      paddingLeft: rem(48),
      paddingRight: rem(48),

      [theme.fn.smallerThan('sm')]: {
        height: rem(54),
        paddingLeft: rem(18),
        paddingRight: rem(18),
        flex: 1,
      },
    },

    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: `${rem(4)} ${rem(12)}`,
    },

    titleFAQ: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },

    item: {
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing.lg,
      border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    feature: {
      position: 'relative',
      paddingTop: theme.spacing.md,
      paddingLeft: theme.spacing.md,
    },

    overlay: {
      position: 'absolute',
      height: rem(100),
      width: rem(160),
      top: 0,
      left: 0,
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      zIndex: 1,
    },

    content: {
      position: 'relative',
      zIndex: 2,
    },

    icon: {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },

    titleCard: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    card: {
      border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

  }));

  const { classes } = useStyles();

  const mockdata = [
    {
      icon: IconUserCheck,
      title: 'Register your account',
      description:
        'Click Join as talent to complete account set up. We’ll verify your identity and then you’ll be ready to shine.',
    },
    {
      icon: IconShare,
      title: 'Share your profile',
      description:
        'Add your profile link to your social media bio and let fans know you’re ready for requests.',
    },
    {
      icon: IconVideo,
      title: 'Record and earn',
      description:
        'Fulfill fan requests on your schedule and earn money.',
    },
    {
      icon: IconStars,
      title: 'Feel the magic',
      description:
        'Deepen connections with fans, grow your brand, and watch the magic unfold.',
    },

  ];

  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);


  function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
    const { classes, cx } = useStyles();

    return (
      <Card key={title} shadow="md" radius="md" className={classes.card} padding="xs">
        <div className={cx(classes.feature, className)} {...others}>
          <div className={classes.content}>
            <Icon size={rem(30)} className={classes.icon} stroke={1.5} />
            <Text fw={600} fz="sm" mb="xs" mt={5} className={classes.titleCard} >
              {title}
            </Text>
            <Text c="dimmed" fz="sm">
              {description}
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Layout title="Join as talent">
      <div className={classes.wrapper}>
        <Container size="sm" className={classes.inner}>
          <h1 className={classes.title}>
            Get paid to connect with {' '}
            <Text component="span" variant="gradient" gradient={{ from: 'pink', to: 'yellow', deg: 45 }} inherit>
              fans
            </Text>{' '}
          </h1>

          <Text className={classes.description} color="dimmed">
            Record personalized videos from your phone and start earning.
          </Text>

          <Group mt={40} position="center">
            <Link to="https://bvtvstudio.netlify.app/register" target="_blank">
            <Button radius="xl" size="xl" className={classes.control}>
              Join as talent
            </Button>
            </Link>
          </Group>
        </Container>

        {/* Video Section */}
        <Container size="sm" className={`${classes.inner} ${classes.videoContainer}`}>
          <video
            width="210"
            height="410"
            controls
            preload="metadata"
            style={{ borderRadius: '8px' }}
          >
            <source src="https://res.cloudinary.com/del6u7j75/video/upload/v1732695715/b13a71e1-c207-4fdb-ac42-63826c7e455a_wkfajd.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Container>

        <Container size="sm" className={classes.inner}>
          <Title align="center" className={classes.titleFAQ}>
            Getting started is easy
          </Title>
          <Text size="sm" className={classes.description}>
            Set up your account and start connecting with fans in minutes.
          </Text>
          <SimpleGrid
            cols={2}
            breakpoints={[
              { maxWidth: 'sm', cols: 2 },
              { maxWidth: 'xs', cols: 1 }
            ]}
            spacing={20}
          >
            {items}
          </SimpleGrid>
          <Group mt={40} position="center">
            <Link to="https://bvtvstudio.netlify.app/register" target="_blank">
            <Button radius="xl" size="xl" className={classes.control}>
              Join as talent
            </Button>
            </Link>
          </Group>

        </Container>

      </div>
    </Layout>
  )
}

export default JoinPage
