'use client'
import { Content } from "./style";
import { Logo } from "./page_components/Logo";
import { HomeText } from "./page_components/HomeText";
import { Searchbar } from "./page_components/Searchbar";

export default function Home() {
  return (
    <Content>
      <Logo />
      <HomeText />
      <Searchbar />
    </Content>
  );
}