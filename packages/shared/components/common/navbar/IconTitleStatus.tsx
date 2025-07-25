import type { FC } from 'hono/jsx';
import { OAuthEntity } from '../oauth-entities';
import { IconTitle } from './IconTitle';

interface Props {
  entity: OAuthEntity;
  active: boolean;
  online: boolean;
}

export const IconTitleWithStatus: FC<Props> = ({
  entity,
  active,
  online,
}: Props) => {
  return (
    <div className="relative flex items-center" data-entity={entity}>
      <IconTitle {...{ entity, active }} />
      <div
        className={`status-indicator absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 w-1.5 h-1.5 ${online ? 'bg-green-500' : 'bg-red-500'}`}
      />
    </div>
  );
};
