const skills = [
    {
      title: 'Skills',
      skilList: [
        {name : 'HTML', img : '../public_assets/html.png', id: 0},
        {name : 'CSS', img : '../public_assets/css.png', id: 1},
        {name : 'Javasctipt(ES6+)', img : '../public_assets/js.png', id: 2},
        {name : 'React', img : '../public_assets/react.png', id: 3},
        {name : 'Figma', img : '../public_assets/figma.png', id: 4},
        {name : 'SCSS', img : '../public_assets/scss.png', id: 5},
      ]
    },
    {
      title: 'Library',
      skilList: [
        {name : 'StyledComponent', img : '../public_assets/sc.png', id: 0},
        {name : 'Framer Motion', img : '../public_assets/framer.png', id: 1},
        {name : 'fullCalendar', img : '../public_assets/fullcalendar.png', id: 2},
        {name : 'Toast UI', img : '../public_assets/tuiimg.png', id: 3},
        {name : 'GSAP', img : '../public_assets/scss.png', id: 4},
      ]
    },
    {
      title: 'Repository',
      skilList: [
        {name : 'GitHub', img : '../public_assets/github.png', id: 0},
        {name : 'Netlify', img : '../public_assets/netlify.png', id: 1}
      ]
    },
    {
      title: 'Salesforce',
      skilList: [
        {name : 'Salesforce', img : '../public_assets/salesforce.png', id: 0},
        {name : 'LWC', img : '../public_assets/light.png', id: 1},
        {name : 'AURA', img : '../public_assets/lightning.png', id: 2},
      ]
    },
];

const projectList = [
    {
        title: 'GS건설 After Market 프로젝트',
        startDate: '2021.10.01',
        endDate: '2021.11.30',
        taskList: [
            {task : 'APEX Class 내부 CRM 데이터 쿼리 및 테스트 코드 작성'},
            {task: '내부 CRM 메인과 PDF 화면 퍼블리싱 및 PDF 다운로드 기능 구현'}
        ],
        skills: [
            {name: 'APEX'}, 
            {name: 'VisualForce Page'}
        ]
    },
    {
        title: 'LG화학 석유화학사업본부 디지털 CRM 확산 구축',
        startDate: '2021.11.29',
        endDate: '2022.02.28',
        taskList: [
            {task : 'LG ChemOn 고객채널 (반응형 포함)'},
            {task: '견본(sample) List View 및 Detail SidePanel 데이터 연결'}
        ],
        skills: [
            {name: 'AURA Component'}
        ]
    },
    {
        title: 'LG화학_석유화학 해외법인 확산',
        startDate: '2022.04.15',
        endDate: '2022.08.12',
        taskList: [
            {task : 'LG ChemOn 고객채널 - ABS 사업부 고도화 (반응형 포함)'},
            {task: 'non-spec-in List View 및 Detail SidePanel 데이터 분기'},
            {task: '기술협업요청 - 견본요청 및 환경안전지원 요청 Modal 데이터 save 작업 (swiper 라이브러리 사용)'},
            {task: '환경안전지원 소개 페이지, ESG 페이지 퍼블리싱 및 PDF 다운로드 기능 추가'},
            {task: '본부, 사업부 각 Trend News 페이지 작업 (필터별 리스트 분기처리, 페이징, 스크롤 시 리스트 고정 개수 Clone 추가)'},
        ],
        skills: [
            {name: 'AURA Component'}
        ]
    },
    {
        title: 'LG화학 디지털 CRM 확산 고도화',
        startDate: '2022.10.01',
        endDate: '2023.02.28',
        taskList: [
            {task : 'LG ChemOn 고객채널 - 2차 고도화 (반응형 포함)'},
            {task: '배송 Detail 페이지 수출 파트의 상태별 노출되는 요건 수정 (3가지 서류 다운로드 추가, DHL Pantos 조회 페이지 연결)'},
            {task: '배송 수출 파트 Vanning Report Modal Component 작업 (Exel, PDF 다운로드 추가, PDF 화면 퍼블리싱)'},
            {task: '기타알림설정 Modal 작업 - 내부 CRM과 고객채널 간의 알림 제어 기능 구현'},
            {task: '조직개편으로 인한 사업부 변경 및 병합의 요건에 맞게 주문 화면에 노출되는 사업부, Account, 제품군 분기 처리'},
            {task: '조직개편 관련 공통 컨텐츠 영역 UI 개선 작업'},
        ],
        skills: [
            {name: 'AURA Component'},
            {name: 'VisualForce Page'},
            {name: 'Lightning Web Component'}
        ]
    },
    {
        title: 'LG화학 디지털 경험개선 리뉴얼',
        startDate: '2023.06.01',
        endDate: '2023.12.15',
        taskList: [
            {task : 'LG ChemOn 고객채널 - AURA Component 속도 한계로 인해  Lightning Web Component로 리뉴얼 (반응형 포함)'},
            {task: '회원가입, 비밀번호찾기 페이지 리뉴얼'},
            {task: '뉴스룸 페이지 리뉴얼 , 글로벌 네트워크 페이지 신규 작업'},
            {task: '기존에 나뉘어 있던 주문, 배송 페이지 하나의 Component로 리뉴얼'},
            {task: '주문요청(내수, 수출, 해외법인) 페이지 각 Account에 따른 노출 요건 및 데이터 분기 처리 - 리뉴얼'},
            {task: '공통 Skeleton UI 구현'},
        ],
        skills: [
            {name: 'Lightning Web Component'}
        ]
    },
    {
        title: 'CJ FreshWay CRM 고도화 - 지원',
        startDate: '2024.01.22',
        endDate: '2024.02.26',
        taskList: [
            {task : '고객지원 모달 오픈 시 생성 및 수정 조건에 따라 데이터 테이블 생성 및 UI 재배치'},
        ],
        skills: [
            {name: 'Lightning Web Component'}
        ]
    },
    {
        title: '석유화학 디지털 CRM 현지 디지털 마케팅_영업환경 구현',
        startDate: '2024.04.01',
        endDate: '2024.05.31',
        taskList: [
            {task : 'LG ChemOn 고객채널 - 2차 리뉴얼 (반응형 포함)'},
            {task: '이벤트/프로모션 페이지 신규 작업 - 로그인 여부와 이메일 수신 동의 여부로 페이지 구성 제어'},
            {task: '제품>산업군 마우스 액션 시 각 파츠 또는 탭 별로 컬러 on/off 추가'},
        ],
        skills: [
            {name: 'Lightning Web Component'}
        ]
    },
    {
        title: 'YG Plus 음악사업 플랫폼 구축',
        startDate: '2024.06.03',
        endDate: '2024.08.30',
        taskList: [
            {task : '앨범 List vIew, 앨범등록 페이지 작업'},
            {task: 'FullCalendar 라이브러리를 사용한 캘린더 페이지 작업'},
            {task: 'Q&A 목록 및 문의등록 페이지 데이터 연결'},
            {task: '마이페이지 데이터 연결'},
        ],
        skills: [
            {name: 'Lightning Web Component'}
        ]
    },
    {
        title: '내부 SRM MVP ver 1.0 제품개발',
        startDate: '2024.10.08',
        endDate: '2024.12.31',
        taskList: [
            {task: '공통 이벤트 핸들러 개발'},
            {task: 'TUI 우클릭 이벤트, 데이터 필터링'},
        ],
        skills: [
            {name: 'Lightning Web Component'},
            {name: 'Toust UI Grid'}
        ]
    },
]

export { skills, projectList };