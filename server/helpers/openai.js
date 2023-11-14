const generateAnsPromt = (q, answer) => {
    let question = q.split(';;');
    let result = `berikan nilai terhadap jawaban atas pertanyaan di bawah ini.`;

    for (let i = 0; i < 5; i++) {
        result += ' ' + question[i] + ' jawabannya ' + answer[i] + '. ';
    }

    result += 'cukup keluarkan respons dalam bentuk integer javascript. setiap jawaban benar mendapat 20 poin. Tidak perlu mengeluarkan respons deskripsi apa pun cukup integer total poinnya dalam bentuk js. cukup jawab misal 10 atau 50, tidak perlu ada deklarasi atau console log cukup angkanya saja'
    return result;
}

const generateBookPromt = (desc) => {
    let result = `berikan saya 1 buku yang menggambarkan atau yang isinya mirip atau sesuai dengan deskripsi di bawah ini. `;
    result += ` ${desc} `
    result += 'cukup keluarkan respons dalam bentuk string javascript. Tidak perlu mengeluarkan respons deskripsi apa pun cukup judul bukunya saja. cukup jawab misal Laskar Pelangi atau Atomic Habbits, tidak perlu ada deklarasi atau console log cukup judul bukunya saja'
    return result;
}

module.exports = { generateAnsPromt, generateBookPromt };