import type { ValidationError } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitViewingRequest } from "@/hooks/useViewingRequests";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}

type FieldName = keyof FormState;

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  message: "",
};

/** Maps each backend validation variant to the field it belongs to. */
const ERROR_FIELD: Record<ValidationError, FieldName> = {
  nameRequired: "name",
  emailRequired: "email",
  emailInvalid: "email",
  phoneRequired: "phone",
  preferredDateRequired: "preferredDate",
  messageRequired: "message",
};

const ERROR_COPY: Record<ValidationError, string> = {
  nameRequired: "Please tell us your name.",
  emailRequired: "An email address is required.",
  emailInvalid: "That email address does not look right.",
  phoneRequired: "A contact number is required.",
  preferredDateRequired: "Please suggest a preferred date.",
  messageRequired: "A short note about your project is required.",
};

const FIELDS: Array<{
  name: FieldName;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}> = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Alexandra Whitfield",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@studio.com",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Telephone",
    type: "tel",
    placeholder: "+1 (441) 000 0000",
    autoComplete: "tel",
  },
  {
    name: "preferredDate",
    label: "Preferred Date",
    type: "date",
    placeholder: "",
  },
];

/** The open welcome sequence — a visit, not a gated process. */
const VISIT_STEPS = [
  {
    step: "01",
    title: "Come By or Write",
    body: "Stop in during studio hours, or send a note and we will reply personally.",
  },
  {
    step: "02",
    title: "Walk the Collection",
    body: "Take your time among the specimens, stone vessels, and limestone floors.",
  },
  {
    step: "03",
    title: "Talk It Through",
    body: "Tell us about the room, and we will help you find the piece that fits it.",
  },
];

/**
 * Get in Touch — the studio's open point of contact. Visitors can call, email,
 * or simply stop in during studio hours; the form is an optional, low-friction
 * way to plan a visit. Validates inline and confirms the note reached the studio.
 */
