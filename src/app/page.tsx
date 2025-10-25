import { BookNowButton } from "@/components/book-now-button";
import BrandSection from "@/components/brands-section";
import FontDemo from "@/components/fonts";
import { Heading } from "@/components/heading";
import PersonalSection from "@/components/people-components/personal-section";
import PeopleSection from "@/components/people-section";
import SpaceSection from "@/components/space-section";
import StyleSection from "@/components/styles/style-section";

export default function Home() {
  return (<>
  {/* <Heading text="Font Demo" />
  <FontDemo />
  <BookNowButton /> */}

  <PeopleSection/>
  </>
  );
}