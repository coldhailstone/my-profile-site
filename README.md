# 박찬우 | 프론트엔드 개발자 포트폴리오

박찬우 프론트엔드 개발자의 개인 포트폴리오 단일 페이지 사이트입니다.
빌드 도구 없이 브라우저에서 직접 실행되는 순수 정적 파일로 구성되어 있습니다.

## 미리보기

|               라이트 테마                | 다크 테마 |
| :--------------------------------------: | :-------: |
| `system → dark → light` 순서로 순환 전환 |           |

## 기술 스택

| 분류     | 기술                                             |
| -------- | ------------------------------------------------ |
| 마크업   | HTML5                                            |
| 스타일   | CSS3 (CSS 변수 기반 테마), Tailwind CSS v3 (CDN) |
| 스크립트 | Vanilla JavaScript (ES6+)                        |
| 폰트     | Noto Sans KR, JetBrains Mono (Google Fonts)      |
| 아이콘   | Font Awesome 6.5.0 (CDN)                         |

## 파일 구조

```
my-profile-site/
├── index.html   # 전체 마크업 + Tailwind CDN 인라인 설정
├── style.css    # CSS 변수 기반 테마, 커스텀 컴포넌트, 애니메이션
└── script.js    # 테마 전환, 타이핑 효과, 스크롤, 모바일 메뉴, 캔버스 파티클
```

## 주요 기능

### 테마 시스템

- `system → dark → light` 3단계 순환 전환
- Tailwind `darkMode: 'class'` — `<html>` 요소에 `dark` 클래스 토글
- 색상은 CSS 변수(`:root` / `.dark`)로 관리, localStorage에 선택 저장
- 시스템 테마 변경 시 자동 반응 (`prefers-color-scheme` 미디어 쿼리)

### 인터랙티브 파티클 배경

- `<canvas id="bg-canvas">` — `position: fixed` 전체 페이지 고정
- 파티클 간 연결선 + 마우스/터치 위치에 반응하는 반발 효과
- 섹션 배경이 반투명하여 캔버스가 모든 섹션에서 투과 보임
- 탭 비활성화 시 `visibilitychange`로 애니메이션 절전 처리

### 스크롤 애니메이션

- `.scroll-animate` 클래스 + `IntersectionObserver` → `.animate-in` 추가
- 페이드인, 슬라이드 좌/우 방향 지원
- 스킬 바: 뷰포트 진입 시 `width` 트랜지션 애니메이션

### 타이핑 효과

- 히어로 섹션 직함(프론트엔드 개발자, Vue.js 개발자 등) 자동 타이핑/삭제 루프

### 반응형 레이아웃

- 모바일: 햄버거 메뉴, 히어로 1열 레이아웃
- 태블릿/데스크탑: 히어로 3열 그리드, 플로팅 프로젝트 카드 표시

### 연락 폼

- `mailto:` 링크 방식 (별도 백엔드 불필요)

## 페이지 구성

| 섹션     | 내용                                                                            |
| -------- | ------------------------------------------------------------------------------- |
| Hero     | 이름, 직함 타이핑 효과, 소개 문구, 소셜 링크, 플로팅 프로젝트 카드              |
| Skills   | 언어/프레임워크/도구 카테고리 카드, 숙련도 바                                   |
| Projects | Vue Todo Master, Vanilla JS Shopping Mall, Analytics Dashboard, Vue Weather App |
| Contact  | 이메일·GitHub 연락처, 메시지 폼                                                 |

## 실행 방법

별도 빌드 과정 없이 `index.html`을 브라우저에서 직접 열거나 로컬 서버로 서빙합니다.

```bash
# Python 로컬 서버 (포트 8080)
python3 -m http.server 8080
```

이후 브라우저에서 `http://localhost:8080` 접속.

## 연락처

- **이메일**: cksn1993@gmail.com
- **GitHub**: https://github.com/coldhailstone
