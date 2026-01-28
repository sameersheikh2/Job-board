import {
  ArrowUpRight,
  Briefcase,
  ChartLine,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";

const stats = [
  { label: "Avg. time to shortlist", value: "4 days" },
  { label: "Qualified responses", value: "68%" },
  { label: "Offer acceptance", value: "82%" },
];

const workflow = [
  {
    title: "Launch a focused role",
    description:
      "Create a hiring brief with role expectations, stack, and compensation band.",
  },
  {
    title: "Review curated shortlists",
    description:
      "See vetted candidates ranked by match score and relevance to your stack.",
  },
  {
    title: "Move faster together",
    description:
      "Collaborate with your team, share notes, and convert to interviews in one click.",
  },
];

const featureCards = [
  {
    icon: CheckCircle2,
    title: "Pre-qualified talent",
    description:
      "Every profile includes work samples, verified skills, and availability signals.",
  },
  {
    icon: Users,
    title: "Pipeline visibility",
    description:
      "Track stages, assignments, and team feedback without a heavy ATS setup.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted screening",
    description:
      "Built-in technical screening and identity checks keep quality high.",
  },
];

const Recruiters = () => (
  <section className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
          For recruiters
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Hire exceptional engineers without the noisy pipeline.
        </h1>
        <p className="text-base text-slate-600 sm:text-lg">
          Dev Hub IO gives you a focused shortlist, real signals, and
          collaboration tools to close the right hire faster.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="cursor-pointer rounded-full border border-[#1f2933] bg-[#1f2933] text-white hover:bg-[#0c1323]"
          >
            <Link to="/signup">Post a role</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-full border-[#d6c7b0]"
          >
            <a href="mailto:hello@devhub.io">
              Request a demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      <div className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="rounded-full border border-[#e6dccd] bg-[#fbfaf8] p-2">
              <Briefcase className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Active role
              </p>
              <p className="text-base font-semibold text-slate-900">
                Senior Frontend Engineer
              </p>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Shortlist ready</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                12 candidates
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <ChartLine className="h-4 w-4" />
              Avg match score 86%
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <Users className="h-4 w-4" />3 reviewers assigned
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#e6dccd] bg-white px-6 py-5 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {featureCards.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-[#e6dccd] bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#e6dccd] bg-[#fbfaf8] p-2">
              <feature.icon className="h-5 w-5 text-slate-700" />
            </span>
            <p className="text-lg font-semibold text-slate-900">
              {feature.title}
            </p>
          </div>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            {feature.description}
          </p>
        </div>
      ))}
    </div>

    <div
      id="workflow"
      className="rounded-3xl border border-[#e6dccd] bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Workflow
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            A calmer hiring flow.
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          className="cursor-pointer rounded-full border-[#d6c7b0]"
        >
          <a href="#workflow">View workflow</a>
        </Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {workflow.map((step, index) => (
          <div
            key={step.title}
            className="space-y-3 rounded-2xl border border-[#efe6d8] bg-[#fbfaf8] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Step {index + 1}
            </p>
            <p className="text-lg font-semibold text-slate-900">{step.title}</p>
            <p className="text-sm text-slate-600 sm:text-base">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-3xl border border-[#1f2933] bg-[#1f2933] px-6 py-8 text-white sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Ready to hire
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Build a calmer hiring pipeline today.
          </h2>
          <p className="text-sm text-white/70 sm:text-base">
            Start with a single role and let the shortlist come to you.
          </p>
        </div>
        <Button
          asChild
          className="cursor-pointer rounded-full border border-white bg-white text-[#1f2933] hover:bg-white/90"
        >
          <Link to="/signup">Get started</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default Recruiters;
