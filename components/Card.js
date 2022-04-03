import Image from "next/image";
import { Card as MantineCard, Text, Button } from "@mantine/core";

const Card = ({ title, src }) => (
  <MantineCard shadow="md" p="md">
    <MantineCard.Section>
      <Image
        src={src}
        width={600}
        height={600}
        quality={100}
        alt="Card header"
      />
    </MantineCard.Section>
    <Text weight={500} size="md">
      {title}
    </Text>
  </MantineCard>
);

export default Card;
