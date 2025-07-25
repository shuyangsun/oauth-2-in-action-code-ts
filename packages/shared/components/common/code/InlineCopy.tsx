import { FC } from 'hono/jsx';

interface Props {
  value: string | undefined;
}

export const InlineCopy: FC<Props> = ({ value }: Props) => {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm text-gray-800 dark:text-gray-${value ? '200' : '400'} group`}
    >
      <div className="select-all px-3 py-1 cursor-text">
        <span className="select-all">{value ?? 'NONE'}</span>
      </div>
    </span>
  );
};
