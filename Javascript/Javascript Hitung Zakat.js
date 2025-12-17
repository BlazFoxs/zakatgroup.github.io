/* --- LOGIKA KALKULATOR ZAKAT --- */

// Fungsi Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Fungsi Ganti Tab
function openTab(evt, tabName) {
    // Sembunyikan semua konten tab
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }

    // Hapus class active dari semua tombol
    let tabLinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Tampilkan tab yang dipilih
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

// 1. Hitung Zakat Fitrah
function hitungZakatFitrah() {
    // Ambil nilai input
    let jiwa = document.getElementById('fitrah_jiwa').value;
    let harga = document.getElementById('fitrah_harga').value;
    
    // Validasi input
    if (jiwa == "" || jiwa <= 0) {
        alert("Mohon masukkan jumlah orang dengan benar.");
        return;
    }

    // Rumus: Jumlah Orang x 2.5 Kg x Harga Beras
    let totalBayar = jiwa * 2.5 * harga;
    let totalBeras = jiwa * 2.5;

    // Tampilkan hasil
    document.getElementById('hasil_fitrah').style.display = 'block';
    document.getElementById('nominal_fitrah').innerText = formatRupiah(totalBayar);
    document.getElementById('berat_beras').innerText = totalBeras;
}

// 2. Hitung Zakat Maal
function hitungZakatMaal() {
    // Ambil nilai input (parse float agar bisa desimal)
    let hargaEmas = parseFloat(document.getElementById('harga_emas').value) || 0;
    let uang = parseFloat(document.getElementById('harta_uang').value) || 0;
    let aset = parseFloat(document.getElementById('harta_emas').value) || 0;
    let hutang = parseFloat(document.getElementById('hutang').value) || 0;

    // Hitung Total Harta Bersih
    let totalHarta = (uang + aset) - hutang;
    
    // Hitung Nisab (85 Gram Emas)
    let nisab = 85 * hargaEmas;

    let resultBox = document.getElementById('hasil_maal');
    let statusNisab = document.getElementById('status_nisab');
    let nominalMaal = document.getElementById('nominal_maal');

    resultBox.style.display = 'block';

    // Cek apakah mencapai Nisab
    if (totalHarta >= nisab) {
        // Wajib Zakat 2.5%
        let zakat = totalHarta * 0.025;
        
        resultBox.style.backgroundColor = "#f0fdf4"; // Hijau (Wajib)
        resultBox.style.borderColor = "#bbf7d0";
        statusNisab.innerHTML = `<span style="color: green"><i class="fas fa-check-circle"></i> Wajib Zakat</span> (Harta Anda melebihi Nisab ${formatRupiah(nisab)})`;
        nominalMaal.innerText = formatRupiah(zakat);
    } else {
        // Tidak Wajib
        resultBox.style.backgroundColor = "#fff1f2"; // Merah muda (Belum wajib)
        resultBox.style.borderColor = "#fecdd3";
        statusNisab.innerHTML = `<span style="color: #e11d48"><i class="fas fa-times-circle"></i> Belum Wajib Zakat</span> (Harta belum mencapai Nisab ${formatRupiah(nisab)})`;
        nominalMaal.innerText = "Rp 0";
    }
}