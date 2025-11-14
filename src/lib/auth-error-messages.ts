const credentialsErrorMessages: Record<string, string> = {
  credentials: "Invalid email or password. Try again.",
  missing_fields: "Enter both your email and password to continue.",
  server_error: "We couldn't sign you in right now. Please try again later.",
};

type CredentialsErrorParams = {
  error?: string | null;
  code?: string | null;
};

export function getCredentialsSigninMessage({
  error,
  code,
}: CredentialsErrorParams): string | null {
  if (error !== "CredentialsSignin") {
    return null;
  }

  if (code) {
    const normalizedCode = code.toLowerCase();
    if (credentialsErrorMessages[normalizedCode]) {
      return credentialsErrorMessages[normalizedCode];
    }
  }

  return credentialsErrorMessages.credentials;
}

export function getDefaultCredentialsErrorMessage() {
  return credentialsErrorMessages.credentials;
}
