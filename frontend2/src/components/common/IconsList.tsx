import type { ReactNode } from 'react';

export type IconListItem = {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
};

type Props = {
  items: IconListItem[];
  orientation?: 'horizontal' | 'vertical';
};

/** Row of icon + label + value blocks (organizer / date / duration on events), horizontal on
 *  the show page header, vertical in the sidebar join card. */
const IconsList = ({ items, orientation = 'horizontal' }: Props) => {
  const visible = items.filter(item => item.value !== undefined && item.value !== null && item.value !== '');
  if (visible.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: orientation === 'vertical' ? 12 : 24
      }}
    >
      {visible.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {item.icon && <span style={{ fontSize: '1.5rem', lineHeight: '1.5rem', marginTop: 2 }}>{item.icon}</span>}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
            <div style={{ fontSize: 14 }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconsList;
