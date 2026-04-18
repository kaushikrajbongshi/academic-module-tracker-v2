src/
├── app.module.ts
├── main.ts
│
├── common/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── response.interceptor.ts
│   └── pipes/
│       └── validation.pipe.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
│── Phase 1 – Core System Modules ─────────────────────────────────
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   └── dto/
│       └── login.dto.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── roles/
│   ├── roles.module.ts
│   ├── roles.controller.ts
│   ├── roles.service.ts
│   └── dto/
│       └── create-role.dto.ts
│
├── department/
│   ├── department.module.ts
│   ├── department.controller.ts
│   ├── department.service.ts
│   └── dto/
│       ├── create-department.dto.ts
│       └── update-department.dto.ts
│
├── course/
│   ├── course.module.ts
│   ├── course.controller.ts
│   ├── course.service.ts
│   └── dto/
│       ├── create-course.dto.ts
│       └── update-course.dto.ts
│
├── semester/
│   ├── semester.module.ts
│   ├── semester.controller.ts
│   ├── semester.service.ts
│   └── dto/
│       └── create-semester.dto.ts
│
├── academic-year/
│   ├── academic-year.module.ts
│   ├── academic-year.controller.ts
│   ├── academic-year.service.ts
│   └── dto/
│       ├── create-academic-year.dto.ts
│       └── update-academic-year.dto.ts
│
│── Phase 2 – People Modules ───────────────────────────────────────
│
├── faculty/
│   ├── faculty.module.ts
│   ├── faculty.controller.ts
│   ├── faculty.service.ts
│   └── dto/
│       ├── create-faculty.dto.ts
│       └── update-faculty.dto.ts
│
├── student/
│   ├── student.module.ts
│   ├── student.controller.ts
│   ├── student.service.ts
│   └── dto/
│       ├── create-student.dto.ts
│       └── update-student.dto.ts
│
├── faculty-course/
│   ├── faculty-course.module.ts
│   ├── faculty-course.controller.ts
│   ├── faculty-course.service.ts
│   └── dto/
│       ├── create-faculty-course.dto.ts
│       └── update-faculty-course.dto.ts
│
├── student-course/
│   ├── student-course.module.ts
│   ├── student-course.controller.ts
│   ├── student-course.service.ts
│   └── dto/
│       └── create-student-course.dto.ts
│
│── Phase 3 – Academic Structure Modules ───────────────────────────
│
├── subject/
│   ├── subject.module.ts
│   ├── subject.controller.ts
│   └── subject.service.ts
│
├── topic/
│   ├── topic.module.ts
│   ├── topic.controller.ts
│   ├── topic.service.ts
│   └── dto/
│       ├── create-topic.dto.ts
│       └── update-topic.dto.ts
│
├── subtopic/
│   ├── subtopic.module.ts
│   ├── subtopic.controller.ts
│   ├── subtopic.service.ts
│   └── dto/
│       ├── create-subtopic.dto.ts
│       └── update-subtopic.dto.ts
│
├── topic-coverage/
│   ├── topic-coverage.module.ts
│   ├── topic-coverage.controller.ts
│   ├── topic-coverage.service.ts
│   └── dto/
│       ├── create-topic-coverage.dto.ts
│       └── update-topic-coverage.dto.ts
│
│── Phase 4 – Academic Operation Modules ───────────────────────────
│
├── attendance/
│   ├── attendance.module.ts
│   ├── attendance.controller.ts
│   ├── attendance.service.ts
│   └── dto/
│       └── create-attendance.dto.ts
│
├── internal-marks/
│   ├── internal-marks.module.ts
│   ├── internal-marks.controller.ts
│   ├── internal-marks.service.ts
│   └── dto/
│       └── create-internal-marks.dto.ts
│
├── result-summary/
│   ├── result-summary.module.ts
│   ├── result-summary.controller.ts
│   └── result-summary.service.ts
│
│── Phase 5 – System & Advanced Modules ────────────────────────────
│
├── reports/
│   ├── reports.module.ts
│   ├── reports.controller.ts
│   └── reports.service.ts        ← ExcelJS lives here
│
├── dashboard/
│   ├── dashboard.module.ts
│   ├── dashboard.controller.ts
│   └── dashboard.service.ts
│
├── audit-log/
│   ├── audit-log.module.ts
│   ├── audit-log.controller.ts
│   ├── audit-log.service.ts
│   └── dto/
│       └── create-audit-log.dto.ts
│
└── notification/
    ├── notification.module.ts
    ├── notification.controller.ts
    ├── notification.service.ts
    └── dto/
        └── create-notification.dto.ts