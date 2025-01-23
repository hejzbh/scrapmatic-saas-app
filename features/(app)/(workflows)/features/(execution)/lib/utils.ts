export function calculateDuration(startedAt: string, completedAt: string) {
  const startDate: any = new Date(startedAt);
  const endDate: any = new Date(completedAt);

  // Razlika u milisekundama
  let duration = endDate - startDate;

  if (duration < 0) {
    return "Invalid duration";
  }

  // Konvertovanje u različite jedinice
  const ms = duration % 1000;
  const seconds = Math.floor(duration / 1000) % 60;
  const minutes = Math.floor(duration / (1000 * 60)) % 60;
  const hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let result = [];

  // Dodavanje dana, ako postoje
  if (days > 0) {
    result.push(`${days}d`);
  }

  // Dodavanje sati, ako postoje
  if (hours > 0) {
    result.push(`${hours}h`);
  }

  // Dodavanje minuta, ako postoje
  if (minutes > 0) {
    result.push(`${minutes}m`);
  }

  // Dodavanje sekundi, ako postoje
  if (seconds > 1) {
    result.push(`${seconds + ms / 1000}s`);
  }

  // Ako trajanje traje manje od sekunde, dodajemo milisekunde
  if (seconds === 0 && ms > 0) {
    result.push(`${ms}ms`);
  }

  return result.join(" ");
}
