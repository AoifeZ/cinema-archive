const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-1 my-8 md:mt-12">
      <p className="text-center text-[0.875rem] text-almost-black dark:text-white">
        AoifeZ &#169; {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
