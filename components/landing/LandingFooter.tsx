import { Social } from "@/components";

export default function LandingFooter() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <Social
          hrefs={[
            "https://discord.com",
            "https://github.com/username",
            "https://linkedin.com/in/username",
          ]}
          className="h-12 w-12"
          rotate
        />
      </div>
      <div className="text-sm text-white">
        © {new Date().getFullYear()} Jeremie Pouliot
      </div>
    </div>
  );
}
