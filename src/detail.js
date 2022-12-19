// wishlistadd
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let terbeli = JSON.parse(localStorage.getItem("terbeli")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
let detail = JSON.parse(localStorage.getItem("detail")) || [];
// get id
let details = document.getElementById("details")
// initialize
let { category,name,deskripsi, harga  ,color, ditabung}  = detail;
let persen = (ditabung / harga) * 100;
let kurang = harga - ditabung
let warna = "";
let bg = ""
if (color === "green") {
  warna = "bggreen";
  bg = "rilgreen";
} else if (color === "orange") {
  warna = "bgorange";
  bg = "rilorange"
} else {
  warna = "bgblue";
  bg = "rilblue"
}
// back
let back = () => {
    localStorage.removeItem("detail")
    window.location.href = "index.html"
}

// checked
let ternari = false
let seratuspil = () => {
  document.getElementById("seratuspil").classList.add("bggreen");
  document.getElementById("limapuluhpil").classList.remove("bggreen");
  document.getElementById("duapuluhpil").classList.remove("bggreen");
  document.getElementById("sepuluhpil").classList.remove("bggreen")
  document.getElementById("lainya").classList.remove("bggreen")
    document.getElementById("nabung").value = ""
  ternari = false
}
let limapuluhpil = () => {
  document.getElementById("limapuluhpil").classList.add("bggreen");
  document.getElementById("seratuspil").classList.remove("bggreen");
  document.getElementById("duapuluhpil").classList.remove("bggreen");
  document.getElementById("sepuluhpil").classList.remove("bggreen");
  document.getElementById("lainya").classList.remove("bggreen")
    document.getElementById("nabung").value = ""
  ternari = false
}
let duapuluhpil = () => {
  document.getElementById("duapuluhpil").classList.add("bggreen");
  document.getElementById("seratuspil").classList.remove("bggreen");
  document.getElementById("limapuluhpil").classList.remove("bggreen");
  document.getElementById("sepuluhpil").classList.remove("bggreen");
  document.getElementById("lainya").classList.remove("bggreen")
    document.getElementById("nabung").value = ""
  ternari = false
}
let sepuluhpil = () => {
  document.getElementById("sepuluhpil").classList.add("bggreen");
  document.getElementById("seratuspil").classList.remove("bggreen");
  document.getElementById("limapuluhpil").classList.remove("bggreen");
  document.getElementById("duapuluhpil").classList.remove("bggreen")
  document.getElementById("lainya").classList.remove("bggreen")
  document.getElementById("nabung").value = ""
  ternari = false
}
let lainya = () => {
  document.getElementById("lainya").classList.add("bggreen");
  document.getElementById("seratuspil").classList.remove("bggreen");
  document.getElementById("limapuluhpil").classList.remove("bggreen");
  document.getElementById("duapuluhpil").classList.remove("bggreen");
  document.getElementById("sepuluhpil").classList.remove("bggreen");
  ternari = true
}

// inner
details.innerHTML = `
<div class="flex justify-between items-center ">
<p class="text-white">${name}</p>
<p class="${warna} px-1 rounded-full
    text-[10px]">${category}</p>
</div>
<p class="text-xs mt-1 ">${deskripsi}</p>
<div class="text-xs mt-2 flex justify-between items-center">
<p>Harga</p>
<p>Rp. ${harga.toLocaleString("id-ID")}</p>
</div>
<div class="text-xs mt-2 flex justify-between items-center">
<p>Ditabung</p>
<p>Rp. ${ditabung.toLocaleString("id-ID")} </p>
</div>
<div class="text-xs mt-2 flex justify-between items-center">
<p>Kurang</p>
<p>Rp. ${kurang.toLocaleString("id-ID")} </p>
</div>
<div class="w-full bg-white h-1 mt-3 rounded-full">
<div class="${bg} w-[${Math.round(persen)}%] h-full rounded-full transition-all duration-300">
</div>
</div>
<div class="text-[10px] mt-2 flex justify-between items-center">
<p>Progress</[p]> 
<p>${Math.round(persen)}%</p>
</div>

`
// getvalue

const check = (e) => {
  e.preventDefault()
  let p = wishlist.find((x)=> x.name === detail.name)
  const form = new FormData(e.target);
  const name = form.get("diisi");
  const category = form.get("isian");
  let tambahan = 123
  if(ternari == true){
    if(name == ""){
      return console.log("datagabolehkosong")
    }
    tambahan = parseInt(name)
    p.ditabung += parseInt(name)
    if(p.ditabung >= p.harga){
      document.getElementById("modal").classList.add("block")
      return document.getElementById("modal").classList.remove("hidden")
    }
    const datas = {ditabung: tambahan, bg: "bggreen"}
    history.push(datas)
    localStorage.setItem("history", JSON.stringify(history))
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    localStorage.removeItem("detail")
    return window.location.href = "index.html"
  }else{
  if(category == null){
    return console.log("datagabolehkosong")
  }
  tambahan = parseInt(category)
   p.ditabung += parseInt(category)
}
  const datas = {ditabung: tambahan, bg: "bggreen"}
  console.log(p)
  if(p.ditabung >= p.harga){
    document.getElementById("modal").classList.add("block")
    return document.getElementById("modal").classList.remove("hidden")
  }
  history.push(datas)
  localStorage.setItem("history", JSON.stringify(history))
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  localStorage.removeItem("detail")
  window.location.href = "index.html"
  return false;
}

let iyaNext = () => {
  if(terbeli.length >= 2){
    return document.getElementById("modal").innerHTML = "Kamu harus premium untuk menambah lagi"
  }
  let p = wishlist.find((x)=> x.name === detail.name)
  let q = wishlist.filter((x)=> x.name !== detail.name)
  p.ditabung = p.harga
  terbeli.push(p)
  let datas = {ditabung: p.harga, bg: "bgorange"}
  history.push(datas)
  localStorage.setItem("history", JSON.stringify(history))
  localStorage.setItem("terbeli", JSON.stringify(terbeli))
  localStorage.setItem("wishlist", JSON.stringify(q))
  return  window.location.href = "index.html"
}

let cancelNext = () => {
  window.location.href = "index.html"
}