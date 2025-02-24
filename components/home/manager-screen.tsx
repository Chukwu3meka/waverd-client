"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Autoplay from "embla-carousel-autoplay";

import { COMPETITIONS } from "@lib/constants";
import { Button } from "@components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const Breadcrumb = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.Breadcrumb)),
  BreadcrumbPage = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbPage)),
  BreadcrumbItem = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbItem)),
  BreadcrumbLink = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbLink)),
  BreadcrumbList = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbList)),
  BreadcrumbEllipsis = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbEllipsis)),
  BreadcrumbSeparator = dynamic(() => import("@/components/ui/breadcrumb").then((x) => x.BreadcrumbSeparator)),
  clubs = ["club00001", "club00043", "club00021", "club00031", "club00024", "club00002", "club00026", "club00022", "club00042", "club00011", "club00025"];

const Manager = () => (
  <div className="bg-secondary p-2.5 pt-10 rounded-t-2xl" data-testid="manager" style={{ clipPath: "polygon(100% 0, 0 5%, 0% 100%, 100% 100%)" }}>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>WaveRD</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Soccer Manager</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div className="flex flex-col gap-8 py-10 px-5" data-testid="manager">
      <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: "center", loop: true }} className="w-full max-w-screen hidden md:block">
        <CarouselContent>
          {COMPETITIONS.map(({ id, image, title }) => (
            <CarouselItem key={id} className="md:basis-1/3 lg:basis-1/5 flex items-center justify-center">
              <Image src={image} alt={`WaveRD - ${title}`} width={70} height={70} className="w-auto h-auto" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col md:flex-row items-center justify-center gap-y-7">
        <div className="border flex flex-col items-center max-w-xs rounded-3xl overflow-hidden gap-4 pb-5 shadow-2xl">
          <Image alt="WaveRD Clubs" src="/images/layout/intro-signup.webp" width={300} height={150} className="w-full h-52" />
          <p className="text-center pl- pr-6">Rise to the challenge and outshine the best managers. Lead your team to ultimate victory — join now and take control!</p>
          <Link href="/accounts/signup">
            <Button>Sign up</Button>
          </Link>
        </div>

        <Image
          width={150}
          height={150}
          alt="WaveRD Clubs"
          src="/images/layout/privacy.png"
          className="rounded-full overflow-hidden h-32 w-32 -mx-12 z-10 hidden md:block shadow-2xl"
        />

        <div className="border flex flex-col items-center max-w-xs rounded-3xl overflow-hidden gap-4 pb-5 shadow-2xl">
          <Image alt="WaveRD Clubs" src="/images/layout/intro-signin.webp" width={300} height={150} className="w-full h-52" />
          <p className="text-center pr-1 pl-6">Assemble your team, manage finances, crush the competition and lead your players to glory — they're counting on you!</p>
          <Link href="/accounts/signin">
            <Button>Sign in</Button>
          </Link>
        </div>
      </div>

      <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: "center", loop: true }} className="w-full max-w-screen hidden md:block">
        <CarouselContent>
          {clubs.map((club, index) => (
            <CarouselItem key={club} className="md:basis-1/3 lg:basis-1/5 flex items-center justify-center">
              <Image src={`/images/clubs/${club}.webp`} alt={`WaveRD ${index + 1}`} width={40} height={40} className="w-auto h-auto" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>
);

export default Manager;
