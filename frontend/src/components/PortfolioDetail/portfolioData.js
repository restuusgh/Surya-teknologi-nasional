const projects = [
  {
    id: "1",
    title: "Cikao Park Purwakarta",
    detailTitle: "Pintu Masuk Water Park",
    client: "Cikao Park",
    location: "Purwakarta",
    category: "Passenger Gate",
    year: "2019",
    description: `
      Cikao Park merupakan tempat wisata yang menawarkan taman rekreasi air dengan kolam ombak, satwa liar & ilusi optic,
      yang berlokasi di Jatiluhur Purwakarta, menjadikan tempat wisata ini mudah dijangkau dan ramai pengunjung.
      Untuk memudahkan transaksi dan pelaporan dengan baik dan efektif, pengelola Cikao Park memberikan kesempatan kepada
      PT. Surya Teknologi Nasional untuk memasang Sistem Ticketing di tempat tersebut.
    `,
    img: ["/Cikao-Gate.jpeg"],
    detailImg: ["/14.jpg", "/15.jpg"],
    technologies: ["Laravel", "MySQL", "Bootstrap"],
    features: [
      "Sistem Ticketing Otomatis",
      "Integrasi dengan Barrier Gate",
      "Pelaporan Transaksi Real-Time",
    ],
  },
  {
    id: "2",
    title: "Le Giant Pool & Bar Bali",
    detailTitle: "Pintu Masuk Pool & Bar",
    client: "Le Giant",
    location: "Kuta, Bali",
    category: "Passenger Gate",
    year: "2020",
    description: "Le Giant Pool & Bar merupakan tempat yang menawarkan kolam renang dan resto yang berlokasi di Kuta Bali, menjadikan tempat wisata ini mudah dijangkau dan ramai pengunjung. Untuk memudahkan sistem informasi, pelaporan, perekapan dengan baik dan efektif, pengelola Le Giant Pool & Bar ini memberikan kesempatan kepada PT. Surya Teknologi Nasional untuk pemasangan Flap barrier dengan Sistem Ticketing. Tujuan hal tersebut yaitu untuk memudahakan dalam pelaporan keuangan, pelaporan secara real time dan memudahkan dalam perekapan data. Pada Sistem Ticketing ini terdapat Flap Barrier yang digunakan untuk membatasi para pengunjung untuk lebih tertib, teratur dan terkontrol. Tertib karena setiap orang yang akan masuk hanya diperuntukan bagi orang yang memiliki tiket yang valid (1 tiket hanya berlaku untuk 1 orang), teratur karena orang yang tidak berkepentingan tidak dapat masuk begitu saja ke dalam area Le Giant Pool & Bar, dan terkontrol karena setiap yang masuk ataupun keluar akan terekap datanya secara otomatis dan real time.Pada Sistem Ticketing ini terdapat Flap Barrier yang digunakan untuk membatasi para pengunjung untuk lebih tertib, teratur dan terkontrol. Tertib karena setiap orang yang akan masuk hanya diperuntukan bagi orang yang memiliki tiket yang valid (1 tiket hanya berlaku untuk 1 orang), teratur karena orang yang tidak berkepentingan tidak dapat masuk begitu saja ke dalam area Le Giant Pool & Bar, dan terkontrol karena setiap yang masuk ataupun keluar akan terekap datanya secara otomatis dan real time.",
    img: ["/Pintu Masuk Pool.jpg"],
    detailImg: ["/Pintu Masuk Pool.jpg", "/legiant.png"],
    technologies: ["React", "Firebase"],
    features: ["QR Scan", "Realtime Check-in", "Payment Integration"],
  },
  {
    id: "3",
    title: "Perumahan Katapang",
    detailTitle: "Perumahan Katapang Indah Residence",
    client: "Perumahan Katapang Indah Residence",
    location: "Jalan Terusan Kopo, Bandung",
    category: "Automatic Barrier Gate",
    year: "2020",
    description: "Katapang Indah Residence merupakan sebuah perumahan yang berlokasi di Kota Bandung. Untuk meningkatkan keamaanan dan ketertiban di Katapang Indah Residence,pengelola Katapang Indah Residence menerapkan Sistem keamanan dengan memberikan kesempatan kepada PT. Surya Teknologi Nasional untuk memasang Sistem Automatic Barrier Gate pada perumahan tersebut. Konsep Sistem Automatic Barrier Gate di perumahan Katapang Indah Residence menggunakan sistem 2 jalur yaitu akses masuk dan keluar yang bersebelahan dengan pos keamanan di tengahnya, dan dilengkapi juga dengan CCTV untuk mengcapture aktivitas keluar masuk warga pada kawasan Katapang Indah Residence. Sistem Automatic Barrier Gate ini juga mendukung kebutuhan di perumahan Katapang Indah Residence yaitu dengan memberikan fitur expired member, biasanya hal tersebut dibutuhkan jika terdapat warga yang belum membayar iuran, sehingga kartu tidak akan dapat digunakan untuk sementara, sampai status member tersebut kembali aktif. Dengan Sistem Kartu Akses berbasis RFID ini, pengelola dapat melihat history aktivitas keluar masuk warganya secara real time.",
    img: ["/Katapang.jpg"],
    detailImg: ["/Katapang.jpg"],
    technologies: ["IoT", "Node.js"],
    features: ["License Plate Recognition", "Remote Access"],
  },
 {
    id: "4",
    title: "RS. Permata Cirebon",
    client: "Rumah Sakit Permata Cirebon",
    location: "Cirebon, Jawa Barat",
    category: "Parkir Sistem dengan Automatic Barrier Gate",
    year: "2020",
    description: "PT. Surya Teknologi Nasional berkesempatan memasang Peralatan dan Sistem Parkir di Rumah Sakit Permata Cirebon. Sistem parkir yang dipakai yaitu menggunakan sistem manless. Sistem Manless dari PT Surya Teknologi dipakai karena mudah penggunaannya dimana tidak ada operator di pintu masuk. Untuk pemasangan perangkat parkir berada di 2 titik yaitu Pintu Masuk dan Keluar jalan Tuparev serta Pintu Masuk dan Keluar di Jalan Pilang Raya.Untuk pintu masuk manless dari PT Surya Teknologi Nasional pengendara dapat mengambil karcis parkir dan menggunakan kartu parkir. Untuk kendaraan umum, penjenguk pasien dapat mengambil karcis parkir. Pengendara juga tidak perlu khawatir di masa pandemi karena perangkat sudah didukung tombol touchless (Tanpa bersentuhan dengan tombol). Bagi dokter, staff RS, dan pasien terdapat sistem membership yang memungkinkan pendataan menggunakan plat nomor kendaraan dan penggunaan kartu member yang memudahkan ketika akses masuk dan keluar.Sistem Parkir PT. Surya Teknologi Nasional memiliki hasil pelaporan yang real time, dimana Laporan hasil pendapatan akan termuat otomatis oleh software dan langsung terkirim pada PC Server. Laporan ini dapat dicetak atau bisa dilihat secara online melaui jaringan internet.",
    img: ["/RSUD-Permata.jpg"],
    technologies: ["IoT", "Node.js"],
    features: ["License Plate Recognition", "Remote Access"],
  },
 
];

export default projects;
