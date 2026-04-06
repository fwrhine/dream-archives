"use client";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    period: "",
  });

  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date());

      setTime({
        hour: parts.find((p) => p.type === "hour")?.value || "",
        minute: parts.find((p) => p.type === "minute")?.value || "",
        period: parts.find((p) => p.type === "dayPeriod")?.value || "",
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      bgColor="white"
      padding={0}
      gap={0}
      border="2px solid black"
      className={"manga-dots border border-black"}
      width="172px"
    >
      <Stack padding={2} gap={0} paddingBottom={2} paddingRight={2}>
        <Text textAlign="right" fontWeight={"bold"} fontSize={"3xl"}>
          {time.hour}:{time.minute}
        </Text>
        <HStack alignItems="right" justifyContent="right">
          <Image src={"/images/moon.png"} height={"25px"} width={"25px"} />
          <Text textAlign="right" fontWeight={"bold"} fontSize={"xl"}>
            {time.period}
          </Text>
        </HStack>
      </Stack>
      <Stack height="2px" bgColor="black" />
      <Stack padding={1} paddingRight={2}>
        <Text textAlign="right" fontWeight={"bold"} fontSize={"15px"}>
          2412-98
        </Text>
      </Stack>
    </Stack>
  );
}
