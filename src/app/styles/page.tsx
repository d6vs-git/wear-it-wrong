import SearchBar from "@/components/ui/search-bar";
import StyleSection from "@/components/styles/style-section";

export default function FoldersPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Search Section */}
        {/* <div className="max-w-3xl mx-auto mb-8">
          <SearchBar
            variant="page"
            className="w-full"
            placeholder="Search styles..."
          />
        </div> */}

        {/* Style Folders Section */}
        <StyleSection />
      </div>
    </div>
  );
}
