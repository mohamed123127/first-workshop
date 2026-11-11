export interface TableColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  isUnique?: boolean;
  nullable: boolean;
  defaultValue?: string;
  description: string;
}

export interface UserRow {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: "instructor" | "admin" | "student";
  createdAt: string;
}

export interface DatabaseTable {
  id: string;
  name: string;
  rowCount: number;
  columnCount: number;
  description: string;
  iconName: "users" | "key" | "book" | "shield" | "history";
}

export interface DatabaseSlideContent {
  title: string;
  eyebrow: string;
  badge: string;
  subtitle: string;
  database: {
    name: string;
    engine: string;
    version: string;
    cluster: string;
    host: string;
    port: string;
    status: string;
  };
  tables: DatabaseTable[];
  usersTable: {
    schema: TableColumn[];
    rows: UserRow[];
    queryExecuted: string;
    queryLatency: string;
  };
}

export const databaseSlideContent: DatabaseSlideContent = {
  title: "Database Architecture & Tables",
  eyebrow: "Module 04 · Data Persistence & Storage Layer",
  badge: "Slide 07",
  subtitle: "Explore the database cluster: Schema definitions, relational tables, and live inspection of the 'users' table.",
  database: {
    name: "devup_production_db",
    engine: "PostgreSQL",
    version: "16.2 Enterprise",
    cluster: "db-eu-central-1.aws",
    host: "postgres://db.devup-club.dz",
    port: "5432",
    status: "HEALTHY & CONNECTED",
  },
  tables: [
    {
      id: "users",
      name: "users",
      rowCount: 5,
      columnCount: 6,
      description: "Member credentials, profiles and access roles",
      iconName: "users",
    },
    {
      id: "sessions",
      name: "sessions",
      rowCount: 18,
      columnCount: 5,
      description: "Active JWT session tokens & device timestamps",
      iconName: "key",
    },
    {
      id: "workshops",
      name: "workshops",
      rowCount: 12,
      columnCount: 6,
      description: "Workshop schedules, instructor links and attendance",
      iconName: "book",
    },
    {
      id: "roles_permissions",
      name: "roles_permissions",
      rowCount: 16,
      columnCount: 4,
      description: "RBAC security policies and endpoint capabilities",
      iconName: "shield",
    },
    {
      id: "audit_logs",
      name: "audit_logs",
      rowCount: 142,
      columnCount: 5,
      description: "Security trail for login attempts and access events",
      iconName: "history",
    },
  ],
  usersTable: {
    schema: [
      {
        name: "id",
        type: "UUID",
        isPrimary: true,
        nullable: false,
        defaultValue: "gen_random_uuid()",
        description: "Unique immutable entity identifier",
      },
      {
        name: "email",
        type: "VARCHAR(255)",
        isUnique: true,
        nullable: false,
        description: "User login address (B-Tree indexed for O(1) query lookup)",
      },
      {
        name: "password_hash",
        type: "VARCHAR(255)",
        nullable: false,
        description: "One-way salted bcrypt digest ($2b$12$) — never stored plaintext",
      },
      {
        name: "full_name",
        type: "VARCHAR(100)",
        nullable: false,
        description: "Display name for certificates and portal",
      },
      {
        name: "role",
        type: "VARCHAR(20)",
        nullable: false,
        defaultValue: "'student'",
        description: "Authorization level: instructor, admin, or student",
      },
      {
        name: "created_at",
        type: "TIMESTAMPTZ",
        nullable: false,
        defaultValue: "CURRENT_TIMESTAMP",
        description: "Account creation date & time",
      },
    ],
    rows: [
      {
        id: "a1c3e501-1b9f-43f2-901e-01a2b3c4d5e6",
        email: "mohamed@devup-club.dz",
        passwordHash: "$2b$12$e8J2Q9aP1mX...w7L4z",
        fullName: "Louahchi Mohamed",
        role: "instructor",
        createdAt: "2024-09-12 10:14:22",
      },
      {
        id: "b2d4f602-2c0a-44e3-812f-12b3c4d5e6f7",
        email: "nazim@devup-club.dz",
        passwordHash: "$2b$12$k9L3R0bQ2nY...x8M5a",
        fullName: "Benali Nazim",
        role: "instructor",
        createdAt: "2024-09-15 14:20:05",
      },
      {
        id: "c3e5a703-3d1b-45f4-923a-23c4d5e6f7a8",
        email: "sarah.a@devup-club.dz",
        passwordHash: "$2b$12$m0M4S1cR3oZ...y9N6b",
        fullName: "Sarah Amrani",
        role: "admin",
        createdAt: "2024-10-01 09:30:18",
      },
      {
        id: "d4f6b804-4e2c-46a5-a34b-34d5e6f7a8b9",
        email: "yanis.b@esi.dz",
        passwordHash: "$2b$12$n1N5T2dS4pa...z0O7c",
        fullName: "Yanis Benali",
        role: "student",
        createdAt: "2025-01-10 16:45:50",
      },
      {
        id: "e5a7c905-5f3d-47b6-b45c-45e6f7a8b9c0",
        email: "amine.k@usthb.dz",
        passwordHash: "$2b$12$o2O6U3eT5qb...a1P8d",
        fullName: "Amine Khelif",
        role: "student",
        createdAt: "2025-02-04 11:12:33",
      },
    ],
    queryExecuted: `SELECT id, email, password_hash, full_name, role
FROM public.users
WHERE email = 'mohamed@devup-club.dz'
LIMIT 1;`,
    queryLatency: "0.38 ms · Index Scan using idx_users_email",
  },
};

