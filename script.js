// 1. Obsługa menu mobilnego
const przyciskMenu = document.getElementById('przycisk-menu');
const nawigacjaGlowna = document.getElementById('nawigacja-glowna');

przyciskMenu.addEventListener('click', () => {
    const czyOtwarte = nawigacjaGlowna.classList.toggle('aktywne');
    przyciskMenu.setAttribute('aria-expanded', czyOtwarte);
});

document.addEventListener('click', (zdarzenie) => {
    const kliknietyLink = zdarzenie.target.closest('#nawigacja-glowna a');
    if (kliknietyLink) {
        console.log('Kliknięto link:', kliknietyLink.getAttribute('href'));
        nawigacjaGlowna.classList.remove('aktywne');
        przyciskMenu.setAttribute('aria-expanded', 'false');
    }
});

// 2. Przełącznik motywu
const przyciskMotywu = document.getElementById('przycisk-motywu');

przyciskMotywu.addEventListener('click', () => {
    document.body.classList.toggle('tryb-ciemny');
    const czyCiemny = document.body.classList.contains('tryb-ciemny');
    przyciskMotywu.textContent = czyCiemny ? '☀️ Tryb jasny' : '🌙 Tryb ciemny';
});

// 3. Rozwijane menu marek i przypisanych do nich modeli telefonów
const modeleTelefonow = {
    apple: [
        'iPhone 18 Pro Max', 'iPhone 18 Pro',
        'iPhone Air',
        'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 17e',
        'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 16e',
        'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
        'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
        'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
        'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini'
    ],
    samsung: [
        'Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26',
        'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25', 'Galaxy S25 Edge', 'Galaxy S25 FE',
        'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE',
        'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
        'Galaxy Z Fold8 Ultra', 'Galaxy Z Fold8', 'Galaxy Z Flip8',
        'Galaxy Z Fold7', 'Galaxy Z Flip7', 'Galaxy Z Flip7 FE',
        'Galaxy Z Fold6', 'Galaxy Z Flip6',
        'Galaxy A57', 'Galaxy A56', 'Galaxy A55', 'Galaxy A54',
        'Galaxy A37', 'Galaxy A36', 'Galaxy A35', 'Galaxy A34',
        'Galaxy A27', 'Galaxy A26', 'Galaxy A25',
        'Galaxy A17', 'Galaxy A16'
    ],
    xiaomi: [
        'Xiaomi 17 Ultra', 'Xiaomi 17',
        'Xiaomi 17T Pro', 'Xiaomi 17T',
        'Xiaomi 15T Pro', 'Xiaomi 15T', 'Xiaomi 15 Ultra', 'Xiaomi 15',
        'Xiaomi 14T Pro', 'Xiaomi 14T', 'Xiaomi 14',
        'Redmi Note 15 Pro+ 5G', 'Redmi Note 15 Pro 5G', 'Redmi Note 15 5G',
        'Redmi Note 15 Pro 4G', 'Redmi Note 15 4G',
        'Redmi Note 14 Pro+ 5G', 'Redmi Note 14 Pro 5G', 'Redmi Note 14 5G',
        'Redmi Note 13 Pro+ 5G', 'Redmi Note 13 Pro 5G', 'Redmi Note 13 5G',
        'POCO F8 Ultra', 'POCO F8 Pro', 'POCO F7 Pro', 'POCO F7',
        'POCO X7 Pro', 'POCO M8 Pro', 'POCO M8'
    ],
    huawei: [
        'Huawei Mate 80 Pro',
        'Huawei Pura 90 Pro', 'Huawei Pura 90',
        'Huawei Pura 80 Ultra', 'Huawei Pura 80 Pro', 'Huawei Pura 80',
        'Huawei Pura 70 Ultra', 'Huawei Pura 70 Pro', 'Huawei Pura 70',
        'Huawei Mate X6',
        'Huawei Nova 15 Pro', 'Huawei Nova 15',
        'Huawei Nova 14', 'Huawei Nova 13', 'Huawei Nova 12'
    ]
};

const wyborMarki = document.getElementById('wybor-marki');
const wyborModelu = document.getElementById('wybor-modelu');

wyborMarki.addEventListener('change', () => {
    const wybranaMarka = wyborMarki.value;
    wyborModelu.innerHTML = '';

    if (wybranaMarka && modeleTelefonow[wybranaMarka]) {
        wyborModelu.disabled = false;
        
        const opcjaDomyslna = document.createElement('option');
        opcjaDomyslna.value = '';
        opcjaDomyslna.textContent = '-- Wybierz model telefonu --';
        wyborModelu.appendChild(opcjaDomyslna);

        modeleTelefonow[wybranaMarka].forEach((model) => {
            const opcja = document.createElement('option');
            opcja.value = model;
            opcja.textContent = model;
            wyborModelu.appendChild(opcja);
        });
    } else {
        wyborModelu.disabled = true;
        const opcjaDomyslna = document.createElement('option');
        opcjaDomyslna.value = '';
        opcjaDomyslna.textContent = '-- Najpierw wybierz markę --';
        wyborModelu.appendChild(opcjaDomyslna);
    }
});

// 4. Walidacja formularza zgłoszenia naprawy
const formularzNaprawy = document.getElementById('formularz-naprawy');
const komunikatFormularza = document.getElementById('komunikat-formularza');

formularzNaprawy.addEventListener('submit', (zdarzenie) => {
    zdarzenie.preventDefault();

    const marka = wyborMarki.value;
    const model = wyborModelu.value;
    const imieKlienta = document.getElementById('imie-klienta').value.trim();
    const telefonKlienta = document.getElementById('telefon-klienta').value.trim();
    const opisUsterki = document.getElementById('opis-usterki').value.trim();

    const wzorTelefonu = /^[0-9]{9}$/;

    if (!marka || !model) {
        pokazKomunikat('Proszę wybrać markę oraz konkretny model telefonu z listy.', 'blad');
        return;
    }

    if (imieKlienta.length < 2) {
        pokazKomunikat('Proszę wpisać swoje imię (minimum 2 znaki).', 'blad');
        return;
    }

    if (!wzorTelefonu.test(telefonKlienta)) {
        pokazKomunikat('Proszę podać poprawny, 9-cyfrowy numer telefonu (bez spacji).', 'blad');
        return;
    }

    if (opisUsterki.length < 10) {
        pokazKomunikat('Opis usterki jest za krótki - wpisz minimum 10 znaków.', 'blad');
        return;
    }

    pokazKomunikat(
        `Dziękujemy, ${imieKlienta}! Zgłoszenie dla modelu ${model} zostało przyjęte. Oddzwonimy pod numer ${telefonKlienta}.`,
        'sukces'
    );
    formularzNaprawy.reset();
    wyborModelu.disabled = true;
    wyborModelu.innerHTML = '<option value="">-- Najpierw wybierz markę --</option>';
});

function pokazKomunikat(tekst, typ) {
    komunikatFormularza.textContent = tekst;
    komunikatFormularza.className = `komunikat-formularza ${typ}`;
}