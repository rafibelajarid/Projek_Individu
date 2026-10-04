
// DATA KERANJANG
let keranjang = [];

// BOOTSTRAP MODAL
const modalKeranjang =
    new bootstrap.Modal(
        document.getElementById("modalKeranjang")
    );

const modalPembayaran =
    new bootstrap.Modal(
        document.getElementById("modalPembayaran")
    );

const modalBerhasil =
    new bootstrap.Modal(
        document.getElementById("modalBerhasil")
    );


// TAMBAH PESANAN
function tambahPesanan(nama, harga) {

    let item = keranjang.find(
        produk => produk.nama === nama
    );


    if (item) {

        item.jumlah++;

    } else {

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });

    }


    tampilkanKeranjang();

    alert(
        nama + " berhasil ditambahkan ke keranjang!"
    );
}

// TAMPILKAN KERANJANG
function tampilkanKeranjang() {

    const isi =
        document.getElementById("isiKeranjang");

    const jumlah =
        document.getElementById("jumlahKeranjang");

    const totalElement =
        document.getElementById("totalHarga");


    isi.innerHTML = "";


    let total = 0;

    let totalItem = 0;


    if (keranjang.length === 0) {

        isi.innerHTML = `
            <p class="text-muted">
                Keranjang masih kosong.
            </p>
        `;

    }


    keranjang.forEach((item, index) => {

        let subtotal =
            item.harga * item.jumlah;

        total += subtotal;

        totalItem += item.jumlah;


        isi.innerHTML += `

            <div class="border-bottom py-3">

                <div class="d-flex justify-content-between">

                    <div>

                        <strong>
                            ${item.nama}
                        </strong>

                        <br>

                        <small class="text-muted">
                            ${item.jumlah} x
                            Rp ${item.harga.toLocaleString("id-ID")}
                        </small>

                    </div>

                    <div class="text-end">

                        <strong>
                            Rp ${subtotal.toLocaleString("id-ID")}
                        </strong>

                        <br>

                        <button
                            class="btn btn-sm btn-outline-danger mt-1"
                            onclick="hapusPesanan(${index})"
                        >
                            Hapus
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    jumlah.innerText = totalItem;

    totalElement.innerText =
        "Rp " + total.toLocaleString("id-ID");
}

// HAPUS PESANAN
function hapusPesanan(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();
}

// BUKA KERANJANG
function bukaKeranjang() {

    tampilkanKeranjang();

    modalKeranjang.show();
}

// BUKA PEMBAYARAN
function bukaPembayaran() {

    if (keranjang.length === 0) {

        alert(
            "Keranjang masih kosong!"
        );

        return;
    }


    let total = hitungTotal();


    document.getElementById(
        "totalPembayaran"
    ).innerText =
        "Rp " + total.toLocaleString("id-ID");


    modalKeranjang.hide();


    setTimeout(() => {

        modalPembayaran.show();

    }, 300);
}

// HITUNG TOTAL
function hitungTotal() {

    let total = 0;


    keranjang.forEach(item => {

        total +=
            item.harga * item.jumlah;

    });


    return total;
}


// PROSES PEMBAYARAN
function prosesPembayaran() {

    const nama =
        document.getElementById(
            "namaPembeli"
        ).value.trim();


    const nomor =
        document.getElementById(
            "nomorHP"
        ).value.trim();


    const metode =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    if (nama === "") {

        alert(
            "Nama pembeli harus diisi!"
        );

        return;
    }


    if (nomor === "") {

        alert(
            "Nomor HP harus diisi!"
        );

        return;
    }


    let total = hitungTotal();


    document.getElementById(
        "detailPembayaran"
    ).innerHTML = `

        Terima kasih <strong>${nama}</strong>.<br><br>

        Pesanan kamu akan diproses
        menggunakan metode pembayaran:

        <br>

        <strong>${metode}</strong>

        <br><br>

        Total pembayaran:

        <br>

        <strong>
            Rp ${total.toLocaleString("id-ID")}
        </strong>

    `;


    modalPembayaran.hide();


    setTimeout(() => {

        modalBerhasil.show();

    }, 300);


    // Kosongkan keranjang

    keranjang = [];

    tampilkanKeranjang();


    // Kosongkan data pembeli

    document.getElementById(
        "namaPembeli"
    ).value = "";

    document.getElementById(
        "nomorHP"
    ).value = "";
}



// FILTER MENU
function filterMenu(kategori) {

    const cards =
        document.querySelectorAll(
            ".menu-card"
        );


    cards.forEach(card => {

        if (
            kategori === "all" ||
            card.classList.contains(kategori)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}