import { Link } from 'react-router-dom';
import leafLogo from '@/assets/leaf.png';
import rfsLogoSmall from '@/assets/RFS-Logo-small.png';
import { cn } from '@/lib/utils';

type HeaderBrandProps = {
  /** Default: /dashboard (post-login shell) */
  to?: string;
  className?: string;
  /** Applied to both logo images */
  imgClassName?: string;
};

/**
 * Matches scholarship_review_ui Header: leaf on small screens, RFS-Logo-small on lg+.
 */
export function HeaderBrand({ to = '/dashboard', className, imgClassName }: HeaderBrandProps) {
  return (
    <div className={cn('flex shrink-0 items-center', className)}>
      <Link
        to={to}
        className="shrink-0 lg:hidden"
        aria-label="Reliance Foundation Scholarships"
      >
        <img src={leafLogo} alt="" className={cn('h-8 w-auto max-h-10 object-contain', imgClassName)} />
      </Link>
      <Link
        to={to}
        className="hidden shrink-0 lg:block"
        aria-label="Reliance Foundation Scholarships"
      >
        <img src={rfsLogoSmall} alt="" className={cn('h-9 w-auto max-h-10 sm:h-10 object-contain', imgClassName)} />
      </Link>
    </div>
  );
}
