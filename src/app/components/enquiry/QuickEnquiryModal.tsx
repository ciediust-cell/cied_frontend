import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { X, Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { submitPublicEnquiry } from "src/services/publicContact.service";

interface QuickEnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  subject: string;
  messagePlaceholder: string;
  submitLabel: string;
}

interface QuickEnquiryForm {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormState: QuickEnquiryForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export function QuickEnquiryModal({
  open,
  onOpenChange,
  title,
  description,
  subject,
  messagePlaceholder,
  submitLabel,
}: QuickEnquiryModalProps) {
  const [formData, setFormData] = useState<QuickEnquiryForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setFormData(initialFormState);
      setIsSubmitting(false);
      setFormStatus("idle");
      setStatusMessage("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setFormStatus("idle");
      setStatusMessage("");

      await submitPublicEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject,
        message: formData.message.trim(),
      });

      setFormStatus("success");
      setStatusMessage("Enquiry submitted successfully. We will contact you soon.");
      setFormData(initialFormState);
    } catch (error) {
      setFormStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={() => onOpenChange(false)}
      role="presentation"
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-start">
          <div>
            <h3 className="text-xl sm:text-2xl text-primary mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center"
            aria-label="Close enquiry form"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 h-11 border-2"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-11 border-2"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">
                  Phone Number{" "}
                  <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 h-11 border-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                <Textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="pl-10 border-2 resize-none"
                />
              </div>
            </div>

            {formStatus !== "idle" && (
              <div
                className={`p-3 rounded-lg text-sm text-center ${
                  formStatus === "success"
                    ? "bg-accent/10 border border-accent/30 text-accent"
                    : "bg-destructive/10 border border-destructive/30 text-destructive"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? "Submitting..." : submitLabel}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
