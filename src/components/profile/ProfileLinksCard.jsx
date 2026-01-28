import { Link2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.jsx";

const ProfileLinksCard = ({ profile }) => {
  const links = [
    { label: "Portfolio", value: profile.links?.portfolio },
    { label: "LinkedIn", value: profile.links?.linkedin },
    { label: "Resume", value: profile.resumeUrl },
  ];

  return (
    <Card className="border-[#e6dccd]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Link2 className="h-5 w-5 sm:h-6 sm:w-6" />
          Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {links.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              {item.label}
            </p>
            {item.value ? (
              <a
                href={item.value}
                className="mt-1 inline-flex font-medium text-slate-800 hover:text-slate-900 hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-1 text-slate-500">Not added</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfileLinksCard;
