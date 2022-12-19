// wishlistadd
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let terbeli = JSON.parse(localStorage.getItem("terbeli")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let { username } = users;
// get data
let getdata = wishlist.map((x, i) => {
  return x.ditabung;
});
let total = getdata.reduce((x, y) => x + y, 0);
// innerUser
if (username) {
  nama.innerHTML = username;
} else {
  nama.innerHTML = `login`;
}
// showTabungan
let showTabungan = () => {
  totaltabungan.innerHTML = `Rp. ${total.toLocaleString("id-ID")}`;
  buttoneye.innerHTML =
    '<i onclick="hideTabungan()" class="bi bi-eye-slash"></i>';
};
// hide
let hideTabungan = () => {
  totaltabungan.innerHTML = "Rp. ....";
  buttoneye.innerHTML = '<i onclick="showTabungan()" class="bi bi-eye"></i>';
};

document.getElementById("totalwishlist").innerHTML = `${wishlist.length}/4`;
document.getElementById("totalterbeli").innerHTML = `${terbeli.length}/2`;

let handleSubmit = () => {
  // getValue
  let username = document.getElementById("username").value;
  let reusername = document.getElementById("password").value;
  if (username == "") {
    return (document.getElementById("notes").innerHTML =
      "Isi data terlebih dahulu");
  } else if (username !== reusername) {
    return (document.getElementById("notes").innerHTML =
      "Pastikan username dan reusername sama ");
  }
  if (username === reusername) {
    let dataUser = { username };
    // setTolocalStorage
    localStorage.setItem("users", JSON.stringify(dataUser));
    // setinput null
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    location.reload();
  }
};
let modall = () => {
  document.getElementById("modals").classList.remove("hidden");
};
let closemodal = () => {
  document.getElementById("modals").classList.add("hidden");
};
