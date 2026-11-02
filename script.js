// 1. Obsługa menu mobilnego
const przyciskMenu = document.getElementById('przycisk-menu');
const nawigacjaGlowna = document.getElementById('nawigacja-glowna');

przyciskMenu.addEventListener('click', () => {
    nawigacjaGlowna.classList.toggle('aktywne');
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
    apple: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16'],
    samsung: ['Galaxy A54', 'Galaxy A55', 'Galaxy S22', 'Galaxy S23', 'Galaxy S24'],
    xiaomi: ['Redmi Note 12', 'Redmi Note 13', 'Xiaomi 13T', 'Xiaomi 14', 'POCO X6'],
    motorola: ['Moto G54', 'Moto G84', 'Motorola Edge 40', 'Motorola Edge 50']
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