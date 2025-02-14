"use client";

import apiHubStyles from "./apiHub.module.scss";

import Link from "next/link";
// import { textToId } from "utils/utils";
import { VscHome } from "react-icons/vsc";
import { FaCartPlus } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { MdNetworkCheck } from "react-icons/md";
// import { Breadcrumb, Button, div, div, Row, span } from "antd";
import Image from "next/image";
import { textToId } from "@lib/helpers";
import { Button } from "@components/ui/button";

import { COMPETITIONS } from "@lib/constants";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ApiHub = () => (
  <div className="bg-secondary p-2.5" data-testid="manager">
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
            <Link href="/">API Hub</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-6xl mx-auto px-10">
      <div className="col-span-1">
        <Image width={400} height={400} src="/images/layout/intro-apihub.png" alt="WaveRD API HUB welcome image" className="w-full h-96" />
      </div>

      <main className="col-span-1 md:col-span-2">
        <p className="font-bold text-xl">- WHY DO ANYTHING?</p>

        <p className="font-extrabold text-4xl my-5 text-center px-4">Let's handle the Football data for your business</p>

        <div>
          {apihubFeatures.map(({ Icon, title, description }) => (
            <div className="mb-8 flex" key={title}>
              <div className="w-12">
                <Button aria-label={textToId(title)} size="icon" variant="ghost">
                  <Icon />
                </Button>
              </div>

              <div className="flex-1 flex flex-col">
                <span className="text-2xl font-bold">{title}</span>
                <span className="text-justify">{description}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-right">
          <Link href="/apihub">See all features</Link>
        </p>
      </main>
    </div>
  </div>
);

export default ApiHub;

const apihubFeatures = [
  {
    Icon: MdNetworkCheck,
    title: "Improve Performance",
    description: "Our Server is hosted on 'Render'; A reliable Cloud Provider to ensure 24/7 data availability and minimal response time with little to no down time",
  },
  {
    Icon: FaDatabase,
    title: "Massive data to consume",
    description:
      "Building and maintaining ever changing football data will stretch your budget and Team. Allow WaveRD handle this task as we provide a large pool of data to fetch from ranging from Players, Clubs, Countries, Leagues, e.t.c.",
  },
  {
    Icon: FaCartPlus,
    title: "Create Robust App",
    description:
      "First API provider to offer full-text-search powered by the most robust and flexible NoSQL Database 'MongoDB'. Overwhelming functionalities to consume, as we are here to solve your data worries.",
  },
];
