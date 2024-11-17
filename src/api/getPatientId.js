export const getPatientId = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('patientId');
  if(id) {
    localStorage.setItem('patientId', id);
  }

  return localStorage.getItem('patientId') ?? id ?? 1;
}
