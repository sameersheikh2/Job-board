import { Star, MapPin } from "lucide-react";

const testimonials = [
  {
    userName: "Ananya Rao",
    userRole: "Frontend Developer",
    companyName: "Lumina Labs",
    quote:
      "I applied to three curated roles and got two interviews within a week. The signal-based feed feels like Wellfound but simpler.",
    rating: 5,
    location: "Remote · India",
    avatarInitials: "AR",
  },
  {
    userName: "Jordan Lee",
    userRole: "Recruiter",
    companyName: "Northwind",
    quote:
      "Posting is fast, and the applicant profiles are clean. I can shortlist in minutes instead of hours.",
    rating: 5,
    location: "Hybrid · NYC",
    avatarInitials: "JL",
  },
  {
    userName: "Sara Kim",
    userRole: "Product Designer",
    companyName: "Echo",
    quote:
      "The experience feels premium—great UI, no noise, and I can track my applications without spreadsheets.",
    rating: 4,
    location: "Remote · SF",
    avatarInitials: "SK",
  },
];

const RatingBadge = ({ value }) => (
  <div className="flex items-center gap-1 rounded-md border border-amber-200/80 bg-amber-50/60 px-2 py-0.5 text-xs font-bold text-amber-700">
    <span>{value.toFixed(1)}</span>
    <Star size={11} className="fill-amber-400 stroke-amber-500" />
  </div>
);

const TestimonialsSection = () => (
  <section className="bg-linear-to-b from-white via-slate-50/50 to-white py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            What our users say
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Proof from both sides of the marketplace
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.userName}
            className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.userName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.userRole} · {item.companyName}
                    </div>
                  </div>
                </div>
                <RatingBadge value={item.rating} />
              </div>
              <p className="text-sm text-slate-650 leading-relaxed">"{item.quote}"</p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500 border-t border-slate-100 pt-3">
              <MapPin size={13} className="text-slate-400" />
              <span>{item.location}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

