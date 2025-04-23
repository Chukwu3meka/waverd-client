interface FormData {
  info: string;
  value: string;
  valid: boolean;
  mandatory: boolean;
}

interface CustomerUsForm {
  name: FormData;
  contact: FormData;
  comment: FormData;
  options: CustomerUsOptions;
}

interface CustomerUsOptions {
  loading: boolean;
  category: string;
  contact: "email" | "whatsapp";
}

interface ContactUsPayload {
  name: CustomerUsForm["name"]["value"];
  contact: CustomerUsForm["contact"]["value"];
  comment: CustomerUsForm["comment"]["value"];
  category: CustomerUsForm["options"]["category"];
  preference: CustomerUsForm["options"]["contact"];
}
