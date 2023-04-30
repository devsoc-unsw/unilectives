'use client'
import { Content } from "./style";
import { Logo } from "./page_components/Logo";
import { HomeText } from "./page_components/HomeText";

export default function Home() {
  return (
    <Content>
      <Logo />
      <HomeText />
    </Content>
  );
}