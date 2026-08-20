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
  /** Returns an error message, or null on success. */
  signIn: (phone: string, password: string) => string | null;
  /** Returns an error message, or null on success. */
  signUp: (input: SignupInput) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

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
    (phone: string, password: string) => {
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
    ({ phone, password, business, owner }: SignupInput) => {
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

  const logout = useCallback(() => {
    setSession(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ ready, session, signIn, signUp, logout }),
    [ready, session, signIn, signUp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
