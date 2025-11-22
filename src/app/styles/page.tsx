import StyleSection from "@/components/styles/style-section";
import TimedAudio from "@/components/audio/timed-audio";

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
      <div className="flex justify-center items-start md:items-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
        {/* Style Folders Section */}
        <StyleSection />
      </div>
    </div>
  );
}