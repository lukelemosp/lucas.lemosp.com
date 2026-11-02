import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

type ToastMsg = { title: string; detail: string; icon: IconName };
const ToastCtx = createContext<(t: ToastMsg) => void>(() => {});

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<ToastMsg | null>(null);
  const [show, setShow] = useState(false);
  const timer = useRef<number>();

  const push = useCallback((t: ToastMsg) => {
    setMsg(t);
    setShow(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(false), 3200);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className={`toast${show ? ' show' : ''}`} role="status" aria-live="polite">
        {msg && (
          <>
            <span className="ti"><Icon name={msg.icon} /></span>
            <div><div className="t1">{msg.title}</div><div className="t2">{msg.detail}</div></div>
          </>
        )}
      </div>
    </ToastCtx.Provider>
  );
}
