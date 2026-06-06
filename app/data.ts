export const tripInfo = {
  title: "韓国旅行",
  destination: "ソウル（明洞・江南・聖水・東大門）",
  dates: "2026年6月16日〜6月18日",
  emergency: {
    police: "112",
    ambulance: "119",
    pickpocket: "1330",
    fraud: "02-739-7400",
    japaneseEmbassy: "+82-2-2170-5200",
    insurance: "00798-81-1-0827",
  },
};

export type ShopItem = {
  name: string;
  korean: string;
};

export type BranchOption = {
  label: string;
  schedules: Schedule[];
};

export type Schedule = {
  time: string;
  place: string;
  description: string;
  address?: string;
  tip?: string;
  category: "transport" | "walk" | "taxi" | "food" | "sightseeing" | "hotel" | "shopping";
  shops?: ShopItem[];
  branches?: BranchOption[];
  steps?: string[];
  noMap?: boolean;
};

export type Day = {
  date: string;
  label: string;
  color: string;
  schedules: Schedule[];
};

export const days: Day[] = [
  {
    date: "6月16日",
    label: "1日目",
    color: "rose",
    schedules: [
      {
        time: "18:00",
        place: "金浦空港 到着",
        description: "入国手続き後、地下鉄または空港鉄道で明洞へ移動",
        address: "김포국제공항",
        category: "transport",
      },
      {
        time: "",
        place: "金浦空港 → 明洞 行き方",
        description: "トータル1,850ウォン・地下鉄＋空港鉄道で約40分",
        address: "김포국제공항",
        category: "walk",
        noMap: true,
        steps: [
          "地下鉄の案内表示に従って改札口へ進む（約15分）",
          "空港鉄道の改札口へ（青色の表記）。改札横の発券機でWOWPASSを購入",
          "空港鉄道専用の改札口をタッチして入場（追加料金なし）",
          "ソウル方面の電車に乗る ⚠️ 仁川方面に注意！5〜10分おきに出発・約22分でソウル駅到着",
          "ソウル駅で4号線（4 Line）のホームへ向かう（約15分）",
          "途中の改札口を通過（追加料金なし）",
          "4号線・明洞方面の電車に乗る（約3分）",
          "明洞到着！3番出口を出るとホテルがある",
        ],
      },
      {
        time: "19:30",
        place: "ホテル チェックイン",
        description: "明洞駅3番出口近く",
        address: "오요6",
        category: "hotel",
      },
      {
        time: "19:45",
        place: "明洞大使館前両替所",
        description: "ウォン現金を調達",
        address: "대사관앞 환전",
        tip: "明洞エリアの中でもレートが良好",
        category: "walk",
      },
      {
        time: "20:00〜",
        place: "ルート分岐",
        description: "この後の行動を選んでください",
        category: "transport",
        branches: [
          {
            label: "ルートA：先にディナー",
            schedules: [
              {
                time: "20:00",
                place: "ディナー：솥돈（ソットン）",
                description: "サムギョプサルを堪能",
                address: "솥돈 홍대점",
                category: "food",
              },
              {
                time: "21:30",
                place: "明洞ショッピング",
                description: "明洞エリアのショップを巡る",
                address: "명동",
                category: "shopping",
                shops: [
                  { name: "オリーブヤング 明洞タウン店", korean: "올리브영 명동 타운" },
                  { name: "musinsaストア明洞", korean: "musinsa 스토어 명동" },
                  { name: "韓国ダイソー 明洞駅店", korean: "다이소 명동역점" },
                  { name: "emis 明洞フラッグシップ（23:00まで営業）", korean: "emis 명동 플래그십 스토어" },
                ],
              },
            ],
          },
          {
            label: "ルートB：先にノースフェイス",
            schedules: [
              {
                time: "20:00",
                place: "ノースフェイス万里洞直営店",
                description: "タクシーで約10分。韓国限定「WHITE LABEL」（〜21:00閉店）",
                address: "노스페이스 만리동직영점",
                category: "shopping",
              },
              {
                time: "21:10",
                place: "タクシーで明洞へ戻る",
                description: "購入したノースフェイスの袋を持って帰還",
                category: "taxi",
              },
              {
                time: "21:25",
                place: "ディナー：오다리집（オダリチプ）",
                description: "カンジャンケジャン！！！！",
                address: "오다리집",
                category: "food",
              },
              {
                time: "22:45",
                place: "明洞ショッピング",
                description: "深夜営業のショップをチラ見しながらホテルへ",
                address: "명동",
                category: "shopping",
                shops: [
                  { name: "オリーブヤング 明洞タウン店", korean: "올리브영 명동 타운" },
                  { name: "韓国ダイソー 明洞駅店", korean: "다이소 명동역점" },
                  { name: "musinsaストア明洞", korean: "musinsa 스토어 명동" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    date: "6月17日",
    label: "2日目",
    color: "orange",
    schedules: [
      {
        time: "09:00",
        place: "朝食＆食べ歩き：広蔵市場",
        description: "Buchon Yukhoe（朝ユッケ）/ 緑豆チヂミ / ねじりドーナツ",
        address: "광장시장",
        tip: "屋台は現金払いが多いので少額紙幣を用意",
        category: "food",
      },
      {
        time: "11:00",
        place: "江南（カンナム）へ移動",
        description: "地下鉄2号線で1本（約25分）",
        address: "강남역",
        category: "walk",
      },
      {
        time: "11:30",
        place: "CHAGEE 江南フラグシップ",
        description: "プレミアムミルクティー",
        address: "차지 강남플래그십점",
        category: "food",
      },
      {
        time: "12:00",
        place: "31ジェラート（Workshop by Baskin Robbins）",
        description: "お目当ての限定ジェラート",
        address: "Workshop by 배스킨라빈스",
        category: "food",
      },
      {
        time: "13:30",
        place: "聖水（ソンス）へ移動",
        description: "地下鉄2号線（約15分）",
        address: "성수역",
        category: "walk",
      },
      {
        time: "13:45",
        place: "BETON 聖水店",
        description: "人気の塩パンでカフェタイム",
        address: "베통 성수",
        tip: "15:00の焼き上がりに合わせて入店がおすすめ",
        category: "food",
      },
      {
        time: "15:00",
        place: "聖水エリアのショップ巡り",
        description: "聖水エリアの人気ショップを回る",
        address: "성수",
        category: "shopping",
        shops: [
          { name: "Matin Kim 聖水フラッグシップ", korean: "마뗑킴 성수플래그십스토어" },
          { name: "miffy store SEOUL", korean: "미피스토어 서울" },
          { name: "ONGO", korean: "ONGO 온고" },
        ],
      },
      {
        time: "17:00",
        place: "ホテルへ戻る（明洞）",
        description: "購入した荷物を置いて休憩",
        address: "오요6",
        category: "hotel",
      },
      {
        time: "18:30",
        place: "ディナー：홍콩반점0410（香港飯店 明洞店）",
        description: "モチモチのタンスユク（韓国風酢豚）を堪能",
        address: "홍콩반점0410 명동점",
        category: "food",
      },
      {
        time: "20:30",
        place: "夜活：東大門（トンデモン）",
        description: "東大門エリアで深夜ショッピング",
        address: "동대문",
        category: "shopping",
        shops: [
          { name: "nyunyu 東大門店", korean: "뉴뉴 동대문점" },
          { name: "マスクショップ", korean: "더마스크샵" },
        ],
      },
    ],
  },
  {
    date: "6月18日",
    label: "3日目",
    color: "emerald",
    schedules: [
      {
        time: "07:30",
        place: "ホテル チェックアウト",
        description: "全ての荷物を持って移動開始",
        address: "오요6",
        category: "hotel",
      },
      {
        time: "07:45",
        place: "南大門市場 野菜ホットク",
        description: "朝から開いている名物「野菜ホットク」を並んで朝食代わりに",
        address: "남대문야채호떡",
        category: "food",
      },
      {
        time: "08:15",
        place: "ソウル駅へ移動",
        description: "地下鉄で1駅",
        address: "서울역",
        category: "walk",
      },
      {
        time: "08:30",
        place: "ノースフェイスアウトレット 万里洞店 ＆ お土産調達",
        description: "ソウル駅構内のコンビニ・売店でお菓子やラーメンもまとめて購入",
        address: "노스페이스 만리동직영점",
        tip: "通常10:00開店。閉まっている場合はソウル駅直結ロッテアウトレット or 金浦空港免税店で",
        category: "shopping",
      },
      {
        time: "08:50",
        place: "空港鉄道 乗車（ソウル駅）",
        description: "一般列車で金浦空港へ",
        address: "서울역",
        category: "transport",
      },
      {
        time: "09:25",
        place: "金浦空港 到着",
        description: "出発の2時間前に到着・出国手続き。空港内の薬局や免税店で買い忘れを最終チェック",
        address: "김포국제공항",
        category: "transport",
      },
      {
        time: "11:25",
        place: "金浦空港 出発",
        description: "さようなら、ソウル！日本へ帰国",
        address: "김포국제공항",
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
