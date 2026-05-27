"use client";

import { useState } from "react";
import { tripInfo, days, usefulPhrases, type Schedule } from "./data";
import type { ShopItem, BranchOption } from "./data";

const categoryConfig = {
  transport: { icon: "✈️", label: "移動", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  taxi: { icon: "🚗", label: "タクシー", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  walk: { icon: "🚶", label: "移動", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
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

function ScheduleCard({ schedule, onClick }: { schedule: Schedule; onClick: () => void }) {
  const config = categoryConfig[schedule.category];
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl border ${config.bg} ${config.border} cursor-pointer active:scale-95 transition-transform`}
    >
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
      <div className="text-gray-300 text-lg self-center">›</div>
    </div>
  );
}

function ScheduleDetailSheet({
  schedule,
  dayColor,
  onClose,
}: {
  schedule: Schedule;
  dayColor: string;
  onClose: () => void;
}) {
  const config = categoryConfig[schedule.category];
  const colors = dayColorConfig[dayColor];
  const mapQuery = encodeURIComponent(schedule.address || schedule.place);

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl shadow-xl max-h-[85vh] overflow-y-auto">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className={`bg-gradient-to-r ${colors.header} text-white mx-4 mt-2 rounded-2xl px-5 py-4`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{config.icon}</span>
            <span className="text-sm font-medium opacity-90">{config.label}</span>
            <span className="ml-auto text-sm font-bold opacity-90 tabular-nums">{schedule.time}</span>
          </div>
          <p className="text-xl font-extrabold leading-snug">{schedule.place}</p>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          <p className="text-gray-700 leading-relaxed">{schedule.description}</p>

          {schedule.address && (
            <div className="flex gap-2 items-start text-sm text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
              <span className="mt-0.5">📍</span>
              <p>{schedule.address}</p>
            </div>
          )}

          {schedule.tip && (
            <div className="flex gap-2 items-start bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <span>💡</span>
              <p className="text-sm text-yellow-800">{schedule.tip}</p>
            </div>
          )}

          {/* Step-by-step guide */}
          {schedule.steps && schedule.steps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-wide mb-3">🚇 ルート案内</p>
              <div className="space-y-3">
                {schedule.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shop list */}
          {schedule.shops && schedule.shops.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-wide mb-2">🛍️ お店一覧</p>
              <div className="space-y-2">
                {schedule.shops.map((shop: ShopItem) => (
                  <a
                    key={shop.korean}
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.korean)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 active:scale-95 transition-transform"
                  >
                    <span className="font-medium text-gray-700 text-sm">{shop.name}</span>
                    <span className="text-green-500 text-xs font-semibold flex-shrink-0 ml-3">地図 🧭</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Area / place map button */}
          {!schedule.noMap && (
            <a
              href={`https://map.naver.com/v5/search/${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 rounded-2xl py-4 font-bold text-base text-white active:scale-95 transition-transform w-full"
            >
              🧭 {schedule.shops ? "エリアをNaver Mapで開く" : "Naver Mapで開く"}
            </a>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"schedule" | "info" | "phrases">("schedule");
  const [activeDay, setActiveDay] = useState(0);
  const [selected, setSelected] = useState<{ schedule: Schedule; dayColor: string } | null>(null);
  const [activeBranches, setActiveBranches] = useState<Record<string, number>>({});
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const toggleCheck = (i: number) => setCheckedItems(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

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
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-lg mx-auto flex">
          {(["schedule", "info", "phrases"] as const).map((tab) => {
            const labels = { schedule: "📅 日程", info: "📋 情報", phrases: "💬 フレーズ" };
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
                    {days[activeDay].schedules.map((schedule, i) => {
                      const dayColor = days[activeDay].color;
                      const colors = dayColorConfig[dayColor];

                      if (schedule.branches) {
                        const key = `${activeDay}-${i}`;
                        const activeBranchIdx = activeBranches[key] ?? 0;
                        const branchSchedules = schedule.branches[activeBranchIdx].schedules;
                        return (
                          <div key={i} className="relative">
                            <div className="absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-white bg-gray-400 shadow" />
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <span>🔀</span>
                                <span className="font-bold text-gray-600 text-sm">どちらのルートで行きますか？</span>
                              </div>
                              <div className="flex gap-2 mb-4">
                                {schedule.branches.map((branch: BranchOption, bi: number) => (
                                  <button
                                    key={bi}
                                    onClick={() => setActiveBranches(prev => ({ ...prev, [key]: bi }))}
                                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                                      activeBranchIdx === bi ? colors.tab : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {branch.label}
                                  </button>
                                ))}
                              </div>
                              <div className="relative">
                                <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gray-100" />
                                <div className="space-y-3 pl-6">
                                  {branchSchedules.map((s: Schedule, si: number) => (
                                    <div key={si} className="relative">
                                      <div className={`absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-white ${colors.dot} shadow`} />
                                      <ScheduleCard schedule={s} onClick={() => setSelected({ schedule: s, dayColor })} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={i} className="relative">
                          <div className={`absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-white ${colors.dot} shadow`} />
                          <ScheduleCard
                            schedule={schedule}
                            onClick={() => setSelected({ schedule, dayColor })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="space-y-4">

            {/* 準備するもの */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">🎒</span> 準備するもの
              </h3>
              <div className="space-y-1">
                {["航空券", "パスポート", "変換プラグ", "歯ブラシ、歯磨き粉", "タオル"].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => toggleCheck(i)}
                    className="w-full flex items-center gap-3 py-2.5 px-1 rounded-xl text-left active:bg-gray-50 transition-colors"
                  >
                    <span className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-colors ${checkedItems.has(i) ? "bg-emerald-500 border-emerald-500" : "border-gray-300"}`}>
                      {checkedItems.has(i) && <span className="text-white text-xs font-bold">✓</span>}
                    </span>
                    <span className={`text-sm font-medium transition-colors ${checkedItems.has(i) ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2 items-start bg-blue-50 border border-blue-200 rounded-xl p-3">
                <span className="text-base">📶</span>
                <p className="text-xs text-blue-800 font-medium">e-SIMを日本にいるうちにダウンロードしておく</p>
              </div>
            </div>

            {/* 緊急連絡先 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">🆘</span> 緊急連絡先
              </h3>
              <div className="space-y-0">
                {[
                  { label: "🚔 警察", number: tripInfo.emergency.police, large: true },
                  { label: "🚑 救急", number: tripInfo.emergency.ambulance, large: true },
                  { label: "🕵️ スリ・犯罪被害", number: tripInfo.emergency.pickpocket, large: false },
                  { label: "🚨 詐欺", number: tripInfo.emergency.fraud, large: false },
                  { label: "🇯🇵 在韓日本大使館（パスポート紛失）", number: tripInfo.emergency.japaneseEmbassy, large: false },
                  { label: "🏥 保険アクシデントセンター", number: tripInfo.emergency.insurance, large: false },
                ].map((item, i, arr) => (
                  <div key={item.label} className={`flex justify-between items-center py-2.5 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <a href={`tel:${item.number}`} className={`font-bold text-rose-500 ${item.large ? "text-lg" : "text-sm"}`}>
                      {item.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 現地で役立つアプリ */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">📱</span> 現地で役立つアプリ
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Naver Map", desc: "韓国最強のナビアプリ", icon: "🗺️" },
                  { name: "Uber Taxi", desc: "タクシー配車アプリ", icon: "🚕" },
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

            {/* 交通・お金 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-xl">💳</span> 交通・お金
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {[
                  "Tマネーカード: コンビニで購入・チャージ可能。地下鉄・バス・タクシーで使える",
                  "現金（ウォン）は市場や屋台で必要",
                  "空港の銀行で両替がレート良好",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1">
                <p className="text-xs font-bold text-amber-800">⚠️ WOWPASSの残高に注意</p>
                <p className="text-xs text-amber-700">「決済用残高」と「交通用残高（T-money）」は別管理です。決済残高が多くても、交通用残高がゼロだと改札を通れません。それぞれ別途チャージを忘れずに。</p>
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

      </div>

      {selected && (
        <ScheduleDetailSheet
          schedule={selected.schedule}
          dayColor={selected.dayColor}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
