import type { FC } from 'hono/jsx';
import { getOAuthEntityURI, OAuthEntity } from '../oauth-entities';
import { IconTitle } from './IconTitle';

interface Props {
  entity: OAuthEntity;
  active: boolean;
}

export const IconTitleWithStatus: FC<Props> = ({ entity, active }: Props) => {
  const ping = `${getOAuthEntityURI(entity)}/ping`;
  // TODO: ping endpoint to get online status.
  const online = ping.length % 2 === 0;

  return (
    <div className="relative flex items-center">
      <IconTitle {...{ entity, active }} />
      <div
        className={`
        absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300
        w-1.5 h-1.5 ${online ? 'bg-green-500' : 'bg-red-500'}
      `}
      />
    </div>
  );
};
