document.getElementById("scamForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const type = document.getElementById("type").value;
    const value = document.getElementById("value").value;

    const response = await fetch("http://localhost:3000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value }),
    });

    const data = await response.json();
    document.getElementById("result").textContent = data.message;
});
