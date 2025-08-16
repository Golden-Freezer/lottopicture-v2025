# 🎲 LottoPicture v2025

> AI 기반 사진 분석 로또번호 생성 서비스

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-orange?style=flat-square&logo=tensorflow)](https://www.tensorflow.org/js)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-f38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)

## ✨ 주요 기능

- 🖼️ **사진 업로드**: 드래그앤드롭으로 쉬운 이미지 업로드
- 🤖 **AI 분석**: TensorFlow.js 기반 Teachable Machine 모델로 사진 분석
- 🎯 **로또번호 생성**: AI가 분석한 결과로 행운의 번호 6개 생성
- 📱 **반응형 디자인**: 모바일/데스크톱 완벽 대응
- ⚡ **빠른 성능**: Next.js 14 + Cloudflare Pages로 전 세계 빠른 접속
- 🎨 **모던 UI**: Tailwind CSS + Framer Motion 애니메이션

## 🚀 빠른 시작

### 개발 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/Golden-Freezer/lottopicture-v2025.git
cd lottopicture-v2025
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정**
`.env.local` 파일을 생성하고 다음 내용을 추가:
```env
NEXT_PUBLIC_TEACHABLE_MACHINE_MODEL_URL=https://teachablemachine.withgoogle.com/models/DNcvaZVEU/
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 정적 파일 확인 (out 폴더)
npm run start
```

## 🏗️ 기술 스택

### Frontend
- **Next.js 15.4** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS
- **Framer Motion** - 부드러운 애니메이션

### AI/ML
- **TensorFlow.js 4.22** - 브라우저에서 AI 모델 실행
- **Teachable Machine** - Google의 머신러닝 플랫폼

### 상태 관리
- **Zustand** - 가벼운 상태 관리 라이브러리

### 배포
- **Cloudflare Pages** - 전 세계 CDN 배포
- **Static Export** - 정적 사이트 생성

## 📁 프로젝트 구조

```
lottopicture-v2025/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 메인 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ImageUploader.tsx  # 이미지 업로드
│   ├── LottoBall.tsx      # 로또볼 표시
│   └── LottoGenerator.tsx # 메인 생성기
├── lib/                   # 유틸리티 라이브러리
│   ├── ai/                # AI 관련 로직
│   ├── utils/             # 공통 유틸리티
│   └── store.ts           # Zustand 스토어
├── types/                 # TypeScript 타입 정의
└── public/                # 정적 파일
```

## 🎯 사용 방법

1. **사진 업로드**: 메인 화면에서 사진을 드래그하거나 클릭하여 업로드
2. **AI 분석**: "행운의 번호 생성하기" 버튼을 클릭
3. **결과 확인**: AI가 생성한 6개의 로또번호 확인
4. **공유**: 생성된 번호를 SNS에 공유

## 🔧 개발 스크립트

```bash
# 개발 서버 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 코드 검사
npm run lint

# 타입 검사
npx tsc --noEmit
```

## 🌐 배포 정보

- **메인 사이트**: [https://lottopicture-v2025.pages.dev](https://lottopicture-v2025.pages.dev)
- **커스텀 도메인**: [https://lottopicture.shop](https://lottopicture.shop) (예정)
- **GitHub**: [https://github.com/Golden-Freezer/lottopicture-v2025](https://github.com/Golden-Freezer/lottopicture-v2025)

## ⚠️ 주의사항

- 본 서비스는 오락 목적으로만 제공됩니다
- AI가 생성한 번호의 당첨을 보장하지 않습니다
- 로또는 확률 게임이므로 과도한 구매는 자제해주세요

## 🤝 기여하기

1. Fork 저장소
2. 새 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 📞 문의

- 이메일: [your-email@example.com](mailto:your-email@example.com)
- GitHub Issues: [https://github.com/Golden-Freezer/lottopicture-v2025/issues](https://github.com/Golden-Freezer/lottopicture-v2025/issues)

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!