import { useState } from "react";
import { api } from "../lib/api";

const initialForm = { name: "", email: "", phone: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await api.post("/contact", form);
      setForm(initialForm);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message || "Unable to send your message.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf4e4] px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
        <h1 className="mb-2 text-3xl font-bold text-[#23293a]">Contact Us</h1>
        <p className="mb-8 text-gray-600">Tell us how we can help with your tuition needs.</p>

        {status === "success" ? (
          <div className="rounded-lg bg-green-50 p-6 text-green-800">
            Your message has been sent successfully. Our team will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              ["name", "Name", "text", true],
              ["email", "Email", "email", true],
              ["phone", "Phone", "tel", false],
            ].map(([name, label, type, required]) => (
              <label key={name} className="block text-sm font-semibold text-gray-700">
                {label}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  required={required}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 font-normal focus:border-[#cfac33] focus:outline-none"
                />
              </label>
            ))}
            <label className="block text-sm font-semibold text-gray-700">
              Message
              <textarea
                name="message"
                value={form.message}
                required
                rows="5"
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 font-normal focus:border-[#cfac33] focus:outline-none"
              />
            </label>
            {status === "error" && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-[#cfac33] py-3 font-semibold text-white transition hover:bg-[#b69729] disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
export default Contact;
