import React from "react";
import BackgroundImage from "@/components/ui/BackgroundImage";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { routes } from "@/lib/routes";

type HeroProps = {
  className?: string;
};

const Hero = ({ className = "" }: HeroProps) => {
  return (
    <section className={`${className}`}>
      <BackgroundImage src="/images/hero-bg.avif">
        <div className="container py-64 text-center max-w-[52rem]">
          <Title variant="h1" className="heading-clip tracking-wide" size="xl">
            Automate Web Tasks, Effortlessly
          </Title>
          <Text className="my-9">
            Scrapmatic simplifies data extraction with no-code tools and
            customizable AI, saving you time and effort.
          </Text>
          <Button variant="primary" className="mx-auto" href={routes.app.home}>
            Get Started
          </Button>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default Hero;
