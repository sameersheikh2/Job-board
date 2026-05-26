const basePanel =
  "min-h-[40vh] w-full rounded-2xl border border-slate-200 bg-white/95 shadow-xs";

const AuthLayout = ({ sideContent, children }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div
          className="relative min-h-[40vh] w-full overflow-hidden rounded-2xl border border-slate-900 bg-slate-950 text-white shadow-xs"
        >
          <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
            {sideContent}
          </div>
        </div>

        <div className="min-h-[40vh] w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
