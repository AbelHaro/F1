const url = "https://ping-f1-web-page.onrender.com/";

function pingUrl() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      console.log("Ping successful to " + response.url);
    })
    .catch((error) => {
      console.error("Ping failed:", error);
    });
}

// Ping the URL every 60 seconds (60000 milliseconds)
setInterval(pingUrl, 60000);

// Initial ping when the script runs
export async function ping() {
  pingUrl();
}
