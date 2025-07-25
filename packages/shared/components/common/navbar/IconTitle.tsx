import type { FC } from 'hono/jsx';
import { getOAuthEntityName, OAuthEntity } from '../oauth-entities';

const Browser = ({
  size = 22,
  fill = 'none',
  strokeWidth = 2,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const Lock = ({
  size = 22,
  fill = 'none',
  strokeWidth = 2,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Database = ({
  size = 22,
  fill = 'none',
  strokeWidth = 2,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

interface Props {
  entity: OAuthEntity;
  active: boolean;
}

export const IconTitle: FC<Props> = ({ entity, active }: Props) => {
  let Icon = Browser;
  switch (entity) {
    case 'client':
      Icon = Browser;
      break;
    case 'auth_server':
      Icon = Lock;
      break;
    case 'protected_resource':
      Icon = Database;
      break;
  }
  return (
    <>
      <Icon
        size={22}
        fill="none"
        strokeWidth={active ? 2 : 1}
        className="transition-all duration-300"
      />
      <span
        className={`
          font-medium transition-all duration-300
          ${active ? 'opacity-100 w-auto px-2' : 'opacity-0 w-0 overflow-hidden'}
        `}
      >
        {getOAuthEntityName(entity)}
      </span>
    </>
  );
};
