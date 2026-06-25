export type Language = 'id' | 'en' | 'zh' | 'ja' | 'ko';

export interface Translation {
  introWelcome: string;
  introUrl: string;
  logoText: string;
  languageLabel: string;
  roles: string[];
  roleDesc: string;
  github: string;
  tiktok: string;
  quotes: Array<{ text: string; author: string }>;
  profileTitle: string;
  profileRole: string;
  profileLabels: {
    age: string;
    education: string;
    location: string;
    experience: string;
  };
  profileValues: {
    age: string;
    education: string;
    location: string;
    experience: string;
  };
  skillsLeft: Array<{ title: string; desc: string }>;
  skillsRight: Array<{ title: string; desc: string }>;
  aboutTitle: string;
  aboutName: string;
  aboutDesc1: string;
  aboutDesc2: string;
  stats: {
    monthsTitle: string;
    monthsSub: string;
    projectsTitle: string;
    projectsSub: string;
  };
  journeyTitle: string;
  journeyItems: Array<{ period: string; title?: string; desc: string }>;
  projectTitle: string;
  projectSub: string;
  projectCardTitle: string;
  projectCardDesc: string;
  projectCardClick: string;
}

export const translations: Record<Language, Translation> = {
  id: {
    introWelcome: "Welcome to my portfolio website",
    introUrl: "www.alfa.vercel.app",
    logoText: "alfa",
    languageLabel: "Bahasa",
    roles: [
      "halo, saya ALFA",
      "A WEBSITE, AI, AND APPLICATION DEVELOPER",
      "QLP (QURANIC, LEADER, PRENEUR)",
      "A 9TH-GRADE STUDENT AT SMP QLP RABBANI"
    ],
    roleDesc: "merancang website, ai, aplikasi hanya untuk bersenang-senang",
    github: "Github",
    tiktok: "Tiktok",
    quotes: [
      {
        text: "Terimalah hal-hal yang dengannya takdir mengikatmu, dan cintailah orang-orang yang bersamamu, tetapi lakukanlah dengan sepenuh hatimu.",
        author: "Marcus Aurelius"
      },
      {
        text: "Kebahagiaan hidupmu bergantung pada kualitas pikiranmu",
        author: "Marcus Aurelius"
      }
    ],
    profileTitle: "Profil & Keahlian",
    profileRole: "Pengembang",
    profileLabels: {
      age: "Umur",
      education: "Pendidikan",
      location: "Lokasi",
      experience: "Pengalaman"
    },
    profileValues: {
      age: "14 Tahun",
      education: "SMP",
      location: "Indonesia",
      experience: "5 Bulan"
    },
    skillsLeft: [
      { title: "JavaScript", desc: "Frontend & Node.js" },
      { title: "HTML", desc: "Membuat struktur dan kerangka konten web" },
      { title: "CSS", desc: "Mengatur tampilan, gaya, dan tata letak visual" },
      { title: "App Architecture", desc: "Solusi web dan mobile" },
      { title: "Python", desc: "Backend & Analitik Data" }
    ],
    skillsRight: [
      { title: "Module Developer", desc: "Membuat Module untuk Devices android yang sudah di root" },
      { title: "Android Rom Developer", desc: "Membuat custom rom dan port os dari devices lain" }
    ],
    aboutTitle: "Tentang Saya",
    aboutName: "Halo, saya M****** R****** ALFA*****",
    aboutDesc1: "Saya adalah seorang developer pemula yang berasal dari Indonesia dengan 5 bulan pengalaman membangun mulai dari web, aplikasi, AI, ROM, port OS, membuat module.",
    aboutDesc2: "Saya menyukai coding karena melihat orang lain membuat web, app, AI, ROM, dan port OS. Dari situlah muncul perasaan penasaran untuk membuat ROM, dan port OS, nah dari situlah mulai tertarik dengan perduniaan coding berlanjut hingga sekarang.",
    stats: {
      monthsTitle: "5",
      monthsSub: "BULAN CODING",
      projectsTitle: "1",
      projectsSub: "project selesai"
    },
    journeyTitle: "Perjalananku",
    journeyItems: [
      { period: "2026 - januari", desc: "mulai membuat module" },
      { period: "2026 - februari", desc: "mulai belajar python secara otodidak dengan mengandalkan web, video, ai" },
      { period: "2026 - maret", desc: "mulai bisa dengan python" },
      { period: "2026 - april", desc: "mulai masuk bikin web" },
      { period: "2026 - mei", desc: "mulai masuk bikin app" },
      { period: "2026 - juni", desc: "mulai masuk bikin aplikasi" }
    ],
    projectTitle: "Proyek Utama",
    projectSub: "PROJECT akan terus di tambahkan seiring berjalannya waktu!",
    projectCardTitle: "Asisten AI Coding Khusus",
    projectCardDesc: "Aplikasi AI khusus yang dirancang untuk mempermudah proses coding dan pengembangan web.",
    projectCardClick: "Kunjungi AI Coder"
  },
  en: {
    introWelcome: "welcome to my portfolio website",
    introUrl: "www.alfa.vercel.app",
    logoText: "alfa",
    languageLabel: "Language",
    roles: [
      "hello, I am ALFA",
      "A WEBSITE, AI, AND APPLICATION DEVELOPER",
      "QLP (QURANIC, LEADER, PRENEUR)",
      "A 9TH-GRADE STUDENT AT SMP QLP RABBANI"
    ],
    roleDesc: "designing websites, AI, and applications just for fun",
    github: "Github",
    tiktok: "TikTok",
    quotes: [
      {
        text: "Accept the things to which fate binds you, and love the people with whom fate brings you together, but do so with all your heart.",
        author: "Marcus Aurelius"
      },
      {
        text: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius"
      }
    ],
    profileTitle: "Profile & Expertise",
    profileRole: "Developer",
    profileLabels: {
      age: "Age",
      education: "Education",
      location: "Location",
      experience: "Experience"
    },
    profileValues: {
      age: "14 Years Old",
      education: "Middle School",
      location: "Indonesia",
      experience: "5 Months"
    },
    skillsLeft: [
      { title: "JavaScript", desc: "Frontend & Node.js" },
      { title: "HTML", desc: "Creating structure and framing web content" },
      { title: "CSS", desc: "Managing visual appearance, style, and layout" },
      { title: "App Architecture", desc: "Web & Mobile Solutions" },
      { title: "Python", desc: "Backend & Data Analytics" }
    ],
    skillsRight: [
      { title: "Module Developer", desc: "Creating modules for rooted Android devices" },
      { title: "Android Rom Developer", desc: "Building custom ROMs and porting OS from other devices" }
    ],
    aboutTitle: "About Me",
    aboutName: "Hello, I am M****** R****** ALFA*****",
    aboutDesc1: "I am a beginner developer from Indonesia with 5 months of experience building websites, applications, AI, custom ROMs, OS ports, and system modules.",
    aboutDesc2: "I love coding because I saw others creating websites, apps, AI, ROMs, and OS ports. From there, curiosity sparked to build custom ROMs and port OS, which got me hooked on coding, and it continues to this day.",
    stats: {
      monthsTitle: "5",
      monthsSub: "MONTHS CODING",
      projectsTitle: "1",
      projectsSub: "project completed"
    },
    journeyTitle: "My Journey",
    journeyItems: [
      { period: "2026 - January", desc: "Started making modules" },
      { period: "2026 - February", desc: "Began learning Python self-taught, relying on websites, videos, and AI" },
      { period: "2026 - March", desc: "Gained proficiency in Python" },
      { period: "2026 - April", desc: "Started web development" },
      { period: "2026 - May", desc: "Started app development" },
      { period: "2026 - June", desc: "Started application development" }
    ],
    projectTitle: "Featured Project",
    projectSub: "PROJECTS will be added over time!",
    projectCardTitle: "Specialized AI Coding Assistant",
    projectCardDesc: "A dedicated AI tool designed to facilitate coding and web application engineering.",
    projectCardClick: "Visit AI Coder"
  },
  zh: {
    introWelcome: "欢迎来到我的作品集网站",
    introUrl: "www.alfa.vercel.app",
    logoText: "alfa",
    languageLabel: "语言",
    roles: [
      "你好，我是 ALFA",
      "网站、人工智能和应用开发人员",
      "QLP（古兰经、领导者、创业者）",
      "SMP QLP RABBANI 的九年级学生"
    ],
    roleDesc: "设计网站、AI 和应用程序，纯粹为了乐趣",
    github: "Github",
    tiktok: "抖音 (TikTok)",
    quotes: [
      {
        text: "接受命运将你与之处在一起的事物，并热爱命运带给你的人，但要全心全意地去做。",
        author: "马可·奥勒留"
      },
      {
        text: "你生活的幸福取决于你思想的品质。",
        author: "马可·奥勒留"
      }
    ],
    profileTitle: "个人资料与专长",
    profileRole: "开发人员",
    profileLabels: {
      age: "年龄",
      education: "教育",
      location: "地点",
      experience: "经验"
    },
    profileValues: {
      age: "14 岁",
      education: "初中",
      location: "印度尼西亚",
      experience: "5 个月"
    },
    skillsLeft: [
      { title: "JavaScript", desc: "前端与 Node.js" },
      { title: "HTML", desc: "构建结构和网页内容框架" },
      { title: "CSS", desc: "管理视觉外观、样式和布局" },
      { title: "应用架构", desc: "网页与移动解决方案" },
      { title: "Python", desc: "后端与数据分析" }
    ],
    skillsRight: [
      { title: "模块开发人员", desc: "为已 Root 的安卓设备制作模块" },
      { title: "安卓 Rom 开发人员", desc: "构建自定义 ROM 并移植其他设备的操作系统" }
    ],
    aboutTitle: "关于我",
    aboutName: "你好，我是 M****** R****** ALFA*****",
    aboutDesc1: "我是来自印度尼西亚的初级开发人员，拥有 5 个月的经验，涵盖网站、应用程序、AI、自定义 ROM、操作系统移植和系统模块的开发。",
    aboutDesc2: "我热爱编码，因为我看到别人在制作网站、应用程序、AI、ROM 和操作系统移植。正是从那时起，我产生了制作 ROM 和移植操作系统的强烈好奇心，这让我对编码世界产生了浓厚的兴趣，并一直持续到今天。",
    stats: {
      monthsTitle: "5",
      monthsSub: "个月编码时间",
      projectsTitle: "1",
      projectsSub: "个已完成项目"
    },
    journeyTitle: "我的旅程",
    journeyItems: [
      { period: "2026年 - 1月", desc: "开始制作模块" },
      { period: "2026年 - 2月", desc: "开始通过网络、视频和 AI 自学 Python" },
      { period: "2026年 - 3月", desc: "精通 Python" },
      { period: "2026年 - 4月", desc: "进入网页开发" },
      { period: "2026年 - 5月", desc: "开始应用开发" },
      { period: "2026年 - 6月", desc: "开始进行应用工程" }
    ],
    projectTitle: "特色项目",
    projectSub: "随着时间的推移，项目将不断增加！",
    projectCardTitle: "专业 AI 编码助手",
    projectCardDesc: "专为简化编码和 Web 开发而设计的 AI 辅助应用。",
    projectCardClick: "访问 AI 编码器"
  },
  ja: {
    introWelcome: "ポートフォリオサイトへようこそ",
    introUrl: "www.alfa.vercel.app",
    logoText: "alfa",
    languageLabel: "言語",
    roles: [
      "こんにちは、私は ALFA です",
      "ウェブ、AI、およびアプリ開発者",
      "QLP (QURANIC, LEADER, PRENEUR)",
      "SMP QLP RABBANI の 9 年生"
    ],
    roleDesc: "楽しみのためにウェブサイト、AI、アプリをデザインしています",
    github: "Github",
    tiktok: "TikTok",
    quotes: [
      {
        text: "運命があなたを結びつけるものを受け入れ、運命があなたを巡り合わせる人々を愛しなさい。しかし、心からそれを行いなさい。",
        author: "マルクス・アウレリウス"
      },
      {
        text: "あなたの人生の幸福は、あなたの思考の質にかかっています。",
        author: "マルクス・アウレリウス"
      }
    ],
    profileTitle: "プロフィールとスキル",
    profileRole: "開発者",
    profileLabels: {
      age: "年齢",
      education: "教育",
      location: "場所",
      experience: "経験"
    },
    profileValues: {
      age: "14 歳",
      education: "中学校",
      location: "インドネシア",
      experience: "5 ヶ月"
    },
    skillsLeft: [
      { title: "JavaScript", desc: "フロントエンドおよび Node.js" },
      { title: "HTML", desc: "ウェブ構造とコンテンツフレームワークの構築" },
      { title: "CSS", desc: "ビジュアル、スタイル、およびレイアウトの設計" },
      { title: "アプリ設計", desc: "ウェブおよびモバイルソリューション" },
      { title: "Python", desc: "バックエンドおよびデータ分析" }
    ],
    skillsRight: [
      { title: "モジュール開発者", desc: "ルート化されたAndroidデバイス用のモジュールの作成" },
      { title: "Android Rom 開発者", desc: "カスタムROMの構築および他デバイスからのOS移植" }
    ],
    aboutTitle: "私について",
    aboutName: "こんにちは、私は M****** R****** ALFA***** です",
    aboutDesc1: "私はインドネシア出身の駆け出し開発者で、ウェブ、アプリ、AI、カスタムROM、OS移植、システムモジュールの作成など、5ヶ月の経験があります。",
    aboutDesc2: "他の人がウェブ、アプリ、AI、ROM、OS移植を行っているのを見て、コーディングに興味を持ちました。そこからカスタムROMやOS移植を作りたいという好奇心が湧き、コーディングの世界に惹かれ、今に至ります。",
    stats: {
      monthsTitle: "5",
      monthsSub: "ヶ月のコーディング",
      projectsTitle: "1",
      projectsSub: "プロジェクト完了"
    },
    journeyTitle: "私の道のり",
    journeyItems: [
      { period: "2026年 - 1月", desc: "モジュールの作成を開始" },
      { period: "2026年 - 2月", desc: "ウェブ、動画、AIを活用して独学でPythonの学習を開始" },
      { period: "2026年 - 3月", desc: "Pythonのスキルを習得" },
      { period: "2026年 - 4月", desc: "ウェブ開発を開始" },
      { period: "2026年 - 5月", desc: "アプリ開発を開始" },
      { period: "2026年 - 6月", desc: "アプリケーション構築を開始" }
    ],
    projectTitle: "代表的なプロジェクト",
    projectSub: "プロジェクトは時間とともに随時追加されます！",
    projectCardTitle: "特化型 AI コーディングアシスタント",
    projectCardDesc: "コーディングやウェブアプリケーション構築を支援するために設計された専用AIツール。",
    projectCardClick: "AI コーダーを訪ねる"
  },
  ko: {
    introWelcome: "포트폴리오 웹사이트에 오신 것을 환영합니다",
    introUrl: "www.alfa.vercel.app",
    logoText: "alfa",
    languageLabel: "언어",
    roles: [
      "안녕하세요, 저는 ALFA입니다",
      "웹, AI 및 애플리케이션 개발자",
      "QLP (QURANIC, LEADER, PRENEUR)",
      "SMP QLP RABBANI의 9학년 학생"
    ],
    roleDesc: "단지 재미를 위해 웹사이트, AI, 애플리케이션을 디자인합니다",
    github: "Github",
    tiktok: "TikTok",
    quotes: [
      {
        text: "운명이 너를 묶어놓은 것들을 받아들이고, 운명이 너에게 함께하게 한 사람들을 사랑하되, 온 마음을 다해 그렇게 하라.",
        author: "마르쿠스 아우렐리우스"
      },
      {
        text: "네 삶의 행복은 네 생각의 질에 달려 있다.",
        author: "마르쿠스 아우렐리우스"
      }
    ],
    profileTitle: "프로필 및 핵심 기술",
    profileRole: "개발자",
    profileLabels: {
      age: "나이",
      education: "학력",
      location: "위치",
      experience: "경력"
    },
    profileValues: {
      age: "14세",
      education: "중학교",
      location: "인도네시아",
      experience: "5개월"
    },
    skillsLeft: [
      { title: "JavaScript", desc: "프론트엔드 및 Node.js" },
      { title: "HTML", desc: "웹 구조와 콘텐츠 프레임워크 제작" },
      { title: "CSS", desc: "시각적 요소, 스타일 및 레이아웃 관리" },
      { title: "App Architecture", desc: "웹 및 모바일 솔루션" },
      { title: "Python", desc: "백엔드 및 데이터 분석" }
    ],
    skillsRight: [
      { title: "모듈 개발자", desc: "루팅된 안드로이드 기기용 모듈 제작" },
      { title: "안드로이드 Rom 개발자", desc: "커스텀 ROM 구축 및 타 기기 OS 포팅" }
    ],
    aboutTitle: "소개",
    aboutName: "안녕하세요, 저는 M****** R****** ALFA*****입니다",
    aboutDesc1: "저는 인도네시아 출신의 초보 개발자로, 웹, 애플리케이션, AI, 커스텀 ROM, OS 포팅, 시스템 모듈 등 5개월간의 개발 경험이 있습니다.",
    aboutDesc2: "다른 사람들이 웹, 앱, AI, ROM, OS 포팅을 만드는 것을 보고 흥미가 생겨 코딩을 사랑하게 되었습니다. 거기서 나만의 커스텀 ROM과 OS 포팅을 만들고 싶다는 호기심이 생겼고, 그때부터 코딩 세계에 빠져들어 지금까지 이어지고 있습니다.",
    stats: {
      monthsTitle: "5",
      monthsSub: "개월간의 코딩",
      projectsTitle: "1",
      projectsSub: "프로젝트 완료"
    },
    journeyTitle: "나의 여정",
    journeyItems: [
      { period: "2026년 - 1월", desc: "모듈 제작 시작" },
      { period: "2026년 - 2월", desc: "웹, 비디오, AI에 의존하여 Python을 독학하기 시작" },
      { period: "2026년 - 3월", desc: "Python 숙련도 확보" },
      { period: "2026년 - 4월", desc: "웹 개발 입문" },
      { period: "2026년 - 5월", desc: "앱 개발 입문" },
      { period: "2026년 - 6월", desc: "애플리케이션 구축 시작" }
    ],
    projectTitle: "주요 프로젝트",
    projectSub: "프로젝트는 시간이 지남에 따라 계속 추가됩니다!",
    projectCardTitle: "특화형 AI 코딩 어시스턴트",
    projectCardDesc: "코딩 및 웹 애플리케이션 구축을 용이하게 하기 위해 특별히 설계된 전용 AI 도구입니다.",
    projectCardClick: "AI 코더 방문하기"
  }
};
