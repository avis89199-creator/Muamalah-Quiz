const questions = [
  { q: "Apa yang dimaksud dengan muamalah?", a: ["Hubungan dan aturan interaksi antarmanusia dalam kehidupan sosial dan ekonomi", "Ibadah khusus yang hanya dilakukan di masjid", "Aturan tentang tata cara berpuasa", "Kegiatan membaca kitab suci"], correct: 0, explain: "Muamalah mengatur hubungan antarmanusia, termasuk kegiatan sosial, kerja sama, dan transaksi." },
  { q: "Apa hukum asal kegiatan muamalah selama tidak ada larangan yang melanggarnya?", a: ["Haram", "Mubah atau diperbolehkan", "Makruh", "Wajib"], correct: 1, explain: "Pada dasarnya muamalah diperbolehkan selama tidak bertentangan dengan prinsip syariat." },
  { q: "Apa yang dimaksud dengan riba dalam transaksi?", a: ["Keuntungan dari jual beli yang disepakati", "Pemberian hadiah secara sukarela", "Tambahan yang disyaratkan dalam transaksi utang-piutang atau pertukaran tertentu", "Potongan harga dari penjual"], correct: 2, explain: "Riba adalah tambahan yang dilarang dalam bentuk transaksi tertentu, terutama utang-piutang." },
  { q: "Sikap yang harus diterapkan penjual saat menjelaskan barang dagangannya adalah ...", a: ["Menyembunyikan kekurangan barang", "Melebih-lebihkan kualitas barang", "Memberikan informasi yang jujur dan jelas", "Mengubah harga setelah akad tanpa persetujuan"], correct: 2, explain: "Kejujuran membantu kedua pihak memahami barang dan menyepakati transaksi dengan rela." },
  { q: "Apa arti gharar dalam transaksi?", a: ["Ketidakjelasan atau ketidakpastian yang berlebihan dalam transaksi", "Keuntungan yang diperoleh secara halal", "Kesepakatan harga secara terbuka", "Pemberian barang sebagai hadiah"], correct: 0, explain: "Gharar berkaitan dengan ketidakjelasan berlebihan pada objek, harga, atau ketentuan transaksi." },
  { q: "Contoh perilaku amanah dalam jual beli adalah ...", a: ["Menggunakan uang pembeli tanpa izin", "Menyerahkan barang sesuai kesepakatan", "Mengurangi timbangan", "Menyembunyikan kondisi barang"], correct: 1, explain: "Amanah berarti menjaga kepercayaan dan memenuhi kewajiban sesuai kesepakatan." },
  { q: "Jika barang yang dijual memiliki cacat, penjual sebaiknya ...", a: ["Tidak memberi tahu pembeli", "Menutupi cacat dengan kemasan", "Menjelaskan kondisi barang kepada pembeli", "Tetap menyebut barang sempurna"], correct: 2, explain: "Penjual perlu terbuka tentang kondisi barang agar pembeli dapat mengambil keputusan dengan sadar." },
  { q: "Apa tujuan utama menerapkan etika muamalah?", a: ["Mendapat keuntungan dengan cara apa pun", "Menciptakan transaksi yang adil, jujur, dan saling ridha", "Membuat pembeli selalu membayar lebih mahal", "Menghindari semua bentuk kegiatan ekonomi"], correct: 1, explain: "Etika muamalah mendorong keadilan, kejujuran, tanggung jawab, dan kerelaan kedua pihak." }
];

const intro = document.getElementById('intro');
const quizPanel = document.getElementById('quizPanel');
const resultPanel = document.getElementById('resultPanel');
const questionCounter = document.getElementById('questionCounter');
const progressPercent = document.getElementById('progressPercent');
const progressFill = document.getElementById('progressFill');
const questionText = document.getElementById('questionText');
const optionsBox = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
let score = 0;

document.getElementById('startBtn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', startQuiz);

function startQuiz() {
  current = 0;
  score = 0;
  intro.classList.add('hidden');
  resultPanel.classList.add('hidden');
  quizPanel.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const item = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);
  questionCounter.textContent = `Pertanyaan ${current + 1} dari ${questions.length}`;
  progressPercent.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  questionText.textContent = item.q;
  optionsBox.innerHTML = '';
  feedback.classList.add('hidden');
  nextBtn.classList.add('hidden');

  item.a.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener('click', () => chooseAnswer(index));
    optionsBox.appendChild(button);
  });
}

function chooseAnswer(selected) {
  const item = questions[current];
  const buttons = [...optionsBox.querySelectorAll('button')];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add('correct');
    if (index === selected && selected !== item.correct) button.classList.add('wrong');
  });
  if (selected === item.correct) score++;
  feedback.innerHTML = `<strong>${selected === item.correct ? 'Jawaban benar!' : 'Belum tepat.'}</strong> ${item.explain}`;
  feedback.classList.remove('hidden');
  nextBtn.textContent = current === questions.length - 1 ? 'Lihat Hasil →' : 'Pertanyaan Berikutnya →';
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizPanel.classList.add('hidden');
  resultPanel.classList.remove('hidden');
  document.getElementById('score').textContent = score;
  const title = document.getElementById('resultTitle');
  const message = document.getElementById('resultMessage');
  if (score === 8) {
    title.textContent = 'Luar biasa!';
    message.textContent = 'Kamu menjawab semua pertanyaan dengan benar. Pertahankan pemahamanmu tentang muamalah!';
  } else if (score >= 5) {
    title.textContent = 'Bagus, terus tingkatkan!';
    message.textContent = 'Kamu sudah memahami sebagian besar materi. Pelajari kembali penjelasan pada jawaban yang belum tepat.';
  } else {
    title.textContent = 'Tetap semangat belajar!';
    message.textContent = 'Tidak apa-apa, setiap latihan adalah kesempatan untuk memahami muamalah dengan lebih baik.';
  }
}
