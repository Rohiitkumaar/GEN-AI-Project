import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="h-80 w-80">
        <DotLottieReact
          src="https://lottie.host/1954b92f-2dfc-4b52-824b-e68477e9e23f/0FwYMfFmcZ.lottie"
          loop
          autoplay
        />
      </div>
    </main>
  );
};

export default Loader;
