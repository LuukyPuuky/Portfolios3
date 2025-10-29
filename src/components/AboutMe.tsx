"use client";

const AboutMe = () => {
  return (
    <div className="flex flex-col justify-center h-full text-white p-8 md:p-16 space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
        About Me
      </h2>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
        I am Luuk Steijaert, I am from Helmond and I love to create websites. I
        am a passionate developer with a love for creating dynamic and
        interactive web applications. I started with Fontys and thought at first
        to pursue software development but then later fell in love with
        Frontend.
      </p>

      <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
        In my free time, you can find me climbing, gaming, or hiking.
      </p>
    </div>
  );
};
export default AboutMe;
