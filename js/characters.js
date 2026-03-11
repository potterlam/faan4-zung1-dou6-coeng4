// ============================================================
// 書道場 - 字庫（粵語版）
// 66 個繁體字，分 3 個級別，附粵拼及廣東話提示
// ============================================================

const CHARACTER_DB = {
  // ──────────────────────────────────────────────────────────
  // Level 1: 初級 — 基本部首同簡單字
  // ──────────────────────────────────────────────────────────
  level1: {
    name: '初級',
    nameEn: 'Beginner',
    subtitle: '基礎筆畫',
    subtitleEn: 'Basic Strokes',
    description: '學識基本部首同簡單漢字嘅寫法',
    descriptionEn: 'Learn basic radicals and simple character writing',
    requiredScore: 0,
    passScore: 1200,
    characters: [
      { char: '一', jyutping: 'jat1', meaning: 'One', meaningZh: '數字一', radical: '一', radicalName: '一部（橫部）', strokeCount: 1, emoji: '1️⃣',
        hints: ['淨係得一筆：橫（waang4）', '由左到右平穩咁寫，起筆稍重收筆頓', '呢個係最基本嘅筆畫，練好橫係一切嘅基礎'] },
      { char: '二', jyutping: 'ji6', meaning: 'Two', meaningZh: '數字二', radical: '二', radicalName: '二部', strokeCount: 2, emoji: '2️⃣',
        hints: ['兩橫組成：先短橫後長橫', '上面嗰橫短啲，下面嗰條長啲', '兩橫之間保持適當距離'] },
      { char: '三', jyutping: 'saam1', meaning: 'Three', meaningZh: '數字三', radical: '一', radicalName: '一部', strokeCount: 3, emoji: '3️⃣',
        hints: ['三橫組成：短、中、長', '中間橫最短，底部橫最長', '三橫間距要均勻'] },
      { char: '十', jyutping: 'sap6', meaning: 'Ten', meaningZh: '數字十', radical: '十', radicalName: '十部', strokeCount: 2, emoji: '🔟',
        hints: ['先橫後豎（先橫後豎規則）', '橫畫擺正中間，豎畫穿過橫嘅中點', '豎畫要直，同橫畫垂直相交'] },
      { char: '人', jyutping: 'jan4', meaning: 'Person', meaningZh: '人、人類', radical: '人', radicalName: '人部', strokeCount: 2, emoji: '🧑',
        hints: ['先撇後捺', '撇（pit3）向左下斜，捺（naat6）向右下展開', '好似一個人張開雙腳企喺度咁'] },
      { char: '大', jyutping: 'daai6', meaning: 'Big', meaningZh: '大嘅、巨大', radical: '大', radicalName: '大部', strokeCount: 3, emoji: '🔺',
        hints: ['先橫、再撇、最尾捺', '好似一個人打開雙手嘅樣', '橫畫喺上面，撇捺由橫嘅中間展開'] },
      { char: '小', jyutping: 'siu2', meaning: 'Small', meaningZh: '細嘅、微小', radical: '小', radicalName: '小部', strokeCount: 3, emoji: '🔹',
        hints: ['先豎鉤，再左點，最尾右點', '中間嘅豎鉤係主筆', '兩邊嘅點要對稱'] },
      { char: '上', jyutping: 'soeng5', meaning: 'Up / Above', meaningZh: '上面、向上', radical: '一', radicalName: '一部', strokeCount: 3, emoji: '⬆️',
        hints: ['先豎、再短橫、最尾長橫', '豎畫喺左邊，短橫喺中間', '底部嘅長橫係最後一筆'] },
      { char: '下', jyutping: 'haa5', meaning: 'Down / Below', meaningZh: '下面、向下', radical: '一', radicalName: '一部', strokeCount: 3, emoji: '⬇️',
        hints: ['先橫、再豎、最尾點', '橫畫喺最上面', '豎畫由橫嘅中間向下'] },
      { char: '中', jyutping: 'zung1', meaning: 'Middle / China', meaningZh: '中間、中國', radical: '丨', radicalName: '豎部', strokeCount: 4, emoji: '🎯',
        hints: ['先寫口字框，最尾一豎貫穿', '口字框要方正', '豎畫由上穿到下，擺喺正中間'] },
      { char: '山', jyutping: 'saan1', meaning: 'Mountain', meaningZh: '山、山脈', radical: '山', radicalName: '山部', strokeCount: 3, emoji: '⛰️',
        hints: ['先中間豎、再左邊豎折、最尾右邊豎', '中間嗰條豎最高', '好似三座山峰咁嘅樣'] },
      { char: '水', jyutping: 'seoi2', meaning: 'Water', meaningZh: '水、液體', radical: '水', radicalName: '水部（氵）', strokeCount: 4, emoji: '💧',
        hints: ['先豎鉤、再橫撇、左撇、右捺', '豎鉤係中心骨架', '做偏旁嗰陣寫成三點水（氵）'] },
      { char: '火', jyutping: 'fo2', meaning: 'Fire', meaningZh: '火、火焰', radical: '火', radicalName: '火部（灬）', strokeCount: 4, emoji: '🔥',
        hints: ['先左上點、右上撇、再人字', '上面兩點好似火苗跳動', '下面嘅人字撐起成個字'] },
      { char: '木', jyutping: 'muk6', meaning: 'Wood / Tree', meaningZh: '木頭、樹木', radical: '木', radicalName: '木部', strokeCount: 4, emoji: '🌳',
        hints: ['先橫、再豎、然後撇、最尾捺', '好似一棵樹：橫係枝、豎係幹、撇捺係根', '豎畫要直同埋擺喺正中間'] },
      { char: '土', jyutping: 'tou2', meaning: 'Earth / Soil', meaningZh: '土地、泥土', radical: '土', radicalName: '土部', strokeCount: 3, emoji: '🟤',
        hints: ['先橫再豎，最尾長橫', '上面短橫，下面長橫', '好似塊地上面立住一條木桿'] },
      { char: '日', jyutping: 'jat6', meaning: 'Sun / Day', meaningZh: '太陽、日子', radical: '日', radicalName: '日部', strokeCount: 4, emoji: '☀️',
        hints: ['先寫外框（豎、橫折、底橫），再寫中間橫', '外框要方正，略窄長', '中間嗰條橫將框分成上下兩部分'] },
      { char: '月', jyutping: 'jyut6', meaning: 'Moon / Month', meaningZh: '月亮、月份', radical: '月', radicalName: '月部', strokeCount: 4, emoji: '🌙',
        hints: ['先撇、再橫折鉤、中間兩橫', '成個形狀略略向左傾斜', '好似彎月嘅形狀'] },
      { char: '口', jyutping: 'hau2', meaning: 'Mouth', meaningZh: '嘴巴、口', radical: '口', radicalName: '口部', strokeCount: 3, emoji: '👄',
        hints: ['先豎、再橫折、最尾底橫封口', '上面開口，由左邊開始寫', '方正但略略上闊下窄'] },
      { char: '手', jyutping: 'sau2', meaning: 'Hand', meaningZh: '手、手掌', radical: '手', radicalName: '手部（扌）', strokeCount: 4, emoji: '✋',
        hints: ['三橫一豎鉤', '先寫三橫（由短到長），最尾彎鉤穿過', '做偏旁嗰陣寫成提手旁（扌）'] },
      { char: '目', jyutping: 'muk6', meaning: 'Eye', meaningZh: '眼睛', radical: '目', radicalName: '目部', strokeCount: 5, emoji: '👁️',
        hints: ['先寫外框，再寫入面兩橫', '豎、橫折、三橫組成', '好似一隻眼咁嘅形狀，框要窄長'] },
      { char: '田', jyutping: 'tin4', meaning: 'Field', meaningZh: '田地、農田', radical: '田', radicalName: '田部', strokeCount: 5, emoji: '🌾',
        hints: ['先寫外框，再寫十字', '外框方正，好似一塊農田', '入面嘅十字將田分成四格'] },
      { char: '王', jyutping: 'wong4', meaning: 'King', meaningZh: '國王、王者', radical: '王', radicalName: '王部（玉部）', strokeCount: 4, emoji: '👑',
        hints: ['三橫一豎：先橫再豎再橫再橫', '三橫間距均勻', '豎畫連接上中兩橫，底橫最長'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // Level 2: 中級 — 自然同四季
  // ──────────────────────────────────────────────────────────
  level2: {
    name: '中級',
    nameEn: 'Intermediate',
    subtitle: '自然萬物',
    subtitleEn: 'Nature & World',
    description: '學寫同自然四季相關嘅繁體字',
    descriptionEn: 'Write nature and seasonal traditional characters',
    requiredScore: 1200,
    passScore: 1200,
    characters: [
      { char: '竹', jyutping: 'zuk1', meaning: 'Bamboo', meaningZh: '竹子', radical: '竹', radicalName: '竹部（⺮）', strokeCount: 6, emoji: '🎋',
        hints: ['左右對稱嘅兩組撇同豎', '先寫左邊三筆，再寫右邊三筆', '竹字頭（⺮）係好常見嘅部首'] },
      { char: '花', jyutping: 'faa1', meaning: 'Flower', meaningZh: '花朵', radical: '艸', radicalName: '草字頭（艹）', strokeCount: 8, emoji: '🌸',
        hints: ['上面草字頭，下面化', '草字頭（艹）先寫，代表植物類', '下方「化」字：先撇再豎彎鉤'] },
      { char: '草', jyutping: 'cou2', meaning: 'Grass', meaningZh: '草、草地', radical: '艸', radicalName: '草字頭（艹）', strokeCount: 9, emoji: '🌿',
        hints: ['上面草字頭，下面「早」', '草字頭表示同植物有關', '下面「早」字：日加十'] },
      { char: '風', jyutping: 'fung1', meaning: 'Wind', meaningZh: '風、微風', radical: '風', radicalName: '風部', strokeCount: 9, emoji: '💨',
        hints: ['外面係風字框（几），入面係蟲嘅變形', '先寫撇、橫折彎鉤（外框）', '繁體風字入面嘅部分幾複雜'] },
      { char: '雨', jyutping: 'jyu5', meaning: 'Rain', meaningZh: '落雨、雨水', radical: '雨', radicalName: '雨部', strokeCount: 8, emoji: '🌧️',
        hints: ['先一橫，再門字框，最尾四個點', '上面嗰條橫代表天空', '框入面四點好似雨滴落緊咁'] },
      { char: '雪', jyutping: 'syut3', meaning: 'Snow', meaningZh: '雪、落雪', radical: '雨', radicalName: '雨部', strokeCount: 11, emoji: '❄️',
        hints: ['上面雨字頭，下面「彐」', '雨字頭表示同天氣有關', '先寫完雨字頭再寫下面部分'] },
      { char: '春', jyutping: 'ceon1', meaning: 'Spring', meaningZh: '春天', radical: '日', radicalName: '日部', strokeCount: 9, emoji: '🌱',
        hints: ['上面三橫一撇一捺，下面日', '上面部分似「夫」但多一橫', '下面嘅「日」代表陽光暖暖地'] },
      { char: '夏', jyutping: 'haa6', meaning: 'Summer', meaningZh: '夏天', radical: '夊', radicalName: '夂部', strokeCount: 10, emoji: '☀️',
        hints: ['上面一橫，中間自，下面夂', '筆順由上到下', '下面嘅「夂」好似慢慢行緊咁'] },
      { char: '秋', jyutping: 'cau1', meaning: 'Autumn', meaningZh: '秋天', radical: '禾', radicalName: '禾部', strokeCount: 9, emoji: '🍂',
        hints: ['左邊禾字旁，右邊火', '禾代表莊稼成熟', '火代表秋天嘅顏色'] },
      { char: '冬', jyutping: 'dung1', meaning: 'Winter', meaningZh: '冬天', radical: '冫', radicalName: '冰部（冫）', strokeCount: 5, emoji: '⛄',
        hints: ['上面折文，下面兩點', '兩點好似冰晶咁', '成個字筆畫唔多但要注意結構'] },
      { char: '海', jyutping: 'hoi2', meaning: 'Sea / Ocean', meaningZh: '大海、海洋', radical: '水', radicalName: '三點水（氵）', strokeCount: 10, emoji: '🌊',
        hints: ['左邊三點水，右邊「每」', '三點水表示同水有關', '右邊「每」字：先撇再母'] },
      { char: '河', jyutping: 'ho4', meaning: 'River', meaningZh: '河流', radical: '水', radicalName: '三點水（氵）', strokeCount: 8, emoji: '🏞️',
        hints: ['左邊三點水，右邊「可」', '三點水偏旁佔左邊三分之一', '右邊「可」字：橫加口加豎鉤'] },
      { char: '林', jyutping: 'lam4', meaning: 'Forest', meaningZh: '樹林、森林', radical: '木', radicalName: '木部', strokeCount: 8, emoji: '🌲',
        hints: ['兩個「木」字並排', '左邊嘅木捺變成點', '左右結構要均衡，各佔一半'] },
      { char: '星', jyutping: 'sing1', meaning: 'Star', meaningZh: '星星、星辰', radical: '日', radicalName: '日部', strokeCount: 9, emoji: '⭐',
        hints: ['上面「日」，下面「生」', '日代表會發光嘅天體', '生嘅筆順：撇、橫、橫、豎、橫'] },
      { char: '馬', jyutping: 'maa5', meaning: 'Horse', meaningZh: '馬', radical: '馬', radicalName: '馬部', strokeCount: 10, emoji: '🐴',
        hints: ['繁體馬字筆畫幾多', '上面似馬頭，下面四點似馬腳', '留意繁體寫法同簡體（马）唔同'] },
      { char: '鳥', jyutping: 'niu5', meaning: 'Bird', meaningZh: '雀鳥', radical: '鳥', radicalName: '鳥部', strokeCount: 11, emoji: '🐦',
        hints: ['繁體鳥字底部有四點', '上面似雀仔嘅頭同身', '下面四點似雀爪'] },
      { char: '魚', jyutping: 'jyu4', meaning: 'Fish', meaningZh: '魚類', radical: '魚', radicalName: '魚部', strokeCount: 11, emoji: '🐟',
        hints: ['上面似魚頭同魚身，下面四點', '中間有田字형代表魚鱗', '繁體魚底部係四點（灬）'] },
      { char: '門', jyutping: 'mun4', meaning: 'Door / Gate', meaningZh: '門、大門', radical: '門', radicalName: '門部', strokeCount: 8, emoji: '🚪',
        hints: ['繁體門字比簡體（门）複雜', '左右對稱嘅結構', '先寫左邊再寫右邊'] },
      { char: '金', jyutping: 'gam1', meaning: 'Gold / Metal', meaningZh: '金屬、黃金', radical: '金', radicalName: '金部（釒）', strokeCount: 8, emoji: '🥇',
        hints: ['上面人字形，中間橫，下面兩豎兩點', '做偏旁嗰陣寫成「釒」', '代表金屬類嘅嘢'] },
      { char: '食', jyutping: 'sik6', meaning: 'Food / Eat', meaningZh: '食物、食嘢', radical: '食', radicalName: '食部（飠）', strokeCount: 9, emoji: '🍚',
        hints: ['上面人字蓋，下面「良」嘅變形', '做偏旁嗰陣寫成「飠」', '先寫上面嘅撇捺，再寫下面'] },
      { char: '光', jyutping: 'gwong1', meaning: 'Light', meaningZh: '光芒、光明', radical: '儿', radicalName: '兒部', strokeCount: 6, emoji: '💡',
        hints: ['上面兩小橫加豎，下面兒字底', '上面似火苗，下面似人', '成個字表示人頭上嘅光芒'] },
      { char: '夜', jyutping: 'je6', meaning: 'Night', meaningZh: '夜晚', radical: '夕', radicalName: '夕部', strokeCount: 8, emoji: '🌙',
        hints: ['上面「亠」，中間人，右下撇捺', '注意寫法順序由上到下', '包含「夕」部表示黃昏'] }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // Level 3: 高級 — 抽象概念同武道
  // ──────────────────────────────────────────────────────────
  level3: {
    name: '高級',
    nameEn: 'Master',
    subtitle: '武道精神',
    subtitleEn: 'Way of the Warrior',
    description: '挑戰複雜繁體字，體悟武道精神',
    descriptionEn: 'Master complex characters embodying the warrior spirit',
    requiredScore: 1200,
    passScore: 1400,
    characters: [
      { char: '道', jyutping: 'dou6', meaning: 'Way / Path', meaningZh: '道路、道理', radical: '辶', radicalName: '走之底（辶）', strokeCount: 13, emoji: '☯️',
        hints: ['先寫入面嘅「首」，最尾寫走之底', '走之底（辶）係最後寫嘅', '「首」代表頭腦，走之底代表行走——知行合一'] },
      { char: '義', jyutping: 'ji6', meaning: 'Righteousness', meaningZh: '正義、道義', radical: '羊', radicalName: '羊部', strokeCount: 13, emoji: '⚖️',
        hints: ['上面「羊」，下面「我」', '繁體義比簡體（义）複雜好多', '羊代表善良，我代表自己——善待自己同他人'] },
      { char: '禮', jyutping: 'lai5', meaning: 'Ritual / Politeness', meaningZh: '禮貌、禮儀', radical: '示', radicalName: '示部（礻）', strokeCount: 18, emoji: '🙏',
        hints: ['左邊示字旁（礻），右邊「豊」', '示字旁同祭祀有關', '繁體禮字筆畫好多，要耐心寫'] },
      { char: '智', jyutping: 'zi3', meaning: 'Wisdom', meaningZh: '智慧、聰明', radical: '日', radicalName: '日部', strokeCount: 12, emoji: '🧠',
        hints: ['上面「知」，下面「日」', '知係矢加口——口講有嘅放矢', '下面日代表光明——智慧帶嚟光明'] },
      { char: '勇', jyutping: 'jung5', meaning: 'Courage / Brave', meaningZh: '勇敢、勇氣', radical: '力', radicalName: '力部', strokeCount: 9, emoji: '💪',
        hints: ['上面「甬」，下面「力」', '力喺下面代表力量支撐', '成個字表示有膽識有力量'] },
      { char: '德', jyutping: 'dak1', meaning: 'Virtue / Morality', meaningZh: '品德、道德', radical: '彳', radicalName: '雙人旁（彳）', strokeCount: 15, emoji: '🌟',
        hints: ['左邊雙人旁，右邊複雜結構', '雙人旁表示同行為有關', '右邊由「十」「四」「一」「心」組成'] },
      { char: '師', jyutping: 'si1', meaning: 'Master / Teacher', meaningZh: '老師、師傅', radical: '巾', radicalName: '巾部', strokeCount: 10, emoji: '👨‍🏫',
        hints: ['左邊偏旁，右邊「帀」加「巾」', '繁體師同簡體（师）有啲唔同', '表示專業知識嘅傳授者'] },
      { char: '學', jyutping: 'hok6', meaning: 'Study / Learn', meaningZh: '學習、學問', radical: '子', radicalName: '子部', strokeCount: 16, emoji: '📚',
        hints: ['上面複雜（兩隻手捧住），下面「子」', '繁體學字筆畫好多', '子喺下面代表細路仔喺度學嘢'] },
      { char: '愛', jyutping: 'oi3', meaning: 'Love', meaningZh: '愛、鍾意', radical: '心', radicalName: '心部', strokeCount: 13, emoji: '❤️',
        hints: ['繁體愛字中間有「心」', '上面爪字蓋，中間有心，下面夂', '繁體嘅愛有心——「愛要用心」'] },
      { char: '夢', jyutping: 'mung6', meaning: 'Dream', meaningZh: '夢想、發夢', radical: '夕', radicalName: '夕部', strokeCount: 14, emoji: '💭',
        hints: ['上面草字頭加目，下面冖加夕', '有草有目有夕——夜晚閉眼所見', '繁體夢字結構複雜，由上到下寫'] },
      { char: '劍', jyutping: 'gim3', meaning: 'Sword', meaningZh: '寶劍、劍術', radical: '刀', radicalName: '立刀旁（刂）', strokeCount: 15, emoji: '⚔️',
        hints: ['左邊複雜結構，右邊立刀旁（刂）', '立刀旁喺右邊，最尾寫', '武道中劍係最重要嘅兵器之一'] },
      { char: '書', jyutping: 'syu1', meaning: 'Book / Writing', meaningZh: '書法、書本', radical: '曰', radicalName: '曰部', strokeCount: 10, emoji: '📖',
        hints: ['上面係聿（筆），下面係曰', '書道嘅「書」——用筆記錄語言', '繁體書比簡體（书）更加靚'] },
      { char: '畫', jyutping: 'waa2', meaning: 'Painting / Drawing', meaningZh: '繪畫、圖畫', radical: '田', radicalName: '田部', strokeCount: 12, emoji: '🎨',
        hints: ['上面橫，中間田加一，下面凵', '繁體畫比簡體（画）多咗一部分', '書畫同源——書法同繪畫關係密切'] },
      { char: '龍', jyutping: 'lung4', meaning: 'Dragon', meaningZh: '龍、神龍', radical: '龍', radicalName: '龍部', strokeCount: 16, emoji: '🐉',
        hints: ['繁體龍字係最複雜嘅常用字之一', '左邊立加月，右邊複雜結構', '龍係中華文化入面最神聖嘅象徵'] },
      { char: '武', jyutping: 'mou5', meaning: 'Martial / Military', meaningZh: '武術、武道', radical: '止', radicalName: '止部', strokeCount: 8, emoji: '🥋',
        hints: ['上面橫加弋，下面止', '止戈為武——停止干戈就係真正嘅武', '武道精神在於自律而唔係暴力'] },
      { char: '藝', jyutping: 'ngai6', meaning: 'Art / Skill', meaningZh: '藝術、技藝', radical: '艸', radicalName: '草字頭（艹）', strokeCount: 19, emoji: '🎭',
        hints: ['上面草字頭，中間埶，下面云', '筆畫非常之多，要有耐性', '藝術係書道修行嘅最高境界'] },
      { char: '戰', jyutping: 'zin3', meaning: 'Battle / War', meaningZh: '戰鬥、挑戰', radical: '戈', radicalName: '戈部', strokeCount: 16, emoji: '⚔️',
        hints: ['左邊「單」，右邊「戈」', '戈係古代嘅兵器', '繁體戰比簡體（战）複雜好多'] },
      { char: '練', jyutping: 'lin6', meaning: 'Practice / Train', meaningZh: '練習、訓練', radical: '糸', radicalName: '絲旁（糹）', strokeCount: 15, emoji: '🔄',
        hints: ['左邊絲旁（糹），右邊「柬」', '絲旁表示同絲線、纏繞有關', '練字好似練劍——需要反覆修行'] },
      { char: '國', jyutping: 'gwok3', meaning: 'Country / Nation', meaningZh: '國家', radical: '囗', radicalName: '國字框（囗）', strokeCount: 11, emoji: '🏯',
        hints: ['外面國字框（囗），入面「或」', '先寫外框，再寫入面，最尾封底', '國字框嘅寫法：先入後關'] },
      { char: '寶', jyutping: 'bou2', meaning: 'Treasure', meaningZh: '寶物、珍寶', radical: '宀', radicalName: '寶蓋頭（宀）', strokeCount: 20, emoji: '💎',
        hints: ['上面寶蓋頭，下面非常複雜', '寶蓋頭（宀）代表屋企庇護', '繁體寶字筆畫最多，係終極挑戰'] },
      { char: '心', jyutping: 'sam1', meaning: 'Heart / Mind', meaningZh: '心臟、心靈', radical: '心', radicalName: '心部', strokeCount: 4, emoji: '💗',
        hints: ['左點、臥鉤、上點、右點', '臥鉤係最難嘅一筆——要圓潤有力', '心係書道嘅核心——用心去寫'] },
      { char: '力', jyutping: 'lik6', meaning: 'Power / Strength', meaningZh: '力量、力氣', radical: '力', radicalName: '力部', strokeCount: 2, emoji: '⚡',
        hints: ['淨係兩筆：橫折鉤加撇', '雖然簡單但要寫得有力', '力透紙背——書法要有力量感'] }
    ]
  }
};

// 筆順通則（顯示為小貼士）
const STROKE_RULES = [
  { rule: '先橫後豎', ruleEn: 'Horizontal before vertical', example: '十' },
  { rule: '先撇後捺', ruleEn: 'Left-falling before right-falling', example: '人' },
  { rule: '由上到下', ruleEn: 'Top to bottom', example: '三' },
  { rule: '由左到右', ruleEn: 'Left to right', example: '林' },
  { rule: '先外後內', ruleEn: 'Outside before inside', example: '月' },
  { rule: '先入後關', ruleEn: 'Enter then close', example: '國' },
  { rule: '先中間後兩邊', ruleEn: 'Middle before sides', example: '小' }
];

// 基本筆畫（粵拼版）
const STROKE_TYPES = {
  waang4: { zh: '橫', en: 'Horizontal', desc: '由左到右嘅水平筆畫' },
  syu6: { zh: '豎', en: 'Vertical', desc: '由上到下嘅垂直筆畫' },
  pit3: { zh: '撇', en: 'Left-falling', desc: '由右上到左下嘅斜筆' },
  naat6: { zh: '捺', en: 'Right-falling', desc: '由左上到右下嘅斜筆' },
  dim2: { zh: '點', en: 'Dot', desc: '短促嘅點按筆畫' },
  zit3: { zh: '折', en: 'Turning', desc: '方向改變嘅折筆' },
  ngau1: { zh: '鉤', en: 'Hook', desc: '筆畫末端嘅鉤形轉折' },
  tai4: { zh: '提', en: 'Rising', desc: '由左下到右上嘅短斜筆' }
};
