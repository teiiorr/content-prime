"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumb, Steps } from "antd";
import { notFound } from "next/navigation";

import { ROUTES } from "@/constants";
import { NewsItem } from "@/components";
import { ProjectItemType, Status, NewsItemType } from "@/types";
import { fetchNewsLimited } from "@/lib";

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Faol":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "Tez kunda":
      return "border-warning-200 bg-warning-50 text-warning-700";
    case "Yakunlangan":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

export const ProjectsSlugPage = memo(function ProjectsSlugPage({
  project: projectItem,
}: {
  project: ProjectItemType | null;
}) {
  if (!projectItem) {
    notFound();
  }

  const [news, setNews] = useState<NewsItemType[]>([]);

  useEffect(() => {
    async function loadNews() {
      const data = await fetchNewsLimited(3);
      setNews(data);
    }
    loadNews();
  }, []);

  const steps = [
    { title: "E'lon berilgan" },
    { title: "Ekspertlar kengashi muhokamasida" },
    { title: "Tasdiqlangan" },
    { title: "Ishga tushirilgan" },
    { title: "Ssenariy yaratish jarayonida" },
    { title: "Tasvirga olinmoqda" },
    { title: "Montaj" },
    { title: "Ovozlashtirilmoqda" },
    { title: "Post - prodakshn" },
    { title: "Premyera" },
  ];
  const currentStep = projectItem.current_step
    ? parseInt(projectItem.current_step)
    : 0;

  return (
    <div className="bg-background">
      <section
        id="projects-hero"
        className="overflow-hidden min-h-screen relative z-10"
      >
        <div className="container py-10 lg:py-16">
          <div className="mb-8 lg:mb-14">
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link
                      href={ROUTES.HOME}
                      className="text-gray-600 font-semibold text-sm px-2"
                    >
                      Asosiy
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      href={ROUTES.PROJECTS}
                      className="text-gray-600 font-semibold text-sm px-2"
                    >
                      Loyihalar
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      href={`${ROUTES.PROJECTS}/${projectItem.slug}`}
                      className="text-orange-400 font-semibold text-sm px-2"
                    >
                      {projectItem.title}
                    </Link>
                  ),
                },
              ]}
              className="mb-8 md:mb-10 lg:mb-12"
            />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6">
              {projectItem.title}
            </h1>
            <div className="flex justify-start">
              <div
                className={`px-4 py-1 rounded-full text-lg h-9 flex items-center justify-center font-medium border ${getStatusColor(
                  projectItem.status
                )}`}
              >
                {projectItem.status}
              </div>
            </div>
          </div>

          <div className="rounded-3xl z-10 sm:rounded-[30px] lg:rounded-[36px] w-full aspect-video border-4 sm:border-6 lg:border-[8px] border-blue-600 overflow-hidden relative flex items-center justify-center shadow-2xl mb-16 lg:mb-24">
            {projectItem.video_src ? (
              <video
                src={projectItem.video_src}
                controls
                preload="metadata"
                className="w-full h-full absolute inset-0 object-cover"
                poster={projectItem.poster_src || projectItem.image_src}
              />
            ) : (
              <img
                src={projectItem.image_src}
                srcSet={projectItem.image_srcset}
                alt={projectItem.title}
                className="w-full h-full absolute inset-0 object-cover"
                loading="lazy"
              />
            )}
          </div>

          {steps.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-5 font-semibold text-2xl sm:text-3xl">
                Jarayon
              </h2>

              {/* Custom Steps Implementation */}
              <div className="hidden lg:block w-full py-4">
                <div className="flex items-start justify-between relative min-w-0">
                  {/* Background connecting line */}
                  <div className="absolute top-5 left-20 right-10 h-[2px] bg-gray-300 z-0" />

                  {/* Progress connecting line */}
                  <div
                    className="absolute top-5 left-20 h-[2px] bg-blue-600 z-0 transition-all duration-500"
                    style={{
                      width: `calc((100% - 120px) * ${
                        currentStep / (steps.length - 1)
                      })`,
                    }}
                  />

                  {steps.map((step: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-center first:!justify-start [&:not(:last-child)]:flex-1 flex-shrink-0 [&:not(:last-child)]:max-w-[160px] [&:not(:last-child)]:w-full relative z-10"
                    >
                      {/* Step Circle */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`
              w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm
              ${
                index < currentStep
                  ? "bg-blue-600"
                  : index === currentStep
                  ? "bg-blue-600 ring-2 ring-blue-600 ring-offset-2"
                  : "bg-white border-2 border-gray-300"
              }
            `}
                        >
                          {index < currentStep ? (
                            <svg
                              width="21"
                              height="19"
                              viewBox="0 0 21 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.7954 1.31677L6.86211 12.8334L3.69544 9.4501C3.11211 8.9001 2.19544 8.86677 1.52878 9.33344C0.878775 9.81677 0.695442 10.6668 1.09544 11.3501L4.84544 17.4501C5.21211 18.0168 5.84544 18.3668 6.56211 18.3668C7.24544 18.3668 7.89544 18.0168 8.26211 17.4501C8.86211 16.6668 20.3121 3.01677 20.3121 3.01677C21.8121 1.48344 19.9954 0.133436 18.7954 1.3001V1.31677Z"
                                fill="white"
                              />
                            </svg>
                          ) : index === currentStep ? (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          ) : (
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          )}
                        </div>

                        {/* Step Title */}
                        <div className="mt-4 text-center">
                          <p
                            className={`text-sm font-semibold leading-tight px-2
                              ${
                                index <= currentStep
                                  ? "text-blue-600"
                                  : "text-gray-700"
                              }
                            `}
                          >
                            {step.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:hidden">
                <Steps
                  items={steps}
                  progressDot
                  current={currentStep}
                  direction="vertical"
                />
              </div>
            </div>
          )}

          <div className="w-full text-base lg:text-lg text-gray-600 flex flex-col gap-4 mb-16 lg:mb-24">
            {projectItem.content ? (
              <div
                dangerouslySetInnerHTML={{ __html: projectItem.content }}
                className="p-link"
              />
            ) : projectItem.description ? (
              <p>{projectItem.description}</p>
            ) : (
              <p>Ushbu loyiha haqida qo'shimcha ma'lumot mavjud emas.</p>
            )}

            {(projectItem.instagram_url ||
              projectItem.youtube_url ||
              projectItem.telegram_url ||
              projectItem.facebook_url) && (
              <div className="mt-4 md:mt-8">
                <h3 className="font-semibold text-lg md:text-xl mb-3 text-gray-900">
                  Loyihaning tarmoq sahifalari
                </h3>

                <div className="flex gap-6">
                  {projectItem.instagram_url && (
                    <Link
                      href={projectItem.instagram_url}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_725_12422)">
                            <path
                              d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
                              fill="currentColor"
                            />
                            <path
                              d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_725_12422">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      }
                    </Link>
                  )}

                  {projectItem.youtube_url && (
                    <Link
                      href={projectItem.youtube_url}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.7609 7.1998C23.7609 7.1998 23.5266 5.54512 22.8047 4.81855C21.8906 3.8623 20.8688 3.85762 20.4 3.80137C17.0438 3.55762 12.0047 3.55762 12.0047 3.55762H11.9953C11.9953 3.55762 6.95625 3.55762 3.6 3.80137C3.13125 3.85762 2.10938 3.8623 1.19531 4.81855C0.473438 5.54512 0.24375 7.1998 0.24375 7.1998C0.24375 7.1998 0 9.14512 0 11.0857V12.9045C0 14.8451 0.239062 16.7904 0.239062 16.7904C0.239062 16.7904 0.473437 18.4451 1.19062 19.1717C2.10469 20.1279 3.30469 20.0951 3.83906 20.1982C5.76094 20.3811 12 20.4373 12 20.4373C12 20.4373 17.0438 20.4279 20.4 20.1889C20.8688 20.1326 21.8906 20.1279 22.8047 19.1717C23.5266 18.4451 23.7609 16.7904 23.7609 16.7904C23.7609 16.7904 24 14.8498 24 12.9045V11.0857C24 9.14512 23.7609 7.1998 23.7609 7.1998ZM9.52031 15.1123V8.36699L16.0031 11.7514L9.52031 15.1123Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  )}

                  {projectItem.telegram_url && (
                    <Link
                      href={projectItem.telegram_url}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_863_9828)">
                          <path
                            d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM16.9062 7.22363C16.4549 7.23162 15.762 7.47337 12.4297 8.85938C11.2624 9.34491 8.92944 10.3491 5.43164 11.873C4.8638 12.0989 4.56627 12.3201 4.53906 12.5361C4.48706 12.951 5.08449 13.08 5.83594 13.3242C6.44858 13.5234 7.27268 13.7563 7.70117 13.7656C8.08983 13.774 8.52402 13.614 9.00293 13.2852C12.2713 11.0789 13.9585 9.96349 14.0645 9.93945C14.1391 9.92251 14.2424 9.90171 14.3125 9.96387C14.3826 10.0262 14.3756 10.1439 14.3682 10.1758C14.3088 10.4289 11.2432 13.2181 11.0625 13.4053C10.3873 14.1065 9.61909 14.5357 10.8037 15.3164C11.8288 15.9919 12.4255 16.423 13.4814 17.1152C14.1564 17.5577 14.686 18.0827 15.3828 18.0186C15.7034 17.9889 16.035 17.6871 16.2031 16.7881C16.6007 14.6628 17.3819 10.0586 17.5625 8.16113C17.5783 7.99489 17.558 7.78187 17.542 7.68848C17.526 7.59509 17.4924 7.46175 17.3711 7.36328C17.2273 7.24684 17.0054 7.22189 16.9062 7.22363Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_863_9828">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  )}

                  {projectItem.facebook_url && (
                    <Link
                      href={projectItem.facebook_url}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mb-2">
            <h2 className="mb-6 md:mb-8 font-bold text-gray-900 text-xl sm:text-2xl md:text-3xl">
              Loyihaga aloqador yangiliklar
            </h2>

            {news.length > 0 ? (
              <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <NewsItem key={item.id} item={item} showDescription={false} />
                ))}
              </div>
            ) : (
              <p>Yangiliklar topilmadi.</p>
            )}
          </div>
        </div>
      </section>

      <img
        src="/images/bg.avif"
        srcSet="/images/bg@2x.avif 2x"
        width="1920"
        height="663"
        alt="Hero background image"
        loading="lazy"
        className="absolute top-0 left-0 right-0 object-cover object-center w-full h-auto z-0"
      />
    </div>
  );
});
