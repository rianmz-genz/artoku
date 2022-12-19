// wishlistadd
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let terbeli = JSON.parse(localStorage.getItem("terbeli")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
// submit
const p = () => {
    if(wishlist.length >= 4){
        return document.getElementById("message").innerHTML = "<div class='bggreen px-2 py-1'>Upgrade akun mu ke premium untuk menambahkan wishlist lebih dari 4</div>"
    }
}
p()
const check = (e) => {
    e.preventDefault()

    const form = new FormData(e.target);
    const name = form.get("barang");
    const category = form.get("kategori");
    const deskripsi = form.get("deskripsi");
    const color = form.get("color");
    const rega = form.get("harga");
    const setor = form.get("ditabung");
    const harga = parseInt(rega)
    const ditabung = parseInt(setor)
    const a = isNaN(harga && ditabung)
    const data = { category,name,deskripsi, harga  ,color, ditabung}
    const datas = {ditabung, bg: "bggreen"}
    if(a){
        return document.getElementById("nan").innerHTML = '<span class="text-red-300">data yang anda masukan bukan angka</span>'
    }
    if (ditabung > harga){
        return document.getElementById("nan2").innerHTML = "<span class='text-red-300'>jumlah ditabung tidak boleh lebih dari harga</span>"
    }
    if(ditabung == harga){
        terbeli.push(data)
        return localStorage.setItem("terbeli", JSON.stringify(terbeli))
    }
    wishlist.push(data)
    history.push(datas)
    localStorage.setItem("history", JSON.stringify(history))
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    document.getElementById("barang").value = ""
    document.getElementById("kategori").value = ""
    document.getElementById("deskripsi").value = ""
    document.getElementById("harga").value = ""
    document.getElementById("ditabung").value = ""
    document.getElementById("nan").innerHTML = "Harga tanpa Rp dan ."
    document.getElementById("nan2").innerHTML = "Ditabung tanpa Rp dan ."
    window.location.href = "index.html"
    return false;
}


