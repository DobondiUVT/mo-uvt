import { getTranslations } from 'next-intl/server'
import React from 'react'

const Footer = async () => {
  const t = await getTranslations('Index');
  return (
    <section className="py-8 lg:py-14">
      <div className="container">
        <h2 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
          {t("Always at your disposal")}
        </h2>
        <div className="mb-12 h-1 w-16 rounded bg-uvt-blue"></div>
        <div className="relative flex min-h-[600px] items-end justify-start overflow-hidden rounded-lg bg-gray-300 p-10 sm:mr-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.2008363156433!2d21.2316152!3d45.7471195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sWest%20University%20of%20Timi%C8%99oara!5e0!3m2!1sen!2sro!4v1705534104344!5m2!1sen!2sro"
            className="absolute inset-0 h-full w-full"
          />
          <div className="relative flex flex-wrap rounded bg-white py-6 shadow-md">
            <div className="px-6 lg:w-1/2">
              <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900">
                ADDRESS
              </h2>
              <p className="mt-1">
                Bulevardul Vasile Pârvan 4, Timișoara 300223
              </p>
            </div>
            <div className="mt-4 px-6 lg:mt-0 lg:w-1/2">
              <h2 className="title-font text-xs font-semibold tracking-widest text-gray-900">
                EMAIL
              </h2>
              <a className="leading-relaxed text-indigo-500">info@e-uvt.ro</a>
              <h2 className="title-font mt-4 text-xs font-semibold tracking-widest text-gray-900">
                PHONE
              </h2>
              <p className="leading-relaxed">0256592111</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
