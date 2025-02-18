// services/userPreferences.ts
export async function saveUserPreferences(theme: string, os: string) {
  // console.log("Sending preferences to the API:", { theme, os }); // Debugging log

  try {
    const res = await fetch("/api/savePreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode: theme, os }), // Make sure the keys match with the API route
    });

    if (!res.ok) {
      throw new Error(`Error saving preferences: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to save user preferences:", error);
  }
}
