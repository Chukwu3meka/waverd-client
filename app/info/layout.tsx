import Link from "next/link";
import { INFO_PAGES } from "@lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@components/ui/separator";

export default async function InfoLayout({ children }: { children: React.ReactNode }) {
  const pages = [];
  for (const infoPage of INFO_PAGES) {
    try {
      const { metadata } = await import(`@/components/info/markdown/${infoPage}.mdx`);
      if (metadata) pages.push({ title: metadata.title, path: `/info/${infoPage}` });
    } catch {}
  }

  return (
    <main className="block md:grid grid-cols-7 gap-4 max-w-7xl mx-auto">
      <div className="col-span-2 px-5 pt-5">
        <div className="hidden md:block sticky top-20 space-y-2">
          <div className="flex flex-col gap-3">
            {pages.map(({ path, title }) => (
              <Link href={path} className="font-bold text-sm" key={path}>
                {title}
              </Link>
            ))}
          </div>
        </div>

        <div className="block md:hidden space-y-1.5 space-x-1.5 -mt-2">
          {pages.map(({ path, title }) => (
            <Link href={path} className="font-bold" key={path}>
              <Badge>{title}</Badge>
            </Link>
          ))}

          <Separator className="my-4" />
        </div>
      </div>

      <div className="col-span-5 bg-accent px-2.5 py-10">{children}</div>
    </main>
  );
}
