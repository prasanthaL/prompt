import { permanentRedirect } from "next/navigation";

export default function JackpotRedirectPage() {
  permanentRedirect("/discover");
}
