import { cn } from '@/lib/utils';

export default function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>;
}
