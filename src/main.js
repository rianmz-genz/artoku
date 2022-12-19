// wishlistadd
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let terbeli = JSON.parse(localStorage.getItem("terbeli")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
// getId
let nama = document.getElementById("nama");
let totaltabungan = document.getElementById("totaltabungan");
let buttoneye = document.getElementById("buttoneye");
let viewdetail = document.getElementById("details");
let tertumbas = document.getElementById("terbeli");
let histori = document.getElementById("histori");
// get data
let p = wishlist.map((x, i) => {
  return x.ditabung;
});
let c = wishlist.filter((x, i) => i < 4);
let total = p.reduce((x, y) => x + y, 0);
// detail
let detail = wishlist.filter((x, i) => i === 0);
// user
let users = JSON.parse(localStorage.getItem("users")) || [];
let { username } = users;

// innerUser
if (username) {
  nama.innerHTML = username;
} else {
  nama.innerHTML = `login`;
}
// generate day
function getDayName(d) {
  var name = new Array(
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  );

  return name[d];
}
let date = new Date();
let thisyear = date.getFullYear();
let thismonth = date.getMonth();
let thisday = date.getDay();
let tgl = date.getDate();
let fulldate = `${getDayName(thisday)}, ${tgl}-${thismonth}-${thisyear}`;
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

if (terbeli.length <= 2) {
  tertumbas.innerHTML = terbeli
    .map((tumbas, i) => {
      let { category, name, harga, color, ditabung } = tumbas;
      let warna = "";
      if (color === "green") {
        warna = "bggreen";
      } else if (color === "orange") {
        warna = "bgorange";
      } else {
        warna = "bgblue";
      }
      let persen = (ditabung / harga) * 100;
      return `
          <div class="bgicon text-xs h-20 flex flex-col
          justify-between py-2 items-start cursor-pointer" key=${i} onclick="getDetailD(${i})">
          <div class="flex justify-between w-11/12 mx-auto">
              <p class=" ${warna} px-1 rounded-full
                  text-[10px]">${category}</p>
              <i class="bi bi-three-dots crusor-pointer" "></i>
          </div>
          <h3 class="text-white text-sm ml-3"> ${name} </h3>
          <p class="text-[9px] ml-3"> ${Math.round(
            persen
          )}%  dari Rp. ${harga.toLocaleString("id-ID")} </p>
          </div>
          `;
    })
    .join("");
}
if (terbeli.length === 0) {
  tertumbas.innerHTML =
    "<div class='text-xs'>Belum ada wishlist yang terbeli . . .</div>";
}
let getItemList = () => {
  document.getElementById("filterall").classList.add("border-2");
  document.getElementById("filtergreen").classList.remove("border-2");
  document.getElementById("filterblue").classList.remove("border-2");
  document.getElementById("filterorange").classList.remove("border-2")
  if(wishlist.length !== 0 ){
  document.getElementById("wishlist").innerHTML = wishlist
    .map((wish, i) => {
      let { category, name, harga, color, ditabung } = wish;
      let warna = "";
      if (color === "green") {
        warna = "bggreen";
      } else if (color === "orange") {
        warna = "bgorange";
      } else {
        warna = "bgblue";
      }
      let persen = (ditabung / harga) * 100;
      return `
            <div class="bgicon text-xs h-20 flex flex-col
            justify-between py-2 items-start cursor-pointer" key=${i} onclick="getDetail(${i})">
            <div class="flex justify-between w-11/12 mx-auto">
                <p class=" ${warna} px-1 rounded-full
                    text-[10px]">${category}</p>
                <i class="bi bi-three-dots crusor-pointer" "></i>
            </div>
            <h3 class="text-white text-sm ml-3"> ${name} </h3>
            <p class="text-[9px] ml-3"> ${Math.round(
              persen
            )}%  dari Rp. ${harga.toLocaleString("id-ID")} </p>
            </div>
            `;
    })
    .join("");
  }else{
    document.getElementById("wishlist").innerHTML =
    "<div class='text-xs '>Ngga ada wishlist disini . . .</div>";
  }
};

let hapus = async (index) => {
  let rilnow = await wishlist.find((x, i) => i === index);
  let ditabung = rilnow.ditabung;
  let curent = { ditabung, bg: "bgorange" };
  history.push(curent);
  localStorage.setItem("history", JSON.stringify(history));
  removeItem(index);
};
let removeItem = (index) => {
  let saringan = wishlist.filter((x, i) => i !== index);
  localStorage.setItem("wishlist", JSON.stringify(saringan));
  location.reload();
};

// detail
let todetail = (params) => {
  let isi = wishlist.find((x, i) => i === params);
  localStorage.setItem("detail", JSON.stringify(isi));
  window.location.href = "detail.html";
};
let getDetail = (index) => {
  detail = wishlist.filter((x, i) => i === index);
  let params = index;

  if (detail.length == 0) {
    let first = wishlist.filter((x, i) => i === 0);
    viewdetail.innerHTML = first.map((x, i) => {
      let { category, name, harga, color, ditabung, deskripsi } = x;
      let persen = (ditabung / harga) * 100;
      let warna = "";
      let bg = "";
      if (color === "green") {
        warna = "bggreen";
        bg = "rilgreen";
      } else if (color === "orange") {
        warna = "bgorange";
        bg = "rilorange";
      } else {
        warna = "bgblue";
        bg = "rilblue";
      }
      return `
            <div class="flex justify-between items-center">
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
                        <div class="w-full bg-white h-1 mt-3 rounded-full">
                            <div class="${bg} w-[${Math.round(
        persen
      )}%] h-full rounded-full transition-all duration-300">
                            </div>
                        </div>
                        <div class="text-[10px] mt-2 flex justify-between items-center">
                        <p>Progress</[p]> 
                        <p>${Math.round(persen)}%</p>
                        </div>
                        <div class="md:absolute max-sm:mt-3 bottom-0 border-t border-[#364049] w-full left-0 h-12">
                            <div class="flex w-10/12 justify-between mx-auto items-center mt-3 text-xs">
                                <p >Edit Wishlist Ini</p>
                                <div>
                                <i  class="bi bi-trash bgorange px-2 py-1 cursor-pointer" onclick="hapus(0)"></i>
                                <i class="bi bi-plus bggreen px-2 py-1 cursor-pointer" onclick="todetail(0)"></i>
                                </div>
                            </div>
                        </div>
            `;
    });
  } else {
    viewdetail.innerHTML = detail.map((x) => {
      let { category, name, harga, color, ditabung, deskripsi } = x;
      let persen = (ditabung / harga) * 100;
      let warna = "";
      let bg = "";

      if (color === "green") {
        warna = "bggreen";
        bg = "rilgreen";
      } else if (color === "orange") {
        warna = "bgorange";
        bg = "rilorange";
      } else {
        warna = "bgblue";
        bg = "rilblue";
      }
      return `
            <div class="flex justify-between items-center">
                            <p class="text-white">${name}</p>
                            <p class="${warna} px-1 rounded-full
                                text-[10px]">${category}</p>
                        </div>
                        <p class="text-xs mt-1">${deskripsi}</p>
                        <div class="text-xs mt-2 flex justify-between items-center">
                            <p>Harga</p>
                            <p>Rp. ${harga.toLocaleString("id-ID")}</p>
                        </div>
                        <div class="text-xs mt-2 flex justify-between items-center">
                            <p>Ditabung</p>
                            <p>Rp. ${ditabung.toLocaleString("id-ID")} </p>
                        </div>
                        <div class="w-full bg-white h-1 mt-3 rounded-full">
                            <div class="${bg} w-[${Math.round(
        persen
      )}%] transition-all duration-300 h-full rounded-full">
                            </div>
                        </div>
                        <div class="text-[10px] mt-2 flex justify-between items-center">
                        <p>Progress</[p]> 
                        <p>${Math.round(persen)}%</p>
                        </div>
                        <div class="md:absolute max-sm:mt-3 bottom-0 border-t border-[#364049] w-full left-0 h-12">
                            <div class="flex w-10/12 justify-between mx-auto items-center mt-3 text-xs">
                                <p >Edit Wishlist Ini</p>
                                <div>
                                <i  class="bi bi-trash bgorange px-2 py-1 cursor-pointer" onclick="hapus(0)"></i>
                                <i class="bi bi-plus bggreen px-2 py-1 cursor-pointer" onclick="todetail(0)"></i>
                                </div>
                            </div>
                        </div>
            `;
    });
  }
};

if (wishlist.length !== 0) {
  getItemList();
  getDetail();
} else {
  viewdetail.innerHTML =
    "<div class='text-xs text-white'>Artoku memudahkanmu mengelola uang untuk membeli barang impian yang dapat diakses kapanpun dan dimanapun!</div>";
  document.getElementById("wishlist").innerHTML =
    "<div class='text-xs '>Ngga ada wishlist disini . . .</div>";
}
let generateHistory = () => {
  if (history.length !== 0) {
    let yahu = history.filter((x,i)=> i < 7)
    console.log(yahu)
    histori.innerHTML = yahu
      .map((x, i) => {
        let { ditabung, bg } = x;
        let iconn = "";
        if (bg == "bgorange") {
          iconn = "dash";
        } else {
          iconn = "plus";
        }
        return `
      <div key=${i} class="${bg} flex justify-center py-2 items-center mt-2">
      <i class="bi bi-${iconn} mr-1"></i>
      <div>
      <p>Rp.${ditabung.toLocaleString("id-ID")}</p>
      <p class="text-[10px]">${fulldate}</p>
      </div>
      </div>
      `;
      })
      .join("");
  } else {
    histori.innerHTML =
      "<div class='text-center'>Ngga ada riwayat tabungan</div>";
  }
};
generateHistory();

let clearhistory = () => {
  localStorage.removeItem("history");
  location.reload();
};

let oiw = () => {
  let cc = wishlist.find((x) => x.ditabung > x.harga);
  terbeli.push(cc);
};
oiw();
let getDetailD = (index) => {
  let pp = terbeli.find((x, i) => i === index);
  let { category, name, deskripsi, ditabung, harga, color } = pp;
  let persen = (ditabung / harga) * 100;
  let warna = "";
  let bg = "";
  if (color === "green") {
    warna = "bggreen";
    bg = "rilgreen";
  } else if (color === "orange") {
    warna = "bgorange";
    bg = "rilorange";
  } else {
    warna = "bgblue";
    bg = "rilblue";
  }
  viewdetail.innerHTML = `
        <div class="flex justify-between items-center">
                        <p class="text-white">${name}</p>
                        <p class="${warna} px-1 rounded-full
                            text-[10px]">${category}</p>
                    </div>
                    <p class="text-xs mt-1">${deskripsi}</p>
                    <div class="text-xs mt-2 flex justify-between items-center">
                        <p>Harga</p>
                        <p>Rp. ${harga.toLocaleString("id-ID")}</p>
                    </div>
                    <div class="text-xs mt-2 flex justify-between items-center">
                        <p>Ditabung</p>
                        <p>Rp. ${ditabung.toLocaleString("id-ID")} </p>
                    </div>
                    <div class="w-full bg-white h-1 mt-3 rounded-full">
                        <div class="${bg} w-[${Math.round(
    persen
  )}%] transition-all duration-300 h-full rounded-full">
                        </div>
                    </div>
                    <div class="text-[10px] mt-2 flex justify-between items-center">
                    <p>Progress</[p]> 
                    <p>${Math.round(persen)}%</p>
                    </div>
                    <div class="md:absolute bottom-0 border-t border-[#364049] w-full left-0 h-12 max-sm:h-10 max-sm:mt-3">
                        <div class="flex w-10/12 justify-between mx-auto items-center mt-3 text-xs">
                            <p class="max-sm:text-[10px]">Wishlist telah terbeli</p>
                        </div>
                    </div>
        `;
};

let filtered = (coolor) => {
  let bbb = wishlist.filter((x) => x.color === coolor);
  let warni = "";
  if(coolor === "green") {
    document.getElementById("filtergreen").classList.add("border-2")
    document.getElementById("filterall").classList.remove("border-2")
    document.getElementById("filterblue").classList.remove("border-2")
    document.getElementById("filterorange").classList.remove("border-2")
  }else if (coolor === "orange") {
    document.getElementById("filterorange").classList.add("border-2")
    document.getElementById("filterall").classList.remove("border-2")
    document.getElementById("filterblue").classList.remove("border-2")
    document.getElementById("filtergreen").classList.remove("border-2")
  } else if (coolor === "blue"){
    document.getElementById("filterblue").classList.add("border-2")
    document.getElementById("filterall").classList.remove("border-2")
    document.getElementById("filterorange").classList.remove("border-2")
    document.getElementById("filtergreen").classList.remove("border-2")
  }
  if (coolor === "green") {
    warni = "rilgreen";
  } else if (coolor === "orange") {
    warni = "rilorange";
  } else {
    warni = "rilblue";
  }
  if (bbb.length !== 0) {
    document.getElementById("wishlist").innerHTML = bbb
      .map((wish, i) => {
        let { category, name, harga, color, ditabung } = wish;
        let warna = "";
        if (color === "green") {
          warna = "bggreen";
        } else if (color === "orange") {
          warna = "bgorange";
        } else {
          warna = "bgblue";
        }
        let persen = (ditabung / harga) * 100;
        return `
            <div class="bgicon text-xs h-20 flex flex-col
            justify-between py-2 items-start cursor-pointer" key=${i} onclick="getDetail(${i})">
            <div class="flex justify-between w-11/12 mx-auto">
                <p class=" ${warna} px-1 rounded-full
                    text-[10px]">${category}</p>
                <i class="bi bi-three-dots crusor-pointer" "></i>
            </div>
            <h3 class="text-white text-sm ml-3"> ${name} </h3>
            <p class="text-[9px] ml-3"> ${Math.round(
              persen
            )}%  dari Rp. ${harga.toLocaleString("id-ID")} </p>
            </div>
            `;
      })
      .join("");
  } else {
    document.getElementById(
      "wishlist"
    ).innerHTML = `<div class='text-xs'>Tidak ada wishlist warna  <span class='${warni} text-xs w-4 h-4 inline-block rounded-full ml-1'></span></div>`;
  }
};

let filterbluee = () => {
  document.getElementById("filterblue").classList.add = "border";
  document.getElementById("filtergreen").classList.remove = "border";
  document.getElementById("filterorange").classList.remove = "border";
  document.getElementById("filterall").classList.remove = "border";
};
