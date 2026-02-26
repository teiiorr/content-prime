import { memo } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { BgBubbles, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

interface MemberItem {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  website: string;
  avatar: string;
}

export const AboutSectionsTeam = memo(function AboutSectionsTeam() {
  const team: MemberItem[] = [
    {
      id: 1,
      name: "Ahmedov Jahongir Odilxo‘jayevich",
      position: "Markaz direktori",
      phone: "+998 (55) 511-1505",
      email: "j.akhmedov@bolalarkontenti.uz",
      website: "https://bolalarkontenti.uz/",
      avatar: "/images/team-members/jakhongir@2x.avif",
    },
    {
      id: 2,
      name: "Toshxo‘jayev Hasan Javlonovich",
      position: "Ijodiy masalalar bo‘yicha direktor o‘rinbosari",
      phone: "+998 (55) 511-1505",
      email: "h.toshxojaev@bolalarkontenti.uz",
      website: "https://bolalarkontenti.uz/",
      avatar: "/images/team-members/hasan@2x.avif",
    },
    {
      id: 3,
      name: "Qurolov G‘ulomjon Abdumalik o‘g‘li",
      position: "Moliyaviy masalalar bo‘yicha direktor o‘rinbosari",
      phone: "+998 (55) 511-1505",
      email: "g.kuralov@bolalarkontenti.uz",
      website: "https://bolalarkontenti.uz/",
      avatar: "/images/team-members/gulomjon@2x.avif",
    },
  ];

  return (
    <section
      id="team"
      className="relative bg-gradient-to-b from-[#eef2ed] to-transparent pb-16 pt-8 md:pb-24 md:pt-16 lg:pb-36 lg:pt-24"
    >
      <div className="container max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#cfd8cf] bg-[#fbfcfa] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(55,78,49,0.16)]">
          <div className="mb-6 flex justify-center md:mb-8">
            <div className="inline-flex items-center rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-slate-900 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl">
              Rahbariyat
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {team.map((member, index) => {
              const isShortPosition = member.position.length <= 20;
              const isMediumPosition = member.position.length > 20 && member.position.length <= 36;

              return (
                <ScrollCard key={member.id} index={index} yFrom={68} scaleFrom={1.06} blurFrom={6}>
                <article
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.22)] sm:p-5"
                >
                  <div className="mb-4 flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 md:h-24 md:w-24 lg:h-28 lg:w-28">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 112px, 96px"
                    />
                  </div>
                  <div className="min-w-0 flex flex-1 flex-col">
                    <div className="flex min-h-[52px] items-start md:min-h-[56px]">
                      <h3 className="line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.01em] text-slate-900 lg:text-xl">
                        {member.name}
                      </h3>
                    </div>

                    <div className="mt-2 border-t border-slate-200/90 pt-2">
                      <p
                        className={[
                          "flex min-h-[48px] w-full items-center justify-center rounded-lg bg-slate-50 px-2.5 py-1.5 text-center text-slate-600 ring-1 ring-inset ring-slate-200",
                          "line-clamp-2",
                          isShortPosition
                            ? "text-[15px] font-semibold leading-5 lg:text-base"
                            : isMediumPosition
                              ? "text-sm font-medium leading-5 lg:text-[15px]"
                              : "text-[13px] font-medium leading-5 lg:text-sm",
                        ].join(" ")}
                      >
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="shrink-0 text-slate-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="shrink-0 text-slate-500" />
                    <span className="break-all">{member.email}</span>
                  </div>
                </div>
                </article>
                </ScrollCard>
              );
            })}
          </div>
        </HomeSectionShell>
      </div>

      <BgBubbles color="#eef2ed" className="bottom-full" />
    </section>
  );
});

AboutSectionsTeam.displayName = "AboutSectionsTeam";
