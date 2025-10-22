import Navigation from "@/components/navBar";
import TextAnimation from "@/components/TextAnimation";

export default function Home() {
  return (
    <div className="text-[#f3ec]">
      <TextAnimation text="Hello, World!" />
      <Navigation />
    </div>
  );
}
