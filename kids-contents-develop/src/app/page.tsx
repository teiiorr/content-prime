import { HomePage } from "@/components";

// Revalidate every 60 seconds
export const revalidate = 60;

export default function Home() {
  return <HomePage />;
}
