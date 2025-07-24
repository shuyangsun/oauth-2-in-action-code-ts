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
    <>
      <IconTitle {...{ entity, active }} />
      <div
        className={`
        absolute -bottom-2 rounded-full transition-all duration-300
        w-2.5 h-1 ${online ? 'bg-green-500' : 'bg-red-500'}
        ${online ? 'left-1/2 -translate-x-1/2' : 'left-[19px]'}
      `}
      />
    </>
  );
};
