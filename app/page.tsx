import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C1F] via-[#0D1428] to-[#1A1F3A] text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">Student</span>
            <span className="text-[#94A3B8]">Verse</span>
          </h1>
          <p className="text-xl text-[#94A3B8]">Smart Savings for Students</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-[320px] h-[640px] bg-gradient-to-b from-[#1E2A4A] to-[#0D1428] rounded-[40px] border-4 border-[#2E3A5A] shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#080C1F] rounded-b-2xl z-10" />

                {/* Screenshot Content */}
                <div className="relative h-full p-6 pt-10">
                  <Image
                    src="/images/image.png"
                    alt="StudentVerse App Screenshot"
                    width={320}
                    height={640}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-[#1E2A4A] rounded-2xl p-8 border border-[#2E3A5A]">
              <h2 className="text-2xl font-bold mb-4 text-[#2962FF]">React Native Mobile App</h2>
              <p className="text-[#94A3B8] mb-6 leading-relaxed">
                This is a React Native mobile application built with Expo. The app features Smart Save deals, merchant
                discovery, Orbit AI planning, and a rewards system designed specifically for students.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2962FF] rounded-full" />
                  <span className="text-[#94A3B8]">Smart Save deals with proximity-based offers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFB800] rounded-full" />
                  <span className="text-[#94A3B8]">Freshers Passport rewards program</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2962FF] rounded-full" />
                  <span className="text-[#94A3B8]">Orbit AI for personalized planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFB800] rounded-full" />
                  <span className="text-[#94A3B8]">Multi-language support (EN/AR)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#080C1F] rounded-2xl p-8 border border-[#2962FF]">
              <h3 className="text-xl font-bold mb-4 text-[#2962FF]">How to Run</h3>
              <ol className="space-y-4 text-[#94A3B8]">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </span>
                  <span>Download the project ZIP file</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </span>
                  <div>
                    Install dependencies:{" "}
                    <code className="bg-[#1E2A4A] px-2 py-1 rounded text-[#FFB800]">npm install</code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </span>
                  <div>
                    Start Expo dev server:{" "}
                    <code className="bg-[#1E2A4A] px-2 py-1 rounded text-[#FFB800]">npm start</code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2962FF] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    4
                  </span>
                  <span>Scan QR code with Expo Go app on your phone</span>
                </li>
              </ol>
            </div>

            <div className="flex gap-3 flex-wrap">
              <div className="bg-[#2962FF] px-6 py-3 rounded-xl font-semibold">iOS & Android</div>
              <div className="bg-[#FFB800] text-[#080C1F] px-6 py-3 rounded-xl font-semibold">Expo Router</div>
              <div className="bg-[#1E2A4A] px-6 py-3 rounded-xl font-semibold border border-[#2E3A5A]">TypeScript</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[#94A3B8] text-sm">
          <p>Built with React Native, Expo, and TypeScript</p>
        </div>
      </div>
    </div>
  )
}
