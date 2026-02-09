"use client";

import { memo, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Input, Spin } from "antd";
import { Search } from "lucide-react";

import { ROUTES } from "@/constants";
import { Contest } from "@/types";
import { fetchContests } from "@/lib";

const STATUS_LIST = ["Hammasi", "Faol", "Tez kunda", "Yakunlangan"];

const ContestCard = memo(function ContestCard({
  contest,
}: {
  contest: Contest;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Faol":
        return "bg-green-100 text-green-800 border-green-200";
      case "Tez kunda":
        return "bg-warning-50 text-warning-700 border-warning-200";
      case "Yakunlangan":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Link
      href={`${ROUTES.CREATIVE_CONTESTS}/${contest.slug}`}
      className="group relative overflow-hidden rounded-[20px] bg-white border border-gray-100"
    >
      <div
        className={`absolute top-4 left-4 md:top-6 md:left-6 z-10 px-4 py-1 rounded-full text-lg h-9 flex items-center justify-center font-medium border ${getStatusColor(
          contest.status
        )}`}
      >
        {contest.status}
      </div>
      <div className="aspect-video overflow-hidden">
        <img
          src={contest.image_src}
          alt={contest.title}
          width={1200}
          height={675}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Overlay with title and status */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white font-semibold text-xl md:text-2xl leading-tight">
            {contest.title}
          </h3>
        </div>
      </div>
    </Link>
  );
});

export const CreativeContestsPage = memo(function CreativeContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState(STATUS_LIST[0]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      const data = await fetchContests();
      setContests(data);
      setLoading(false);
    };

    loadContests();
  }, []);

  const filteredContests = useMemo(() => {
    let filtered = contests;

    // Filter by status
    if (activeStatus !== "Hammasi") {
      filtered = filtered.filter((contest) => contest.status === activeStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((contest) =>
        contest.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [contests, activeStatus, searchQuery]);

  return (
    <div className="bg-background">
      <img
        src="/images/bg.avif"
        srcSet="/images/bg@2x.avif 2x"
        width="1920"
        height="663"
        alt="Hero background image"
        loading="lazy"
        className="absolute -top-60 left-0 right-0 object-cover object-center w-full h-auto z-0"
      />

      <section
        id="contests-hero"
        className="overflow-hidden relative md:min-h-screen"
      >
        <div className="container relative z-10 py-8 lg:py-12">
          <div className="text-center mb-16 md:mb-28 lg:mb-40">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Ijodiy tanlovlar
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 mb-12 md:mb-20">
            <div className="flex max-md:w-full h-10 sm:h-11 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
              {STATUS_LIST.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`flex-1 max-sm:w-1/4 sm:min-w-28 max-sm:px-1.5 max-sm:text-[10px] sm:text-xs md:text-base border rounded-lg flex items-center justify-center font-semibold transition-colors ${
                    activeStatus === status
                      ? "border-blue-300 bg-blue-600 text-white"
                      : "border-transparent bg-transparent text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto md:min-w-[300px]">
              <Input
                placeholder="Qidirish"
                prefix={<Search className="text-gray-500" size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-52 flex items-center justify-center">
              <Spin aria-label="Tanlovlar yuklanmoqda" />
            </div>
          ) : contests.length > 0 ? (
            <>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredContests.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>

              {/* Empty state */}
              {filteredContests.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-500 text-lg mb-2">
                    Hech qanday tanlov topilmadi
                  </div>
                  <div className="text-gray-400 text-sm">
                    Qidiruv so'rovingizni o'zgartiring yoki boshqa filterni
                    tanlang
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center py-20 max-w-sm text-center mx-auto lg:py-32 flex-col items-center">
              <img
                src="/images/empty.avif"
                srcSet="/images/empty@2x.avif 1.5x"
                alt="Empty illustration"
                className="mb-8"
                loading="lazy"
                width={172}
                height={128}
              />

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hozircha mavjud loyiha topilmadi
              </h3>
              <div className="text-gray-600 text-sm">
                Yangi loyihalar ustida ishlayapmiz, tez orada bu yerda paydo
                bo‘ladi!
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
});
