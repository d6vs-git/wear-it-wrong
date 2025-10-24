import HeroSection from "@/components/hero-section";
import InfoSection from "@/components/info-section";
import InstagramSection from "@/components/instagram-section";
import StyleSection from "@/components/style-section";
import SectionSlideshow from "@/components/section-slideshow";
import ReviewSection from "@/components/ review-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StyleSection />
      <InfoSection />
      <InstagramSection />
      <SectionSlideshow />
      <ReviewSection />
    </>
  );
}
