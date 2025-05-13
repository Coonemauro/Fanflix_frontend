import { Text, SimpleGrid, Card, Group, Stack, Title, createStyles } from '@mantine/core';
import React from 'react';
import { useIntl, Link } from 'gatsby-plugin-intl';
import { useElementSize } from "@mantine/hooks";
import { Box } from "@mantine/core";


const useStyles = createStyles((theme) => ({
    shapeContainer: {
        position: 'relative',
    },
    shape: {
        padding: '0.8rem',
        display: 'flex',
        gap: '1rem',
        width: 300,
        height: 173,
        backgroundColor: '#fcfcfc',
        clipPath: `path('M30.68 173H201.88c17.21 0 31.21-13.5 31.21-30.1 0-7.5 3.37-14.6 9.47-20.4 6.83-6.2 15.51-9.6 24.29-9.6 17.21 0 31.2-13.5 31.2-30.1V30.4c0-16.5-13.58-30-30.5-30H30.68C13.03 0 0 13.5 0 30.4v112.3C0 159.5 13.03 173 30.68 173Z')`
    },
    img_talents: {
        borderRadius: '1rem',
        height: '100%',
        width: '-webkit-fill-available',
        objectFit: 'cover',
    },
    left_gradient: {
        position: 'absolute',
        left: '4%',
        background: 'linear-gradient(to right, #EBF1FF 0%, transparent)',
        width: '20vw',
        height: '60%',
        top: '20%',
        zIndex: 1000,
    },
    right_gradient: {
        position: 'absolute',
        right: '4%',
        background: 'linear-gradient(to left, #EBF1FF 0%, transparent)',
        width: '20vw',
        height: '60%',
        borderRadius: '2rem',
        top: '20%',
        zIndex: 1000,
    },
    cirkel: {
        position: 'absolute',
        right: '5px',
        bottom: '5px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#F5C153',
        textDecoration: 'none',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
    }
}));
interface Talent {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: { url: string }[];
  active: boolean;
}

interface WarmeFanflixersProps {
  talents: { node: Talent }[];
}
const WarmeFanflixers: React.FC<WarmeFanflixersProps> = ({talents}) => {
    const intl = useIntl();
    const { classes } = useStyles();
    return (
        <>
        <Box sx={{ position: 'relative', height: '100%', width: '90vw', padding: '2rem', backgroundColor: 'white', borderRadius: '3rem', margin: '0 auto' }}>
            <svg style={{width: '100%'}} xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 1556.214 729.571">
                <path id="Intersection_3" data-name="Intersection 3" d="M-13875.479-497.5A52.412,52.412,0,0,1-13928-549.792v-624a52.409,52.409,0,0,1,52.522-52.282h1450.168a52.406,52.406,0,0,1,52.523,52.282v515.358a52.647,52.647,0,0,1-15.293,32.074,53.034,53.034,0,0,1-33.413,15.321c-.454.035-.909.063-1.374.091h-.018c-.988-.063-1.988-.091-3-.091h-489.645a57.7,57.7,0,0,0-10.734,1,57.028,57.028,0,0,0-29.614,15.632,56.526,56.526,0,0,0-16.712,40.163,56.53,56.53,0,0,1-16.708,40.166,57.013,57.013,0,0,1-37.66,16.572Z" transform="translate(13928.502 1226.57)" fill="#ebf1ff" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            </svg>
            
            <div className={classes.left_gradient}></div>
            <div className={classes.right_gradient}></div>
            <Box sx={{position: 'absolute', top: '8%', left: '5%'}}>
                <Text sx={{color: 'black', fontSize: '2.5rem', fontWeight: 500, textTransform: 'uppercase'}}>{intl.formatMessage({ id: 'meet.our_fanflixers' })}</Text>
            </Box>
            
            <Link to="/browse/actors" style={{textDecoration: 'none',color: 'inherit',width: '100%', fontWeight: 600, textTransform: 'uppercase', fontSize: '1.5rem'}}>
                <Box style={{position: 'absolute', display: 'flex',justifyContent: 'space-between',alignItems: 'center',backgroundColor: '#F5C153',bottom: '7.5%',right: '2rem',width: '32vw',borderRadius: '2.3rem',padding: '0.75rem 2rem',fontSize: '1.5rem',color: 'black',}}>
                    <span>Ontdek ze allemaal!</span>
                    <span style={{fontSize:'2rem'}}>→</span>
                </Box>
            </Link>

            <Box sx={{position: 'absolute', top: '25%', left: '5%', width: '90%', overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none','&::-webkit-scrollbar': {display: 'none', },}}>
                <Box sx={{display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', gridAutoFlow: 'column', gap: '1rem'}}>
                    {talents && talents.length > 0 && talents.map((talentNode) => {
                          const talent = talentNode.node;
                          if (talent.active && talent.image && talent.image.length > 0) {
                            return (
                                <>
                                    <Link to={`${talent.slug}`} key={talent.slug} className={classes.shapeContainer}>
                                        <div className={classes.shape}>
                                            <div style={{width: '33%'}}>
                                                <img src={talent.image[0].url} alt={talent.name} className={classes.img_talents}/>
                                            </div>
                                            <Box>
                                                <Title order={4} sx={{ padding: 0 }}>{talent.name}</Title>
                                                <Text>{talent.description}</Text>
                                                <Text>€ {talent.price}</Text>
                                            </Box>
                                            
                                        </div>
                                        <div className={classes.cirkel}>↗</div>
                                    </Link>
                                </>
                            );
                          }
                        })}
                        <div className={classes.shape}></div>
                        <div className={classes.shape}></div>
                        <div className={classes.shape}></div>
                        <div className={classes.shape}></div>
                        <div className={classes.shape}></div>
                </Box>
            </Box>
            

        </Box>
        </>
    );
};

export default WarmeFanflixers;
