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
