const year = new Date().getFullYear();
const lastModified = document.lastModified;
document.getElementById("currentyear").textContent = year;
document.getElementById("lastModified").textContent = lastModified;