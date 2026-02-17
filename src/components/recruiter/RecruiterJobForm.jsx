import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button.jsx";
import { Spinner } from "../../../components/ui/spinner";
import {
  FormField,
  FormInput,
  FormTextarea,
} from "../../../components/ui/form-field.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { createJob, updateJob } from "../../features/jobSlice/jobSlice.jsx";
import { recruiterJobFieldGroups } from "../../utils/recruiterJobFields.js";
import { showError, showSuccess } from "../../utils/toast.js";
const initialFormState = recruiterJobFieldGroups.reduce((acc, group) => {
  group.fields.forEach((field) => {
    acc[field.id] = "";
  });
  return acc;
}, {});

const RecruiterJobForm = ({ job = null, onSuccess, onCancel }) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const dispatch = useDispatch();
  const { createStatus, updateStatus } = useSelector(
    (state) => state.job || {},
  );
  const isLoading = createStatus === "loading" || updateStatus === "loading";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!job) return;
    const mapped = { ...initialFormState };
    const allowedFields = recruiterJobFieldGroups.flatMap((g) =>
      g.fields.map((f) => f.id),
    );
    allowedFields.forEach((key) => {
      const val = job[key];
      if (val === undefined || val === null) return;
      if (key === "deadline") {
        // ensure date input gets YYYY-MM-DD
        const date =
          typeof val === "string"
            ? val.split("T")[0]
            : new Date(val).toISOString().split("T")[0];
        mapped[key] = date;
        return;
      }
      if (Array.isArray(val)) {
        mapped[key] = val.join(", ");
        return;
      }
      mapped[key] = String(val);
    });
    setFormValues(mapped);
  }, [job]);

  const handleSelectChange = (fieldId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    try {
      // build payload only from allowed fields and skip empty strings
      const allowedFields = recruiterJobFieldGroups.flatMap((g) =>
        g.fields.map((f) => f.id),
      );
      const payload = {};
      allowedFields.forEach((id) => {
        const raw = formValues[id];
        if (raw === undefined || raw === null) return;
        const trimmed = typeof raw === "string" ? raw.trim() : raw;
        if (trimmed === "") return;
        if (id === "openings") {
          payload[id] = Number(trimmed);
        } else if (id === "deadline") {
          payload[id] = trimmed; // ISO date string YYYY-MM-DD
        } else {
          payload[id] = trimmed;
        }
      });

      if (job && (job._id || job.id)) {
        const jobId = job._id || job.id;
        const response = await dispatch(
          updateJob({ jobId, updates: payload }),
        ).unwrap();
        showSuccess(response?.message || "Job updated");
        setFormValues(initialFormState);
        onSuccess?.();
      } else {
        const response = await dispatch(createJob(payload)).unwrap();
        showSuccess(response?.message || "Job published");
        setFormValues(initialFormState);
        onSuccess?.();
      }
    } catch (error) {
      showError(error || "Failed to publish job. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-[#e6dccd] bg-white/90 p-6 shadow-xl sm:p-8"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Create a new role
        </h2>
        <p className="text-sm text-slate-600">
          Outline the essentials so candidates know what to expect.
        </p>
        <p className="text-xs text-slate-500">Fields marked * are required.</p>
      </div>

      {recruiterJobFieldGroups.map((group) => (
        <div key={group.fields[0].id} className={`grid gap-4 ${group.columns}`}>
          {group.fields.map((field) => (
            <FormField
              key={field.id}
              label={field.label}
              htmlFor={field.id}
              required={field.required}
            >
              {field.type === "select" ? (
                <Select
                  value={formValues[field.id]}
                  onValueChange={(value) => handleSelectChange(field.id, value)}
                  name={field.id}
                  required={field.required}
                >
                  <SelectTrigger id={field.id}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <FormTextarea
                  id={field.id}
                  name={field.id}
                  rows={field.rows}
                  value={formValues[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  required={field.required}
                />
              ) : (
                <FormInput
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  value={formValues[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  required={field.required}
                  trim="true"
                />
              )}
            </FormField>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          We’ll confirm once the job is published.
        </p>
        <div className="flex items-center gap-3">
          {job && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFormValues(initialFormState);
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer rounded-full bg-[#0f172a] px-6 text-white hover:bg-[#0c1323] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="size-4 text-white" />
                {job ? "Updating job..." : "Publishing job..."}
              </span>
            ) : job ? (
              "Update job"
            ) : (
              "Publish job"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RecruiterJobForm;
