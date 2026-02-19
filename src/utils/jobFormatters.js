const statusStyles = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  DRAFT: "bg-amber-100 text-amber-700",
  CLOSED: "bg-slate-200 text-slate-700",
};

const formatStatus = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const formatSalary = (salaryAmount, salaryType) => {
  if (!salaryAmount || !salaryType) return null;

  const formattedAmount = new Intl.NumberFormat("en-IN").format(salaryAmount);

  if (salaryType === "LPA") {
    return `${formattedAmount} LPA`;
  } else if (salaryType === "MONTHLY") {
    return `${formattedAmount}/month`;
  }

  return null;
};

export { formatDate, formatStatus, statusStyles, formatSalary };
