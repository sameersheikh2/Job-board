import { motion } from "motion/react";
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

const Rating = ({ value }) => (
  <div className="flex items-center gap-1 text-amber-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < value ? "fill-amber-400 stroke-amber-500" : "stroke-amber-300"
        }
      />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="bg-linear-to-b from-white via-[#f9f6ef] to-white py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            What our users say
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Proof from both sides of the marketplace
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.article
            key={item.userName}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#d8cab8] bg-white/90 p-5 shadow-sm backdrop-blur"
            {...fadeUp(idx * 0.05)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-white">
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
                <Rating value={item.rating} />
              </div>
              <p className="text-sm text-slate-700">{item.quote}</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
