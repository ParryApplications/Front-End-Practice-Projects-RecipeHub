const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJson(url) {
  try {
    //Fetching Recipe based on it's Id:
    const res = await Promise.race([fetch(url), timeout(10)]);
    const data = await res.json(); //to read body from the response/body and that is also a promise

    if (!res.ok) throw new Error(`Error :: ${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function sendJSON(url, recipeData = undefined) {
  try {
    const fetchBody = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    //Fetching Recipe based on it's Id:
    const res = await Promise.race([fetchBody, timeout(10)]);
    const data = await res.json(); //to read body from the response/body and that is also a promise

    if (!res.ok) throw new Error(`Error :: ${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
}
