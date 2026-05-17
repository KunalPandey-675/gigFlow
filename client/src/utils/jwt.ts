export function base64UrlDecode(input: string) {
  // Replace URL-safe chars and add padding
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = input.length % 4;
  if (pad === 2) input += "==";
  if (pad === 3) input += "=";
  if (pad === 1) throw new Error("Invalid base64 string");
  try {
    return decodeURIComponent(
      atob(input)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch (e) {
    return atob(input);
  }
}

export function getTokenExpiryMs(token: string): number {
  if (!token) return 0;
  const parts = token.split(".");
  if (parts.length < 2) return 0;
  const payload = parts[1] ?? "";
  const json = base64UrlDecode(payload);
  const obj = JSON.parse(json as string);
  if (!obj?.exp) return 0;
  const expMs = obj.exp * 1000;
  return Math.max(0, expMs - Date.now());
}

export function getTokenExpiryDate(token: string): Date | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1] ?? "";
  try {
    const json = base64UrlDecode(payload);
    const obj = JSON.parse(json as string);
    if (!obj?.exp) return null;
    return new Date(obj.exp * 1000);
  } catch (e) {
    return null;
  }
}
