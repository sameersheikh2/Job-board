const today = new Date().toISOString().split("T")[0];

export const recruiterJobFieldGroups = [
  {
    columns: "sm:grid-cols-3",
    fields: [
      {
        id: "title",
        label: "Job title",
        placeholder: "Senior Frontend Engineer",
        maxLength: 80,
        minLength: 2,
        required: true,
      },
      {
        id: "company",
        label: "Company",
        placeholder: "Dev Hub IO",
        maxLength: 80,
        minLength: 2,
        required: true,
      },
      {
        id: "team",
        label: "Team or department",
        placeholder: "Product Engineering",
        maxLength: 60,
      },
    ],
  },
  {
    columns: "sm:grid-cols-3",
    fields: [
      {
        id: "employment",
        label: "Employment type",
        type: "select",
        placeholder: "Select type",
        required: true,
        options: [
          { value: "full-time", label: "Full-time" },
          { value: "part-time", label: "Part-time" },
          { value: "contract", label: "Contract" },
          { value: "internship", label: "Internship" },
        ],
      },
      {
        id: "experience",
        label: "Experience level",
        type: "select",
        placeholder: "Select level",
        required: true,
        options: [
          { value: "fresher", label: "Fresher / Entry" },
          { value: "junior", label: "Junior" },
          { value: "mid", label: "Mid-level" },
          { value: "senior", label: "Senior" },
          { value: "lead", label: "Lead" },
        ],
      },
      {
        id: "openings",
        label: "Openings",
        type: "number",
        min: 1,
        max: 100,
        step: 1,
        placeholder: "2",
        required: true,
      },
    ],
  },
  {
    columns: "sm:grid-cols-2",
    fields: [
      {
        id: "locationType",
        label: "Location type",
        type: "select",
        placeholder: "Select type",
        required: true,
        options: [
          { value: "remote", label: "Remote" },
          { value: "hybrid", label: "Hybrid" },
          { value: "onsite", label: "Onsite" },
        ],
      },
      {
        id: "location",
        label: "Primary location",
        placeholder: "Bengaluru, IN",
        maxLength: 60,
        required: true,
      },
    ],
  },
  {
    columns: "sm:grid-cols-2",
    fields: [
      {
        id: "salaryType",
        label: "Salary Type",
        type: "select",
        placeholder: "Select salary type",
        options: [
          { value: "LPA", label: "LPA (Lakhs Per Annum)" },
          { value: "MONTHLY", label: "Monthly Salary" },
        ],
      },
      {
        id: "salaryAmount",
        label: "Salary Amount",
        type: "number",
        min: 100000,
        max: 10000000,
        step: 10000,
        placeholder: "Enter salary amount",
      },
    ],
  },
  {
    columns: "sm:grid-cols-2",
    fields: [
      {
        id: "deadline",
        label: "Application deadline",
        type: "date",
        required: true,
        min: today,
      },
      {
        id: "skills",
        label: "Key skills",
        placeholder: "React, TypeScript, GraphQL",
        maxLength: 80,
        minLength: 2,
        required: true,
      },
    ],
  },
  {
    columns: "sm:grid-cols-1",
    fields: [
      {
        id: "hiring",
        label: "Hiring manager",
        placeholder: "Aisha Khan",
        maxLength: 60,
      },
    ],
  },
  {
    columns: "sm:grid-cols-1",
    fields: [
      {
        id: "description",
        label: "Job description",
        type: "textarea",
        placeholder: "Share the mission, impact, and what success looks like.",
        required: true,
        maxLength: 600,
        minLength: 30,
        rows: 4,
      },
    ],
  },
];
