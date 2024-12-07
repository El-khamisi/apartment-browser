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

export async function postApartment(apartment: unknown) {
  try {
    const response = await fetch(baseurl + "/apartments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apartment),
    });
    return response;
  } catch (err) {
    alert(err);
  }
}

export async function uploadImages(files: FileList | null) {
  if (!files) {
    return [];
  }
  const form = new FormData();
  Array.from(files).forEach((file) => form.append("files", file));

  try {
    const response = await fetch(baseurl + "/upload", {
      method: "POST",
      body: form,
    });
    return await response.json();
  } catch (err) {
    alert(err);
  }
}
