import Time from "@/components/time";
import styles from "./page.module.css";
import { Stack, Text, Image, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Time />
      </main>
    </div>
  );
}
