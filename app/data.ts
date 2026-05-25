export const tripInfo = {
  title: "韓国旅行",
  destination: "ソウル・釜山",
  dates: "2026年XX月XX日〜XX月XX日",
  members: ["名前1", "名前2"],
  emergency: {
    police: "112",
    ambulance: "119",
    japaneseEmbassy: "+82-2-2170-5200",
  },
};

export type Schedule = {
  time: string;
  place: string;
  description: string;
  address?: string;
  tip?: string;
  category: "transport" | "food" | "sightseeing" | "hotel" | "shopping";
};

export type Day = {
  date: string;
  label: string;
  color: string;
  schedules: Schedule[];
};

export const days: Day[] = [
  {
    date: "XX月XX日",
    label: "1日目",
    color: "rose",
    schedules: [
      {
        time: "08:00",
        place: "成田空港 出発",
        description: "搭乗手続き・出国審査",
        category: "transport",
      },
      {
        time: "11:00",
        place: "仁川国際空港 到着",
        description: "入国審査・両替・SIM購入",
        tip: "空港内のKEB銀行が両替レート良好",
        category: "transport",
      },
      {
        time: "13:00",
        place: "ホンデ（弘大）エリア",
        description: "チェックイン・ランチ",
        address: "서울시 마포구 홍익로",
        category: "hotel",
      },
      {
        time: "15:00",
        place: "弘大ショッピング",
        description: "コスメ・ファッション巡り",
        category: "shopping",
      },
      {
        time: "18:30",
        place: "サムギョプサル夕食",
        description: "韓国式焼肉を堪能",
        tip: "豚肉が柔らかく人気の老舗",
        category: "food",
      },
    ],
  },
  {
    date: "XX月XX日",
    label: "2日目",
    color: "orange",
    schedules: [
      {
        time: "09:00",
        place: "景福宮",
        description: "朝鮮王朝の正宮を見学",
        address: "서울시 종로구 사직로 161",
        tip: "韓服レンタルで無料入場できる",
        category: "sightseeing",
      },
      {
        time: "11:30",
        place: "仁寺洞",
        description: "伝統工芸品・カフェ散策",
        category: "sightseeing",
      },
      {
        time: "13:00",
        place: "ビビンバランチ",
        description: "石焼きビビンバでランチ",
        category: "food",
      },
      {
        time: "15:00",
        place: "Nソウルタワー",
        description: "ソウル市内を一望",
        tip: "夕暮れ時がおすすめ！ケーブルカーで登頂",
        category: "sightseeing",
      },
      {
        time: "18:00",
        place: "明洞（ミョンドン）",
        description: "夕食・コスメショッピング",
        category: "shopping",
      },
    ],
  },
  {
    date: "XX月XX日",
    label: "3日目",
    color: "emerald",
    schedules: [
      {
        time: "10:00",
        place: "東大門デザインプラザ（DDP）",
        description: "ザハ・ハディド設計の建築を見学",
        category: "sightseeing",
      },
      {
        time: "12:00",
        place: "広蔵市場",
        description: "ユッケ・マンドゥなど屋台グルメ",
        tip: "現金払いが多いので少額紙幣を用意",
        category: "food",
      },
      {
        time: "14:00",
        place: "益善洞（イクソンドン）",
        description: "韓屋村のカフェ・フォトスポット",
        category: "sightseeing",
      },
      {
        time: "16:30",
        place: "ホテルに戻り荷造り",
        description: "翌日の帰国に備えて準備",
        category: "hotel",
      },
      {
        time: "19:00",
        place: "最後の夕食",
        description: "チムタック（甘辛鶏の煮込み）",
        category: "food",
      },
    ],
  },
  {
    date: "XX月XX日",
    label: "4日目",
    color: "sky",
    schedules: [
      {
        time: "07:00",
        place: "ホテル チェックアウト",
        description: "荷物をまとめて出発",
        category: "hotel",
      },
      {
        time: "08:30",
        place: "仁川国際空港",
        description: "2時間前に到着・出国手続き",
        tip: "免税店での買い物は保安検査後がスムーズ",
        category: "transport",
      },
      {
        time: "11:00",
        place: "帰国フライト",
        description: "さようなら、韓国！",
        category: "transport",
      },
    ],
  },
];

export const usefulPhrases = [
  { korean: "안녕하세요", reading: "アンニョンハセヨ", meaning: "こんにちは" },
  { korean: "감사합니다", reading: "カムサハムニダ", meaning: "ありがとう" },
  { korean: "얼마예요?", reading: "オルマエヨ？", meaning: "いくらですか？" },
  { korean: "맛있어요!", reading: "マシッソヨ！", meaning: "おいしい！" },
  { korean: "어디예요?", reading: "オディエヨ？", meaning: "どこですか？" },
  { korean: "사진 찍어도 돼요?", reading: "サジン チゴド デヨ？", meaning: "写真を撮っていいですか？" },
];

export const budgetItems = [
  { label: "航空券", amount: "約XX,000円/人", note: "" },
  { label: "ホテル", amount: "約XX,000円/泊", note: "3泊" },
  { label: "交通費", amount: "約X,000円", note: "Tマネーカード使用" },
  { label: "食費", amount: "約XX,000円", note: "1日あたり目安" },
  { label: "お土産・ショッピング", amount: "予算次第", note: "" },
];
