// Yeni hesap oluşturma fonksiyonu
function createAccount(fullName, username, password, accountType) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push({ fullName, username, password, accountType });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Hesap başarıyla oluşturuldu!');
}


// Giriş yapma fonksiyonu
function login(username, password) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts.find(acc => acc.username === username && acc.password === password);

    if (account) {
        // Geçerli hesabı localStorage'a kaydetme
        localStorage.setItem('currentUser', JSON.stringify(account));

        // Hesap türüne göre yönlendirme
        if (account.accountType === "teacher") {
            window.location.href = "teacher_dashboard.html";
        } else if (account.accountType === "student") {
            window.location.href = "student_dashboard.html";
        } else {
            alert("Bilinmeyen hesap türü.");
        }
    } else {
        alert('Kullanıcı adı veya şifre yanlış.');
    }
}

// Çıkış yapma fonksiyonu
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}

// Ders oluşturma fonksiyonu
function createLecture(lectureName, lectureCode, lectureDate) {
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    lectures.push({ lectureName, lectureCode, lectureDate, attendees: [] });
    localStorage.setItem('lectures', JSON.stringify(lectures));
    alert('Ders başarıyla oluşturuldu!');
}

// Öğrenci yoklama kaydı fonksiyonu
function registerAttendance(lectureCode) {
    const lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    const lecture = lectures.find(lec => lec.lectureCode === lectureCode);
    if (lecture) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!lecture.attendees.includes(currentUser.fullName)) {
            lecture.attendees.push(currentUser.fullName);
            localStorage.setItem('lectures', JSON.stringify(lectures));
            alert('Yoklama başarıyla kaydedildi!');
        } else {
            alert('Bu ders için zaten kaydınız var.');
        }
    } else {
        alert('Geçersiz ders kodu.');
    }
}
