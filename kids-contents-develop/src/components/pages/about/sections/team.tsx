import { memo } from "react";
import { BgBubbles } from "@/components";

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
      className="pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-36 relative"
    >
      <div className="container">
        {/* Header */}
        <div className="md:text-center mb-8 md:mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-black">
            Rahbariyat
          </h2>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-green-50 rounded-3xl border border-green-600 p-6 md:p-8"
            >
              {/* Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden mb-4 md:mb-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="mb-5 md:mb-6">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                  {member.name}
                </h3>

                <p className="text-green-600 text-lg lg:text-xl font-medium">
                  {member.position}
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-2 md:gap-3.5 text-sm md:text-base text-gray-900">
                <div className="flex items-center gap-2.5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.6 14.5215C13.205 17.0421 7.09582 10.9878 9.49995 8.45753C10.9678 6.91263 9.30963 5.14707 8.3918 3.84934C6.66924 1.41378 2.88771 4.77641 3.00256 6.91544C3.36473 13.6609 10.6615 21.6546 17.7275 20.9574C19.9381 20.7393 22.4778 16.7471 19.9423 15.2882C18.6745 14.5587 16.9342 13.1172 15.6 14.5215Z"
                      stroke="#027AA2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.35742 8.11419L9.33772 12.7677C10.3 13.4092 10.7811 13.73 11.3012 13.8546C11.7607 13.9647 12.2398 13.9647 12.6994 13.8546C13.2194 13.73 13.7006 13.4092 14.6628 12.7677L21.6431 8.11419M7.15742 19.8999H16.8431C18.5233 19.8999 19.3634 19.8999 20.0051 19.5729C20.5696 19.2853 21.0285 18.8264 21.3162 18.2619C21.6431 17.6201 21.6431 16.7801 21.6431 15.0999V9.6999C21.6431 8.01974 21.6431 7.17967 21.3162 6.53793C21.0285 5.97344 20.5696 5.5145 20.0051 5.22688C19.3634 4.8999 18.5233 4.8999 16.8431 4.8999H7.15742C5.47726 4.8999 4.63719 4.8999 3.99545 5.22688C3.43096 5.5145 2.97202 5.97344 2.6844 6.53793C2.35742 7.17967 2.35742 8.01974 2.35742 9.6999V15.0999C2.35742 16.7801 2.35742 17.6201 2.6844 18.2619C2.97202 18.8264 3.43096 19.2853 3.99545 19.5729C4.63719 19.8999 5.47726 19.8999 7.15742 19.8999Z"
                      stroke="#027AA2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="break-all">{member.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21.4001C16.9706 21.4001 21 17.3707 21 12.4001C21 7.42958 16.9706 3.40015 12 3.40015M12 21.4001C7.02944 21.4001 3 17.3707 3 12.4001C3 7.42958 7.02944 3.40015 12 3.40015M12 21.4001C14.7614 21.4001 15.9413 16.2371 15.9413 12.4001C15.9413 8.56318 14.7614 3.40015 12 3.40015M12 21.4001C9.23858 21.4001 8.05895 16.2371 8.05895 12.4001C8.05895 8.56322 9.23858 3.40015 12 3.40015M3.49988 9.40012C10.1388 9.40012 13.861 9.40012 20.4999 9.40012M3.49988 15.4002C10.1388 15.4002 13.861 15.4002 20.4999 15.4002"
                      stroke="#027AA2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="break-all">{member.website}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BgBubbles color="#fff" className="bottom-full" />
    </section>
  );
});

AboutSectionsTeam.displayName = "AboutSectionsTeam";
