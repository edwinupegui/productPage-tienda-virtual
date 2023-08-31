export interface Backdrop {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  children: React.ReactNode;
}

const Backdrop = ({ open, content, children }: Partial<Backdrop>) => (
  <div className="relative h-full">
    {children}
    {open && (
      <div className="absolute inset-0 z-40 max-h-full w-full">
        <div className="h-full rounded bg-gray-300 bg-opacity-50 transition-opacity">
          <div className="flex h-full items-center justify-center text-center">
            {content}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Backdrop;
