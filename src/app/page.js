import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Test!</Button>
      </main>
    </div>
  );
}
