import * as React from "react";
import { PageProps } from "gatsby";
import { Text, Button, Group, List, ThemeIcon, Title, createStyles, rem, Container, Accordion, SimpleGrid } from "@mantine/core";
import { IconCheck, IconCookie, IconGauge, IconLock, IconMessage2, IconUser } from "@tabler/icons-react";
import { Layout } from "../components/Layout";

const AboutPage: React.FC<PageProps> = () => {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      position: 'relative',
      boxSizing: 'border-box',
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
    control: {
      height: rem(54),
      paddingLeft: rem(38),
      paddingRight: rem(38),
      [theme.fn.smallerThan('sm')]: {
        height: rem(54),
        paddingLeft: rem(18),
        paddingRight: rem(18),
        flex: 1,
      },
    },
    videoContainer: {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
      iframe: {
        width: "100%",
        height: "315px",
        border: "none",
        borderRadius: theme.radius.sm,
      },
    },
  }));

  const { classes } = useStyles();

  const MOCKDATA = [
    {
      icon: IconGauge,
      title: 'Extreme performance',
      description:
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    },
    {
      icon: IconUser,
      title: 'Privacy focused',
      description:
        'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    },
    {
      icon: IconCookie,
      title: 'No third parties',
      description:
        'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    },
    {
      icon: IconLock,
      title: 'Secure by default',
      description:
        'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
    },
    {
      icon: IconMessage2,
      title: '24/7 Support',
      description:
        'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
    },
  ];

  type FeatureProps = {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
  };

  function Feature({ icon: Icon, title, description }: FeatureProps) {
    return (
      <div>
        <ThemeIcon variant="light" size={40} radius={40}>
          <Icon size="1.1rem" stroke={1.5} />
        </ThemeIcon>
        <Text mt="sm" mb={7}>
          {title}
        </Text>
        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
          {description}
        </Text>
      </div>
    );
  }

  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Layout title="About">
      <div className={classes.wrapper}>
        <Container size="sm" className={classes.inner}>
          <h1 className={classes.title}>
            About{' '}
            <Text component="span" variant="gradient" gradient={{ from: 'pink', to: 'yellow', deg: 45 }} inherit>
              BV TV:
            </Text>{' '}
            Custom videos from your favourite talent
          </h1>

          <Text className={classes.description} color="dimmed">
            Order custom videos from Belgium's finest talent, to congratulate someone for an important event in their life.
            Wish your significant other a happy birthday, congratulate your family member on a new job or offer your best friend some life advice.
            Whatever the occasion, we got it covered.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={rem(12)} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Extensive talent pool</b> – we are the biggest talent video platform in Belgium and offer a 
              wide talent pool
            </List.Item>
            <List.Item>
              <b>Clear delivery times</b> – delivery times are displayed on every talent page with fast delivery
              options
            </List.Item>
            <List.Item>
              <b>24/7 customer support</b> – our team is always available to answer any questions you might have
                about BV TV
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button>
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
            <source src="https://res.cloudinary.com/del6u7j75/video/upload/v1732695692/810176fc-f5e9-498a-a7d1-d8e40398b755_elify7.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Container>


        <Container size="sm" className={classes.inner}>
          <Container size={560} p={0}>
            <Text size="sm" className={classes.description}>
              Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.
            </Text>
          </Container>

          <SimpleGrid
            mt={60}
            cols={3}
            spacing={50}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: 'xl' },
              { maxWidth: 755, cols: 1, spacing: 'xl' },
            ]}
          >
            {features}
          </SimpleGrid>
        </Container>

        <Container size="sm" className={classes.inner}>
          <Title align="center" className={classes.titleFAQ}>
            Frequently Asked Questions
          </Title>

          <Accordion variant="separated">
            <Accordion.Item className={classes.item} value="reset-password">
              <Accordion.Control>How can I reset my password?</Accordion.Control>
              <Accordion.Panel>
                Placeholder content
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>Can I create more that one account?</Accordion.Control>
              <Accordion.Panel>
                Placeholder content
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
              <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
              <Accordion.Panel>
                Placeholder content
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="credit-card">
              <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
              <Accordion.Panel>
                Placeholder content
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="payment">
              <Accordion.Control>What payment systems to you work with?</Accordion.Control>
              <Accordion.Panel>
                Placeholder content
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </Layout>
  );
};

export default AboutPage;
