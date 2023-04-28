'use client'
import { UniLectives } from "@/components/image/imageIndex";
import {
  Content, 
  HomeHeader,
  Logo,
  Flexbox,
  LandingFlexbox,
  HomeText,
  AddReviewButtonFlexbox,
  AddReviewButton,
  LandingTextFlexbox,
  TextFlexbox,
  SearchbarFlexbox,
  Searchbar,
  WidgetFlexbox,
  SortFlexbox,
  FilterFlexbox,
  WidgetOption
} from "./style";

export default function Home() {
  return (
    <Content>
      <HomeHeader>
        <Logo src={UniLectives} />
      </HomeHeader>
      <Flexbox>
        <LandingFlexbox padding="10em">
          <LandingTextFlexbox>
            <TextFlexbox padding="18em">
              <HomeText fontFamily={"Lato"} fontStyle={"italic"} fontSize="15px">
                CSEsoc presents
              </HomeText>
              <HomeText
                fontFamily={"Poppins"}
                fontWeight={"bold"}
                fontSize="70px"
                color="#1279F2"
              >
                uni-lectives
              </HomeText>
              <HomeText fontFamily={"Lato"} fontWeight={"bold"} fontSize="15px">
                Your one-stop shop for UNSW course and elective reviews.
              </HomeText>
            </TextFlexbox>
            <AddReviewButtonFlexbox padding="18em">
                <AddReviewButton bg="#1279F2">
                  <HomeText fontFamily="{Lato}" fontSize="15px">Add a Review</HomeText>
                </AddReviewButton>
            </AddReviewButtonFlexbox>
          </LandingTextFlexbox>
        </LandingFlexbox>
      </Flexbox>
      <Flexbox>
        <SearchbarFlexbox padding="3em">
          <Searchbar padding="18em">
            [Search bar goes here... ngl i think this component has already been written but i don't rlly get how it works so i wrote this]
          </Searchbar>
          <WidgetFlexbox padding="18em">
            <SortFlexbox padding="1em">
              <HomeText fontFamily="{Lato}" fontSize="15px">Sort by:</HomeText>
              <WidgetOption>
                <HomeText fontFamily="{Lato}" fontSize="15px">Most reviews</HomeText>
                <HomeText fontFamily="{Lato}" fontSize="15px">[Down arrow]</HomeText>
              </WidgetOption>
            </SortFlexbox>
            <FilterFlexbox padding="1em">
            <HomeText fontFamily="{Lato}" fontSize="15px">Filter by: </HomeText>
              <WidgetOption>
                <HomeText fontFamily="{Lato}" fontSize="15px">Faculty</HomeText>
                <HomeText fontFamily="{Lato}" fontSize="15px">[Down arrow]</HomeText>
              </WidgetOption>
              <WidgetOption>
                <HomeText fontFamily="{Lato}" fontSize="15px">Term</HomeText>
                <HomeText fontFamily="{Lato}" fontSize="15px">[Down arrow]</HomeText>
              </WidgetOption>
            </FilterFlexbox>
          </WidgetFlexbox>
        </SearchbarFlexbox>
      </Flexbox>
    </Content>
  );
}