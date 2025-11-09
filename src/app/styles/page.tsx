import StyleSection from "@/components/styles/style-section";
import TimedAudio from "@/components/audio/TimedAudio";

export default function FoldersPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 relative">
      {/* Page audio: same track as hero, with short snippet */}
      <TimedAudio
        src="/assets/sounds/page1/Ebb%20Tide.mp3"
        start={0}
        volume={0.6}
        fixed
        loop
      />
      <div className="container mx-auto px-4 py-6">
        {/* Style Folders Section */}
        <StyleSection />
      </div>
    </div>
  );
}
