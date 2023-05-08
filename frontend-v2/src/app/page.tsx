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

export async function getServerSideProps() {
  const response = await fetch('localhost:3030/api/v1/courses', {
    method: 'GET'
  });
  const data = await response.json();

  return {
    props: {
      courses: data,
      reviews: data
    }
  }
}