export function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitViewingRequest();

  const update = (field: FieldName, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mutation.isPending) return;

    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!form.name.trim()) nextErrors.name = ERROR_COPY.nameRequired;
    if (!form.email.trim()) nextErrors.email = ERROR_COPY.emailRequired;
    if (!form.phone.trim()) nextErrors.phone = ERROR_COPY.phoneRequired;
    if (!form.preferredDate.trim())
      nextErrors.preferredDate = ERROR_COPY.preferredDateRequired;
    if (!form.message.trim()) nextErrors.message = ERROR_COPY.messageRequired;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    mutation.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        preferredDate: form.preferredDate.trim(),
        message: form.message.trim(),
      },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "ok") {
            setForm(EMPTY_FORM);
            setSubmitted(true);
            return;
          }
          const fieldErrors: Partial<Record<FieldName, string>> = {};
          for (const variant of result.err) {
            fieldErrors[ERROR_FIELD[variant]] = ERROR_COPY[variant];
          }
          setErrors(fieldErrors);
        },
      },
    );
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-gradient-subtle">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow text-muted-foreground reveal">Get in Touch</p>
          <h1 className="lockup reveal mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
            Plan a Visit
          </h1>
          <p className="reveal mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground">
            The studio and gardens are open to visitors during studio hours — no
            booking needed. Call, write, or simply come by, and we will walk you
            through the collection at your own pace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div data-ocid="contact.form_panel">
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="border border-accent/40 bg-card p-10 shadow-subtle md:p-14"
              >
                <span className="flex size-12 items-center justify-center border border-accent text-accent">
                  <Check className="size-5" aria-hidden="true" />
                </span>
                <p className="eyebrow mt-8 text-accent">Note Received</p>
                <h2 className="lockup mt-5 text-2xl leading-tight md:text-3xl">
                  Thank You
                </h2>
                <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                  Your note has reached the studio and we will reply personally.
                  In the meantime, you are always welcome to stop in during
                  studio hours, or reach us directly at {BRAND.email}.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="contact.submit_another_button"
                  onClick={() => setSubmitted(false)}
                  className="tracked mt-10 h-11 rounded-none border-primary px-7 text-[0.7rem] text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Send Another Note
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                data-ocid="contact.form"
                className="border border-border bg-card p-8 shadow-subtle md:p-12"
              >
                <div className="grid gap-7 sm:grid-cols-2">
                  {FIELDS.map((field) => {
                    const error = errors[field.name];
                    const errorId = `contact-${field.name}-error`;
                    return (
                      <div
                        key={field.name}
                        className={cn(
                          "flex flex-col gap-3",
                          field.name === "preferredDate" && "sm:col-span-2",
                        )}
                      >
                        <Label
                          htmlFor={`contact-${field.name}`}
                          className="eyebrow text-muted-foreground"
                        >
                          {field.label}
                        </Label>
                        <Input
                          id={`contact-${field.name}`}
                          name={field.name}
                          type={field.type}
                          value={form[field.name]}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          aria-invalid={error ? true : undefined}
                          aria-describedby={error ? errorId : undefined}
                          onChange={(event) =>
                            update(field.name, event.target.value)
                          }
                          data-ocid={`contact.${field.name}_input`}
                          className="h-12 rounded-none border-input bg-background px-4 text-sm font-light shadow-none focus-visible:ring-1"
                        />
                        {error ? (
                          <p
                            id={errorId}
                            data-ocid={`contact.${field.name}_error`}
                            className="text-xs font-light text-destructive"
                          >
                            {error}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}

                  <div className="flex flex-col gap-3 sm:col-span-2">
                    <Label
                      htmlFor="contact-message"
                      className="eyebrow text-muted-foreground"
                    >
                      About Your Project
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      placeholder="Tell us about the space, the scale, and the feeling you are after."
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      onChange={(event) =>
                        update("message", event.target.value)
                      }
                      data-ocid="contact.message_textarea"
                      className="min-h-32 rounded-none border-input bg-background px-4 py-3 text-sm font-light shadow-none focus-visible:ring-1"
                    />
                    {errors.message ? (
                      <p
                        id="contact-message-error"
                        data-ocid="contact.message_error"
                        className="text-xs font-light text-destructive"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                {mutation.isError ? (
                  <p
                    data-ocid="contact.error_state"
                    className="mt-8 border border-destructive/40 bg-destructive/5 px-4 py-3 text-xs font-light text-destructive"
                  >
                    We could not send your note just now. Please try again, or
                    write to us directly at {BRAND.email}.
                  </p>
                ) : null}

                <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="eyebrow text-muted-foreground">
                    {BRAND.appointmentLine}
                  </p>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    data-ocid="contact.submit_button"
                    className="tracked h-12 rounded-none bg-primary px-9 text-[0.7rem] text-primary-foreground hover:bg-primary/90"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                        Sending
                      </>
                    ) : (
                      "Send Note"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside
            className="flex flex-col gap-10"
            data-ocid="contact.details_panel"
          >
            <div className="room-frame" data-ocid="contact.studio_image">
              <img
                src="/assets/generated/studio-interior.dim_1200x900.jpg"
                alt="The Stone & Leaf studio interior in Bermuda — specimen plants against a coral stone wall, navy ironwork, and limestone floors beneath ocean-facing glazing."
                loading="lazy"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>

            <div className="border-t border-border pt-8">
              <p className="eyebrow text-muted-foreground">Studio Hours</p>
              <p className="mt-6 text-sm font-light leading-relaxed text-foreground">
                {BRAND.studioHours}
              </p>
              <p className="mt-3 text-xs font-light leading-relaxed text-muted-foreground">
                No booking required — come by whenever the doors are open.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <p className="eyebrow text-muted-foreground">Reach Us Directly</p>
              <ul className="mt-6 space-y-4 text-sm font-light leading-relaxed text-foreground">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{BRAND.estateLine}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
                    data-ocid="contact.phone_link"
                    className="transition-smooth hover:text-accent"
                  >
                    {BRAND.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${BRAND.email}`}
                    data-ocid="contact.email_link"
                    className="transition-smooth hover:text-accent"
                  >
                    {BRAND.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <p className="eyebrow text-muted-foreground">How It Works</p>
              <ol className="mt-6 space-y-6">
                {VISIT_STEPS.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="eyebrow pt-1 text-accent">
                      {item.step}
                    </span>
                    <div>
                      <p className="tracked text-[0.7rem] text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="border-t border-border pt-8 text-xs font-light leading-relaxed text-muted-foreground">
              We keep the studio unhurried and open — there is always time to
              walk the collection and talk through the room you have in mind.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
