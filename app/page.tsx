"use client";

import { useState } from "react";
import { tripInfo, days, usefulPhrases, budgetItems, type Schedule } from "./data";

const categoryConfig = {
  transport: { icon: "✈️", label: "移動", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  food: { icon: "🍽️", label: "食事", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  sightseeing: { icon: "📸", label: "観光", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  hotel: { icon: "🏨", label: "宿泊", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  shopping: { icon: "🛍️", label: "ショッピング", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
};

const dayColorConfig: Record<string, { tab: string; header: string; dot: string }> = {
  rose: { tab: "bg-rose-500 text-white", header: "from-rose-500 to-pink-500", dot: "bg-rose-500" },
  orange: { tab: "bg-orange-500 text-white", header: "from-orange-500 to-amber-500", dot: "bg-orange-500" },
  emerald: { tab: "bg-emerald-500 text-white", header: "from-emerald-500 to-teal-500", dot: "bg-emerald-500" },
  sky: { tab: "bg-sky-500 text-white", header: "from-sky-500 to-blue-500", dot: "bg-sky-500" },
};

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const config = categoryConfig[schedule.category];
  return (
    <div className={`flex gap-3 p-3 rounded-xl border ${config.bg} ${config.border}`}>
      <div className="text-2xl leading-none mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-500 text-sm tabular-nums">{schedule.time}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.text} border ${config.border}`}>
            {config.label}
          </span>
        </div>
        <p className="font-bold text-gray-800 mt-0.5">{schedule.place}</p>
        <p className="text-sm text-gray-600 mt-0.5">{schedule.description}</p>
        {schedule.address && (
          <p className="text-xs text-gray-400 mt-1">📍 {schedule.address}</p>
        )}
        {schedule.tip && (
          <div className="mt-2 flex gap-1.5 items-start bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <span className="text-sm">💡</span>
            <p className="text-xs text-yellow-800">{schedule.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"schedule" | "info" | "phrases" | "budget">("schedule");
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-sm font-medium opacity-80 mb-1">🇰🇷 旅のしおり</p>
          <h1 className="text-3xl font-extrabold tracking-tight">{tripInfo.title}</h1>
          <p className="text-lg font-semibold mt-1 opacity-90">{tripInfo.destination}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              📅 {tripInfo.dates}
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
              👥 {tripInfo.members.join("・")}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto flex">
          {(["schedule", "info", "phrases", "budget"] as const).map((tab) => {
            const labels = { schedule: "📅 日程", info: "📋 情報", phrases: "💬 フレーズ", budget: "💰 予算" };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 pb-12">
        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div>
            {/* Day Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
              {days.map((day, i) => {
                const colors = dayColorConfig[day.color];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      activeDay === i
                        ? colors.tab + " shadow-md scale-105"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {day.label}
                    <span className="block text-xs font-normal opacity-75">{day.date}</span>
                  </button>
                );
              })}
            </div>

            {/* Day Header */}
            {days[activeDay] && (
              <div>
                <div
                  className={`bg-gradient-to-r ${dayColorConfig[days[activeDay].color].header} text-white rounded-2xl p-4 mb-4`}
                >
                  <h2 className="text-xl font-extrabold">{days[activeDay].label}</h2>
                  <p className="text-sm opacity-90 mt-0.5">{days[activeDay].date}</p>
                  <p className="text-sm mt-2 opacity-80">
                    {days[activeDay].schedules.length}件の予定
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gray-200" />
                  <div className="space-y-3 pl-6">
                    {days[activeDay].schedules.map((schedule, i) => (
                      <div key={i} className="relative">
                        <div
                          className={`absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-white ${dayColorConfig[days[activeDay].color].dot} shadow`}
                        />
                        <ScheduleCard schedule={schedule} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">🆘</span> 緊急連絡先
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">🚔 警察</span>
                  <a href={`tel:${tripInfo.emergency.police}`} className="font-bold text-rose-500 text-lg">
                    {tripInfo.emergency.police}
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">🚑 救急</span>
                  <a href={`tel:${tripInfo.emergency.ambulance}`} className="font-bold text-rose-500 text-lg">
                    {tripInfo.emergency.ambulance}
                  </a>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">🇯🇵 在韓日本大使館</span>
                  <a href={`tel:${tripInfo.emergency.japaneseEmbassy}`} className="font-bold text-rose-500 text-sm">
                    {tripInfo.emergency.japaneseEmbassy}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">📱</span> 現地で役立つアプリ
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Naver Map", desc: "韓国最強のナビアプリ", icon: "🗺️" },
                  { name: "Kakao T", desc: "タクシー配車アプリ", icon: "🚕" },
                  { name: "Papago", desc: "韓国語翻訳アプリ", icon: "🌐" },
                  { name: "Coupang Eats", desc: "フードデリバリー", icon: "🍱" },
                ].map((app) => (
                  <div key={app.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xl">{app.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{app.name}</p>
                      <p className="text-gray-500 text-xs">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">💳</span> 交通・お金
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {[
                  "Tマネーカード: コンビニで購入・チャージ可能。地下鉄・バス・タクシーで使える",
                  "KAKAOペイ・NaverPayが使える店が増加中",
                  "現金（ウォン）は市場や屋台で必要",
                  "空港の銀行で両替がレート良好",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Phrases Tab */}
        {activeTab === "phrases" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center mb-4">タップでフレーズをコピーできます</p>
            {usefulPhrases.map((phrase) => (
              <button
                key={phrase.korean}
                onClick={() => navigator.clipboard.writeText(phrase.korean)}
                className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-left active:scale-95 transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{phrase.korean}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{phrase.reading}</p>
                  </div>
                  <span className="bg-rose-50 text-rose-600 text-xs font-semibold px-2 py-1 rounded-full border border-rose-100">
                    {phrase.meaning}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === "budget" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3">
                <h3 className="font-bold text-white">予算目安</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {budgetItems.map((item) => (
                  <div key={item.label} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                      {item.note && <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>}
                    </div>
                    <span className="font-bold text-emerald-600 text-sm">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-amber-800 flex gap-2 items-center">
                <span>💡</span> 現地通貨について
              </p>
              <p className="text-xs text-amber-700 mt-1">
                1,000ウォン ≈ 約110円（レートは変動します）
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
