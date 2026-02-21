# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

박찬우 프론트엔드 개발자 포트폴리오 단일 페이지 사이트. 빌드 도구 없이 브라우저에서 직접 실행하는 순수 정적 파일.

**실행 방법**: `index.html`을 브라우저에서 직접 열거나 로컬 서버로 서빙.

```bash
# 로컬 서버 예시 (Python)
python3 -m http.server 8080
```

## 파일 구조 및 역할

| 파일 | 역할 |
|---|---|
| `index.html` | 전체 마크업 + Tailwind CDN 인라인 설정 |
| `style.css` | CSS 변수 기반 테마, 커스텀 컴포넌트, 애니메이션 |
| `script.js` | 테마 전환, 타이핑 효과, 스크롤, 모바일 메뉴, 캔버스 파티클 |

## 테마 시스템

- Tailwind `darkMode: 'class'` — `<html>` 요소에 `dark` 클래스 토글
- 색상은 **CSS 변수**로 관리: `:root` (라이트) / `.dark` (다크)
- 테마 순환: `system → dark → light` (localStorage에 저장)
- Tailwind는 레이아웃·간격 담당, 색상은 CSS 변수 사용

## 캔버스 파티클 배경

- `<canvas id="bg-canvas">`: `position: fixed; z-index: 0` — 전체 페이지에 고정
- 섹션 배경이 반투명(`--color-section`, `--color-section-alt`)이라 캔버스가 모든 섹션에서 보임
- `script.js` IIFE `initBgCanvas()` 안에 `Particle` 클래스, `drawConnections()`, `animate()` 포함
- `animate()`는 매 프레임 `isDark` boolean을 읽어 라이트/다크별 색상·alpha를 독립 제어

## 주요 설계 패턴

- **스킬 바**: `--bar-color` CSS 인라인 변수로 개별 색상 지정, JS `IntersectionObserver`로 width 애니메이션
- **스크롤 페이드인**: `.scroll-animate` 클래스 + `IntersectionObserver` → `.animate-in` 추가
- **연락 폼**: `mailto:` 링크 방식 (백엔드 없음)
- **외부 의존성**: Tailwind CDN, Google Fonts (Noto Sans KR, JetBrains Mono), Font Awesome 6.5.0 CDN
