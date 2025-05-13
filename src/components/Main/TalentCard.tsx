import React from "react";
import { useHover, useMergedRef } from "@mantine/hooks";
import { Stack, Image, Text, Box } from "@mantine/core";
import { navigate } from "gatsby-plugin-intl";

type TalentCardProps = {
  slug: string
  name: string
  imageURL: string
  description: string
  price: number
  group: boolean
  cardWidthNormal: number,
  cardWidthMobile: number
}

const TalentCard: React.FC<TalentCardProps> = ({ slug, name, imageURL, description, price, group, cardWidthNormal, cardWidthMobile }) => {
  function getCardContent() {
    const hoverHook = useHover();
    /*
    const { ref, width, height } = useElementSize();
    const [calculatedHeight, setCalculatedHeight] = useState<number>(0);
    useEffect(() => {
      setCalculatedHeight(width * 1.2)
    }, [width]);
    
    const boxRef = useMergedRef(hoverHook.ref, ref)
    */
    const boxRef = useMergedRef(hoverHook.ref)
    return (
      <Stack spacing="xxs"
        style={{
          cursor: 'pointer',
          //border: '1px solid lightblue'
        }}
        onClick={event => {
          navigate(`/${slug}`)
        }}>
        <Box
          ref={boxRef}
          miw={150}
          mih={250}

          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '10px',
            zIndex: '2',
            background: 'black',
            //height: '100%'
          }}
        >
          <Image
            src={imageURL}
            fit="scale-down"
            style={{
              //border: '1px solid gray',
              zIndex: '1',
              position: 'absolute',
              top: '50%',
              //height: '100%',
              transform: hoverHook.hovered ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(1)',
              transition: 'transform 0.2s ease-in-out'
            }}
          />
        </Box>
        <Text weight={600} size="md" truncate pt={10}>{name}</Text>
        <Text size="sm" color="dimmed" truncate>{description}</Text>
        <Text weight={600} size="md" >€{price}</Text>
      </Stack>
    )
  }

  const cardContent = getCardContent()
  return (
    <>
    {group ? (
      <Box 
        maw={{ base: cardWidthMobile, sm: cardWidthNormal }}
        mah={{ base: 330, sm: 330 }}
        miw={{ base: cardWidthMobile, sm: cardWidthNormal }}
        mih={{ base: 330, sm: 330 }}
        px={8}
      >
        {cardContent}
      </Box>
    ) : (
      cardContent
    )}
    </>
  )
}

export default TalentCard