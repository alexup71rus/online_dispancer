export const getPatientId = () => {
  const url = new URL(window.location.href);

  return url.searchParams.get('patientId') ?? 1;
}
