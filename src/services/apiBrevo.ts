import { capitalize } from "@/lib/utils";
import { Personne } from "@/types/personne";

export function sendEmail(
  subject: string,
  sender: Personne,
  recipient: Personne,
  message: string
) {
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const nameSender = capitalize(sender.prenom) + " " + capitalize(sender.nom);
  const nameRecipient =
    capitalize(recipient.prenom) + " " + capitalize(recipient.nom);
  fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": `${API_KEY}`,
    },
    body: JSON.stringify({
      subject: capitalize(subject),
      htmlContent: `<html><body><p>${message}</p></body></html>`,
      sender: { name: nameSender, email: sender.email },
      to: [{ email: recipient.email, name: nameRecipient }],
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Email sent successfully:", data))
    .catch((error) => {
      console.error("Error:", error);
    });
}
