import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const KEY = "feedlink.session";
const USERS_KEY = "feedlink.accounts.v1";

type Session = { phone: string; business?: string; owner?: string };

type Account = {
  phone: string;
  password: string;
  business: string;
  owner: string;
};

export type SignupInput = {
  phone: string;
  password: string;
  business: string;
  owner: string;
};

type AuthValue = {
  ready: boolean;
  session: Session | null;
  /** Resolves to an error message, or null on success. */
  signIn: (phone: string, password: string) => Promise<string | null>;
  signUp: (input: SignupInput) => Promise<string | null>;
  /** Checks a mobile number has a registered account (forgot-password step 1). */
  findAccount: (phone: string) => Promise<{ ok: boolean; error?: string; owner?: string }>;
  /** Sets a new password for a registered mobile number. */
  resetPassword: (phone: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

function readAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Account[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(list: Account[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSession(JSON.parse(raw) as Session);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Session) => {
    setSession(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback(
    async (phone: string, password: string) => {
      await wait();
      const accounts = readAccounts();
      if (accounts.length === 0) {
        // No local accounts yet — allow first-time access for demo dealers.
        persist({ phone });
        return null;
      }
      const match = accounts.find((a) => a.phone === phone);
      if (!match) return "No account found for this mobile number";
      if (match.password !== password) return "Incorrect password";
      persist({ phone: match.phone, business: match.business, owner: match.owner });
      return null;
    },
    [persist],
  );

  const signUp = useCallback(
    async ({ phone, password, business, owner }: SignupInput) => {
      await wait();
      const accounts = readAccounts();
      if (accounts.some((a) => a.phone === phone)) {
        return "An account already exists for this mobile number";
      }
      const next: Account = { phone, password, business, owner };
      writeAccounts([...accounts, next]);
      persist({ phone, business, owner });
      return null;
    },
    [persist],
  );

  const findAccount = useCallback(async (phone: string) => {
    await wait();
    const match = readAccounts().find((a) => a.phone === phone);
    if (!match) return { ok: false, error: "No account found for this mobile number" };
    return { ok: true, owner: match.owner };
  }, []);

  const resetPassword = useCallback(async (phone: string, password: string) => {
    await wait();
    const accounts = readAccounts();
    const idx = accounts.findIndex((a) => a.phone === phone);
    if (idx === -1) return "No account found for this mobile number";
    accounts[idx] = { ...accounts[idx], password };
    writeAccounts(accounts);
    return null;
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ ready, session, signIn, signUp, findAccount, resetPassword, logout }),
    [ready, session, signIn, signUp, findAccount, resetPassword, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
