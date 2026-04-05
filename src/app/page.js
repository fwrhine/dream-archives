import Time from "@/components/time";
import styles from "./page.module.css";
import { Box, HStack, Image, Separator, Stack, Text } from "@chakra-ui/react";
import Menu from "@/components/menu";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HStack alignItems="top">
          <Stack>
            <Time />
            <Menu />
          </Stack>
          <Stack border="2px solid black" gap={0}>
            <HStack
              bgColor="white"
              justifyContent={"center"}
              w="full"
              paddingLeft={2}
              paddingRight={2}
              border={"2px solid black"}
            >
              <Text>✧</Text>
              <Box flex="1" height="2px" bgColor="black" />
              <Text fontWeight={"bold"} textAlign={"center"}>
                Central Node
              </Text>
              <Box flex="1" height="2px" bgColor="black" />
              <Text>✧</Text>
            </HStack>
            <Image src={"/images/modules/central_node.webp"} width="600px" />
          </Stack>
        </HStack>
      </main>
    </div>
  );
}
