import { Text, SimpleGrid, Card, Group, Stack, Title, createStyles } from '@mantine/core';

import React from 'react';
import { useIntl, Link } from 'gatsby-plugin-intl';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'absolute',
        width: '74%',
        bottom: '15.5%',
        left: '5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        alignItems: 'center',
        gap: '2rem',
        color: 'black',
        textAlign: 'center',
      },
      card: {
        background: 'transparent',
        boxShadow: 'none',
        color: 'black',
      },
      title: {
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        fontWeight: 600,
        lineHeight: 1.2,
        marginBottom: '0.25rem',
      },
      description: {
        fontSize: '0.75rem',
      },
      title_howto: {
        position: 'absolute',
        bottom: '32%',
        fontWeight: 500,
        left: '6%',
        color: 'black',
        textTransform: 'uppercase',
        fontSize: '2.5rem',
      },
      how_it_works: {
        position: 'absolute',
        textTransform: 'uppercase',
        bottom: '30%',
        left: '6%',
        fontSize: '0.8rem',
        fontWeight: 500,
        color: 'black',
      }
      
}));

interface FeatureProps {
  title: string;
  description: string;
}

const HowTo: React.FC = () => {
  const intl = useIntl();
  const { classes } = useStyles();

  const mockdata: FeatureProps[] = [
    {
      title: intl.formatMessage({ id: 'how.find' }),
      description: intl.formatMessage({ id: 'how.find_desc' }),
    },
    {
      title: intl.formatMessage({ id: 'how.tell' }),
      description: intl.formatMessage({ id: 'how.tell_desc' }),
    },
    {
      title: intl.formatMessage({ id: 'how.get' }),
      description: intl.formatMessage({ id: 'how.get_desc' }),
    },
    {
      title: intl.formatMessage({ id: 'how.share' }),
      description: intl.formatMessage({ id: 'how.share_desc' }),
    },
  ];

  return (
    <>
      <Title className={classes.title_howto} order={3}>{intl.formatMessage({ id: 'how.BVTV_works' })}</Title>
      <Group className={classes.how_it_works}>
        <Text>{intl.formatMessage({ id: 'how.how_it_works' })}</Text>
        <Link to="/about" style={{ textDecoration: 'underline', color: 'inherit' }}>
          {intl.formatMessage({ id: 'how.learn_more' })}
        </Link>      
      </Group>
      <div className={classes.wrapper}>
        {mockdata.map((item) => (
          <Card key={item.title} className={classes.card}>
            <Title order={4} className={classes.title}>{item.title}</Title>
            <Text className={classes.description}>{item.description}</Text>
          </Card>
        ))}
      </div>
      
    </>
  );
};

export default HowTo;
