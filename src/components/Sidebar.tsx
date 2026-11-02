import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { buildNav, profile, type NavNode } from '../content/site';
import { Icon } from './Icon';
import { EASE_OUT } from './motion';

const nav = buildNav();

function containsPath(node: NavNode, path: string): boolean {
  return node.to === path || (node.children ?? []).some((c) => containsPath(c, path));
}

function Pill() {
  return (
    <motion.span layoutId="nav-pill" className="pill" aria-hidden="true"
      transition={{ type: 'spring', stiffness: 520, damping: 40, mass: 0.9 }} />
  );
}

function TreeNode({ node, depth }: { node: NavNode; depth: number }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const cls = `row${depth > 0 ? ' depth-1' : ''}`;
  const lead = node.appIcon ? <span className="app-icon" /> : node.icon ? <Icon name={node.icon} /> : null;

  if (node.children) {
    const groupId = `grp-${node.id}`;
    const expanded = open || false;
    return (
      <li role="treeitem" aria-expanded={expanded}>
        <button type="button" className={cls} aria-expanded={expanded} aria-controls={groupId}
          onClick={() => setOpen((o) => !o)}>
          {lead}<span className="label">{node.label}</span><Icon name="chev" className="icon chev" />
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div id={groupId} className="grp" key="grp"
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE_OUT }}>
              <ul className="tree" role="group">
                {node.children.map((c) => <TreeNode key={c.id} node={c} depth={depth + 1} />)}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        {!expanded && containsPath(node, pathname) && <span className="sr-only">(contém a página atual)</span>}
      </li>
    );
  }

  if (node.href) {
    return (
      <li role="treeitem">
        <a className={cls} href={node.href} target="_blank" rel="noopener noreferrer">
          {lead}<span className="label">{node.label}</span><Icon name="ext" className="icon ext" />
        </a>
      </li>
    );
  }

  return (
    <li role="treeitem">
      <NavLink to={node.to!} end className={cls}>
        {({ isActive }) => (<>{isActive && <Pill />}{lead}<span className="label">{node.label}</span></>)}
      </NavLink>
    </li>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <nav className="sidebar card" id="sidebar" aria-label="Navegação" data-open={open || undefined}>
        <NavLink className="brand" to="/">
          <img className="avatar-sm" src={profile.avatar} alt="" width={38} height={38} />
          <div><div className="name">{profile.shortName}</div><div className="handle">{profile.domain}</div></div>
        </NavLink>

        <div className="tree-wrap">
          {nav.map((section, i) => (
            <div key={i}>
              {section.title && <span className="section-title eyebrow">{section.title}</span>}
              <ul className="tree" role="tree" aria-label={section.title ?? 'Páginas'}>
                {section.nodes.map((n) => <TreeNode key={n.id} node={n} depth={0} />)}
              </ul>
            </div>
          ))}
        </div>

        <div className="sidebar-foot">© {new Date().getFullYear()} {profile.name}</div>
      </nav>
    </>
  );
}
