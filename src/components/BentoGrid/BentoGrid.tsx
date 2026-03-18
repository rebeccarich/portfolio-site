import { ReactNode } from "react";
import styles from "./BentoGrid.module.css";

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return <section className={styles.grid}>{children}</section>;
}
