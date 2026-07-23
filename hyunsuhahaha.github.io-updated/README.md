# hyunsuhahaha.github.io updated portfolio

정적 HTML/CSS/JavaScript로 구성한 GitHub Pages 배포용 포트폴리오입니다.

## 구성

- `index.html`: 메인 포트폴리오
- `projects/mes-anomaly-detection/index.html`: 생산관리 데이터 기반 이상징후 실시간 자동탐지 시스템 상세 페이지
- `assets/styles.css`: 공통 스타일
- `assets/app.js`: 모바일 메뉴, 스크롤 내비게이션, reveal animation
- `.nojekyll`: GitHub Pages에서 정적 파일을 그대로 제공하기 위한 파일

## 배포

1. 기존 `hyunsuhahaha.github.io` 저장소를 백업합니다.
2. 이 폴더의 모든 파일을 저장소 루트에 복사합니다.
3. `main` 브랜치에 커밋하고 push합니다.
4. GitHub 저장소의 **Settings → Pages**에서 `Deploy from a branch`, `main / root`를 선택합니다.

```bash
git add .
git commit -m "Redesign portfolio and add anomaly detection case study"
git push origin main
```

## 공개 전 확인

- 회사명 공개 가능 여부
- 실제 MES 주소, 내부 IP, 계정, 세션, 품목 코드, 생산량, QR/태그 번호 노출 여부
- 공개하지 않을 프로젝트 링크 및 내부 문서 제거
- 오탈자와 실제 구현 범위 확인

현재 화면의 생산 데이터는 모두 포트폴리오용 더미 데이터입니다.
