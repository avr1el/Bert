export interface PolaroidMemory {
  id: string;
  indexLabel: string;
  src: string;
  caption: string;
  subtitle: string;
  personalCaption: string;
  message: string;
  rotationDeg: number;
}

export const PROFILE_DATA = {
  heroHeadline: "HAPPY BIRTHDAY!",
  recipientName: "Rara",
  recipientFullName: "Syaqienna Azzahra",
  birthDate: { year: 2007, month: 4, day: 19 },
  birthdayDayMonth: "19 April",
  mainPhoto: "/foto/foto-utama.jpg",
  transparentPhoto: "/foto/transparan.png",
  musicSrc: "/music/magnolia.mp3",
  musicTitle: "Magnolia",
};

export const LETTER_CONTENT = {
  greeting: "Dear, Rara..",
  mainWish:
    "Selamat ulang tahun, semoga hari kamu selalu dipenuhi hal-hal baik, selalu diberikan kesehatan, dan semua hal yang kamu harapin semoga terwujud. Jangan lupa buat selalu jaga kesehatan, yang paling penting jangan telat makan!!!. selalu jadi diri kamu sendiri, jangan mikirin apa kata orang, karena kamu adalah kamu.",
  spoilerWarning:
    "Read at your own risk: tap ini kalau kamu mau baca isinya... and flip the card...",
  spoilerHint: "Ketuk untuk membuka pesan rahasia",
  secretMessage:
    'Btw... aku masi inget segala hal tentang kamu... bahkan setiap aku denger orang manggil nama "Rara" yang terlintas di otak ku itu kamu, Syaqienna Azzahra. aku tahu kalau waktu enggak bisa di ulang, dan mungkin banyak hal yang udah berubah sekarang. aku juga sadar kalo dulu aku buat banyak banget salah sama kamu, dan itu yang bikin aku kehilangan sesuatu yang dulu berarti banget buat aku. tapi jujur, aku enggak pernah nyesel pernah sama kamu, malahan aku bahagia banget, karena kamu itu orang yang bikin aku banyak berubah dan belajar tentang hal baru. (lah iya malah curhat maaf yah kangenn bingits). semoga kamu selalu bahagia dimanapun kamu berada, ra. sekali lagi, selamat ulang tahun...',
  ctaLabel: "Open Memories",
};

export const MARQUEE_IMAGES = [
  "/foto/kenangan1.jpg",
  "/foto/kenangan2.jpg",
  "/foto/kenangan3.jpg",
  "/foto/kenangan4.jpg",
];

export const POLAROID_DATA: PolaroidMemory[] = [
  {
    id: "simple-but-ours",
    indexLabel: "01",
    src: "/foto/kenangan1.jpg",
    caption: "Simple But Ours",
    subtitle: "Genshin impact",
    personalCaption: "Genshin Impact · a quiet moment I still keep close",
    rotationDeg: -3.5,
    message:
      "kangen waktu itu… i think that was the first time we played together (?) atau yang di inazuma, di hutan itu… aku lupa namanya jier. ya... buat orang lain mungkin itu hal biasa, tapi buat aku, ini sesuatu yang enggak bakal aku lupain... oh iya, kalau kamu inget waktu itu aku pernah edit foto ini, yang kayak bulan ‘jealous’ gara-gara liat kita berdua wkwk... i don’t know if you still remember it or not… tapi aku bener-bener seneng banget waktu ituu!",
  },
  {
    id: "more-than-movie",
    indexLabel: "02",
    src: "/foto/kenangan2.jpg",
    caption: "More Than Movie",
    subtitle: "Discord Watch Party",
    personalCaption: "Discord Watch Party · our first movie together",
    rotationDeg: 2.5,
    message:
      "ini jadi first-time aku nonton bareng kamu... meskipun lewat discord jier. kalau di inget-inget waktu itu pertama kalinya kita ngobrol (?) meskipun pas itu kita enggak terlalu banyak ngobrol... tapi itu jadi satu hal yang seruu dan memorable buat akuuu. seru karena movie nya emang bagus SAMA karena disitu aku bareng kamuu...",
  },
  {
    id: "given-with-heart",
    indexLabel: "03",
    src: "/foto/kenangan3.jpg",
    caption: "Given With Heart",
    subtitle: "First Birthday Gift",
    personalCaption: "First Birthday Gift · a little gift chosen with heart",
    rotationDeg: -2,
    message:
      "ini jadi pertama kalinya aku ngasih hadiah ke orang... meskipun enggak seberapa tapi itu jadi salah satu hal yang paling berkesan buat aku, dan aku nggak pernah ngerasa itu sia-sia... DAN itu jadi salah satu hadiah pertama ulang tahun kamu dari aku... mungkin buat kamu itu cuma hal kecil, tapi buat aku, itu momen di mana aku bener-bener pengen bikin kamu bahagia, walau cuma sebentar aja... dan anehnya, dari hal sesederhana itu aja, aku ngerasa cukup… karena dengan itu aku bisa jadi bagian kecil dari hari-hari kamu... (kalau kamu inget yang aku bilang alesan kenapa aku milih nya itu.. yah karena ini... karena dia mirip sama aku). aku gatau bonekanya masih ada atau udah di buang(?) kalaupun di buang itu pasti karena salah aku... kamu gaperlu ngerasa bersalah, karena itu emang pure salah akuuu <3",
  },
  {
    id: "if-i-replied",
    indexLabel: "04",
    src: "/foto/kenangan4.jpg",
    caption: "If i replied",
    subtitle: "Where It Started",
    personalCaption: "Where It Started · one missed chat that changed a lot",
    rotationDeg: 3.5,
    message:
      "kalau di inget-inget lucu jugaa... semuanya di mulai dari sini, dari sebuah chat yang emang aku lewatin... pas itu antara aku emang tidak pernah buka Instagram atau emang belum download Instagram... tapi pas waktu aku lihat pesan dari kamu and BOOM... rasanya kayak seluruh memori yang udah lama terasa pudar perlahan kembali lagi... kenangan, perasaan... bahkan bagian dari diri aku yang emang kerasa kosong kayak ke isi lagi... meskipun akhirnya udah enggak sama-sama lagi, KARENA KESALAHAN AKU YANG SANGAT AMAT BODOHHHH T~T. tapi aku tetep bersyukur karena dulu kita pernah kayak gitu... and I miss that moment... kalaupun memang waktu bisa di putar kembali, aku bakalan balik lagi ke waktu itu tanpa pikir panjang dan langsung bales chat kamu saat itu jugaa... dan yahh aku belajar.. karena dari hal sesederhana itu... hidup aku sempat berubah jadi lebih berarti, berkat kamu.",
  },
];
