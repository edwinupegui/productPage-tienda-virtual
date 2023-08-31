import clsx from 'clsx';
import { Colors } from '../types';



export interface Badge {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  color: Colors;
  dot: boolean;
  dotSize: 'sm' | 'md' | 'lg';
  visible: boolean;
}

const Badge = ({
  badgeContent,
  color = 'lipa',
  dot = false,
  dotSize = 'md',
  visible = true,
  children,
}: Partial<Badge>) =>
  visible ? (
    <div className="relative">
      {dot ? (
        <div
          className={clsx(
            'badge-dot',
            `badge-${color}`,
            `badge-dot-${dotSize}`
          )}
        ></div>
      ) : (
        <div className={clsx('badge', `badge-${color}`)}>{badgeContent}</div>
      )}
      {children}
    </div>
  ) : (
    <div>{children}</div>
  );

export default Badge;
