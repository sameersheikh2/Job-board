import { useState } from "react";
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
import { createJob } from "../../features/jobSlice/jobSlice.jsx";
import { recruiterJobFieldGroups } from "../../utils/recruiterJobFields.js";
import { showError, showSuccess } from "../../utils/toast.js";
const initialFormState = recruiterJobFieldGroups.reduce((acc, group) => {
  group.fields.forEach((field) => {
    acc[field.id] = "";
  });
  return acc;
}, {});

const RecruiterJobForm = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.job?.createStatus);
  const isLoading = status === "loading";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      const payload = {
        ...formValues,
        openings: formValues.openings ? Number(formValues.openings) : undefined,
        description: formValues.description.trim(),
      };
      const response = await dispatch(createJob(payload)).unwrap();
      showSuccess(response?.message || "Job published");
      setFormValues(initialFormState);
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
                  trim={true}
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
        <Button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-full bg-[#0f172a] px-6 text-white hover:bg-[#0c1323] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Publishing job...
            </span>
          ) : (
            "Publish job"
          )}
        </Button>
      </div>
    </form>
  );
};

export default RecruiterJobForm;
