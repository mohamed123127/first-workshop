export interface DiagramUnit {
  id: number;
  title: string;
  subtitle: string;
  codeSnippet: string;
  lineStart: number;
  lineEnd: number;
  hasDatabaseTop?: boolean;
}

export interface WebBehindScenesContent {
  title: string;
  eyebrow: string;
  badge: string;
  subtitle: string;
  backend: {
    name: string;
    runtime: string;
    endpoint: string;
    method: string;
    port: string;
    status: string;
  };
  code: {
    title: string;
    filename: string;
    lines: Array<{
      num: number;
      unitId?: number;
      tokens: Array<{ text: string; color?: string; bold?: boolean }>;
    }>;
  };
  diagramUnits: DiagramUnit[];
}

export const webBehindScenesContent: WebBehindScenesContent = {
  title: "Web Behind the Scenes",
  eyebrow: "Module 03 · Server & Execution Architecture",
  badge: "Slide 06",
  subtitle: "Inside the server runtime: How the backend receives your credentials, executes secure logic, and mints an authenticated session.",
  backend: {
    name: "PRODUCTION BACKEND ENGINE",
    runtime: "Node.js v20.x · Express / REST API",
    endpoint: "/api/v1/auth/login",
    method: "POST",
    port: "443 (HTTPS)",
    status: "LISTENING & ACTIVE",
  },
  code: {
    title: "Login Feature",
    filename: "controllers/auth.controller.ts",
    lines: [
      {
        num: 1,
        tokens: [
          { text: "import", color: "text-purple-400" },
          { text: " bcrypt ", color: "text-slate-200" },
          { text: "from", color: "text-purple-400" },
          { text: " 'bcrypt';", color: "text-emerald-400" },
        ],
      },
      {
        num: 2,
        tokens: [
          { text: "import", color: "text-purple-400" },
          { text: " jwt ", color: "text-slate-200" },
          { text: "from", color: "text-purple-400" },
          { text: " 'jsonwebtoken';", color: "text-emerald-400" },
        ],
      },
      {
        num: 3,
        tokens: [
          { text: "import", color: "text-purple-400" },
          { text: " { db } ", color: "text-cyan-300" },
          { text: "from", color: "text-purple-400" },
          { text: " '@/lib/db';", color: "text-emerald-400" },
        ],
      },
      {
        num: 4,
        tokens: [],
      },
      {
        num: 5,
        tokens: [
          { text: "// POST /api/v1/auth/login", color: "text-slate-500" },
        ],
      },
      {
        num: 6,
        tokens: [
          { text: "export async function ", color: "text-purple-400" },
          { text: "loginHandler", color: "text-cyan-400 font-bold" },
          { text: "(req: Request, res: Response) {", color: "text-slate-200" },
        ],
      },
      // ── UNIT 1: RECEIVE INPUT (Lines 7-8) ──
      {
        num: 7,
        unitId: 1,
        tokens: [
          { text: "  // 1. Receive Input from HTTP request body", color: "text-cyan-400 font-semibold" },
        ],
      },
      {
        num: 8,
        unitId: 1,
        tokens: [
          { text: "  const ", color: "text-purple-400" },
          { text: "{ email, password } = req.body;", color: "text-cyan-200 font-medium" },
        ],
      },
      {
        num: 9,
        tokens: [],
      },
      // ── UNIT 2: INPUT VALIDATION (Lines 10-15) ──
      {
        num: 10,
        unitId: 2,
        tokens: [
          { text: "  // 2. Input Validation (sanitize & check format)", color: "text-amber-400 font-semibold" },
        ],
      },
      {
        num: 11,
        unitId: 2,
        tokens: [
          { text: "  if ", color: "text-purple-400" },
          { text: "(!email || !password || !email.includes('@')) {", color: "text-amber-200" },
        ],
      },
      {
        num: 12,
        unitId: 2,
        tokens: [
          { text: "    return ", color: "text-purple-400" },
          { text: "res.", color: "text-slate-300" },
          { text: "status", color: "text-amber-400" },
          { text: "(400).", color: "text-slate-300" },
          { text: "json", color: "text-amber-400" },
          { text: "({ error: ", color: "text-slate-300" },
          { text: "'Invalid email or password format'", color: "text-rose-400" },
          { text: " });", color: "text-slate-300" },
        ],
      },
      {
        num: 13,
        unitId: 2,
        tokens: [
          { text: "  }", color: "text-purple-400" },
        ],
      },
      {
        num: 14,
        tokens: [],
      },
      // ── UNIT 3: CHECK INTO DB (Lines 15-24) ──
      {
        num: 15,
        unitId: 3,
        tokens: [
          { text: "  // 3. Check into DB (query record & verify password hash)", color: "text-indigo-400 font-semibold" },
        ],
      },
      {
        num: 16,
        unitId: 3,
        tokens: [
          { text: "  const ", color: "text-purple-400" },
          { text: "user = ", color: "text-slate-200" },
          { text: "await ", color: "text-purple-400" },
          { text: "db.user.", color: "text-slate-300" },
          { text: "findUnique", color: "text-amber-400" },
          { text: "({ where: { email } });", color: "text-slate-200" },
        ],
      },
      {
        num: 17,
        unitId: 3,
        tokens: [
          { text: "  if ", color: "text-purple-400" },
          { text: "(!user) {", color: "text-slate-200" },
        ],
      },
      {
        num: 18,
        unitId: 3,
        tokens: [
          { text: "    return ", color: "text-purple-400" },
          { text: "res.", color: "text-slate-300" },
          { text: "status", color: "text-amber-400" },
          { text: "(401).", color: "text-slate-300" },
          { text: "json", color: "text-amber-400" },
          { text: "({ error: ", color: "text-slate-300" },
          { text: "'User does not exist'", color: "text-rose-400" },
          { text: " });", color: "text-slate-300" },
        ],
      },
      {
        num: 19,
        unitId: 3,
        tokens: [
          { text: "  }", color: "text-purple-400" },
        ],
      },
      {
        num: 20,
        unitId: 3,
        tokens: [
          { text: "  const ", color: "text-purple-400" },
          { text: "isMatch = ", color: "text-slate-200" },
          { text: "await ", color: "text-purple-400" },
          { text: "bcrypt.", color: "text-slate-300" },
          { text: "compare", color: "text-amber-400" },
          { text: "(password, user.passwordHash);", color: "text-slate-200" },
        ],
      },
      {
        num: 21,
        unitId: 3,
        tokens: [
          { text: "  if ", color: "text-purple-400" },
          { text: "(!isMatch) {", color: "text-slate-200" },
        ],
      },
      {
        num: 22,
        unitId: 3,
        tokens: [
          { text: "    return ", color: "text-purple-400" },
          { text: "res.", color: "text-slate-300" },
          { text: "status", color: "text-amber-400" },
          { text: "(401).", color: "text-slate-300" },
          { text: "json", color: "text-amber-400" },
          { text: "({ error: ", color: "text-slate-300" },
          { text: "'Invalid password'", color: "text-rose-400" },
          { text: " });", color: "text-slate-300" },
        ],
      },
      {
        num: 23,
        unitId: 3,
        tokens: [
          { text: "  }", color: "text-purple-400" },
        ],
      },
      {
        num: 24,
        tokens: [],
      },
      // ── UNIT 4: RETURN THE RESPONSE (Lines 25-29) ──
      {
        num: 25,
        unitId: 4,
        tokens: [
          { text: "  // 4. Return the Response (mint token & send HTTP 200 OK)", color: "text-emerald-400 font-semibold" },
        ],
      },
      {
        num: 26,
        unitId: 4,
        tokens: [
          { text: "  const ", color: "text-purple-400" },
          { text: "token = jwt.", color: "text-slate-200" },
          { text: "sign", color: "text-amber-400" },
          { text: "({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });", color: "text-slate-200" },
        ],
      },
      {
        num: 27,
        unitId: 4,
        tokens: [
          { text: "  res.", color: "text-slate-300" },
          { text: "cookie", color: "text-amber-400" },
          { text: "('session_token', token, { httpOnly: true, secure: true });", color: "text-emerald-300" },
        ],
      },
      {
        num: 28,
        unitId: 4,
        tokens: [
          { text: "  return ", color: "text-purple-400" },
          { text: "res.", color: "text-slate-300" },
          { text: "status", color: "text-amber-400" },
          { text: "(200).", color: "text-slate-300" },
          { text: "json", color: "text-amber-400" },
          { text: "({ success: true, user: { id: user.id, email: user.email } });", color: "text-slate-200" },
        ],
      },
      {
        num: 29,
        tokens: [
          { text: "}", color: "text-purple-400" },
        ],
      },
    ],
  },
  diagramUnits: [
    {
      id: 1,
      title: "Receive Input",
      subtitle: "req.body (email, password)",
      codeSnippet: "const { email, password } = req.body;",
      lineStart: 7,
      lineEnd: 8,
    },
    {
      id: 2,
      title: "Input Validation",
      subtitle: "Check presence & format",
      codeSnippet: "if (!email || !password) ... return 400",
      lineStart: 10,
      lineEnd: 13,
    },
    {
      id: 3,
      title: "Check into DB",
      subtitle: "Query user & bcrypt hash",
      codeSnippet: "db.user.findUnique() + bcrypt.compare()",
      lineStart: 15,
      lineEnd: 23,
      hasDatabaseTop: true,
    },
    {
      id: 4,
      title: "Return the Response",
      subtitle: "Set cookie & return 200 OK",
      codeSnippet: "res.cookie('session') + res.status(200)",
      lineStart: 25,
      lineEnd: 28,
    },
  ],
};
