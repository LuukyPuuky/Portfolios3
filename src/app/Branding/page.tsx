import Navigation from "@/components/navBar";

const BrandingPage = () => {
  return (
    <>
      <Navigation />
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Branding Project
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-center mb-6">
          Welcome to the Branding Project page! This project showcases my skills
          in creating compelling brand identities through design, strategy, and
          storytelling. Explore the various elements that make up a strong brand
          and see how I can help bring your brand vision to life.
        </p>
      </main>
    </>
  );
};
export default BrandingPage;
