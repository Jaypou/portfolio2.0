// services/userPreferences.ts
export const saveUserPreferences = async (mode: string, uiMode: string) => {
  try {
    const response = await fetch("/api/savePreferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode, uiMode }),
    });

    if (!response.ok) {
      throw new Error("Failed to save preferences");
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving preferences:", error);
    return { success: false };
  }
};
