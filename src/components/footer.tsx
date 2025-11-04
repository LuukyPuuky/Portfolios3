export default function footer() {
  return (
    <footer className=" border-t border-zinc-800 text-white pt-6 text-xs  flex justify-between w-full mx-auto px-8 sm:px-16 lg:px-24 pb-8 ">
      <span>Luuk Steijaert &#169; {new Date().getFullYear()}</span>
    </footer>
  );
}
