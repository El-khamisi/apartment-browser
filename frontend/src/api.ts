const baseurl = "http://localhost:3000";

export async function listApartment() {
  try {
    const response = await fetch(baseurl + "/apartments");
    return await response.json();
  } catch (err) {
    alert(err);
  }
}

export async function getApartment(apartmentId: string) {
  try {
    const response = await fetch(baseurl + "/apartments/" + apartmentId);
    return await response.json();
  } catch (err) {
    alert(err);
  }
}
