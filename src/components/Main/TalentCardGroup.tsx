import React, { useRef, useState } from "react";
import { Group, Title, ScrollArea, Stack, Button, createStyles, Text, useMantineTheme } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import TalentCard from "./TalentCard";
import { useElementSize } from "@mantine/hooks";
import { useIntl, Link } from "gatsby-plugin-intl";

type TalentCardGroupProps = {
  title: string
  link: string | undefined
  talents: Array<any>
  serverTalents: any
}

const TalentCardGroup: React.FC<TalentCardGroupProps> = ({ title, link, talents, serverTalents }) => {
  // SSR
  if (serverTalents !== undefined && talents !== null && talents !== undefined && talents.length > 0) {
    talents.map((talentNode, index) => {
      const serverTalent = serverTalents.data.find((talent: { id: any; }) => talent.id === talentNode.node.strapi_id)
      if (serverTalent) {
        talents[index].node.price = serverTalent.attributes.price
        talents[index].node.description = serverTalent.attributes.description
        talents[index].node.active = serverTalent.attributes.active
      }
    })
  }

  const useStyles = createStyles((theme) => ({
    hiddenMobile: {
      [theme.fn.smallerThan('321')]: {
        display: 'none',
      },
    },
  }))
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const cardWidthNormal = 210
  const cardWidthMobile = 160

  const activeTalentCount = talents.filter((talent) => talent.node.active).length

  const viewport = useRef<HTMLDivElement>(null);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  function handleScrollRight() {
    let cardWidth = theme.fn.smallerThan("sm") ? cardWidthMobile : cardWidthNormal
    viewport.current?.scrollTo({ left: scrollPosition.x + cardWidth * 2, behavior: 'smooth' });
  }
  function handleScrollLeft() {
    let cardWidth = theme.fn.smallerThan("sm") ? cardWidthMobile : cardWidthNormal
    viewport.current?.scrollTo({ left: scrollPosition.x - cardWidth * 2, behavior: 'smooth' });
  }

  const { ref } = useElementSize();

  const intl = useIntl()
  
  return (
    <Stack justify="flex-start" spacing="md" ref={ref}>
      <Group position="apart" maw={{ base: cardWidthMobile * activeTalentCount, sm: cardWidthNormal * activeTalentCount }}>
        <Group align="baseline">
          <Title order={4} > {title} </Title>
          {link &&
            <Link to={`${link}`} style={{ textDecoration: 'none' }}>
              <Text size="sm" color="dimmed">
                {intl.formatMessage({ id: "common.see_all" })}
              </Text>
            </Link>
          }
        </Group>
        {talents && talents.length > 3 &&
        <Group spacing="0.3rem" className={classes.hiddenMobile}>
          <Button
            onClick={handleScrollLeft}
            variant="default"
            color="gray"
            size="xs"
            disabled={scrollPosition.x <= 0}
            sx={{
              '&[data-disabled]': { opacity: 0.3 },
              width: '115px'
            }}
            w={32}
            p={0}
          ><IconChevronLeft size={15} color='white' /></Button>
          <Button
            onClick={handleScrollRight}
            variant="default"
            color="gray"
            size="xs"
            disabled={
              scrollPosition.x >= (viewport.current?.scrollWidth ?? 1) - (viewport.current?.clientWidth ?? 0)
            }
            sx={{
              '&[data-disabled]': { opacity: 0.3 },
            }}
            w={32}
            p={0}
          ><IconChevronRight size={15} color='white' /></Button>
        </Group>
        }
      </Group>
      <ScrollArea type="never" viewportRef={viewport} onScrollPositionChange={onScrollPositionChange}>
        <Group noWrap w={{ base: cardWidthMobile * activeTalentCount, sm: cardWidthNormal * activeTalentCount }} spacing={0}>
          {talents && talents.length > 0 && talents.map((talentNode) => {
            var talent = talentNode.node
            if (talent.active === true && talent.image && talent.image.length > 0) {
              return (
                <TalentCard
                  key={talent.slug}
                  slug={talent.slug}
                  name={talent.name}
                  imageURL={talent.image[0].url}
                  description={talent.description}
                  price={talent.price}
                  group={true}
                  cardWidthNormal={cardWidthNormal}
                  cardWidthMobile={cardWidthMobile}
                />
              )
            }
          })}
        </Group>
      </ScrollArea>
    </Stack>
  )
}

export default TalentCardGroup