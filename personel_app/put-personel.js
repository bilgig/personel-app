const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// JSON verisini almak için API URL'si
const apiUrl = `http://localhost:8080/personel/${postId}`;

// Form alanlarına erişim

const firstNameInput = document.getElementById('firstName');
const surnameInput = document.getElementById('surname');
const salaryInput = document.getElementById('salary');
const isMarriedCheckbox = document.getElementById('isMarried');
const notMarriedCheckbox = document.getElementById('notMarried');
const departmentSelect = document.getElementById('department');
const genderRadioFemale = document.getElementById('female');
const genderRadioMale = document.getElementById('male');
const birthDateInput = document.getElementById('birthDate');

const kaydetButton = document.getElementById('kaydet');


// API'den kişi verilerini al ve formu doldur
// API'den kişi verilerini al ve formu doldur
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        firstNameInput.value = data.firstName;
        surnameInput.value = data.surname;
        salaryInput.value = data.salary;
        if (data.isMarried) {
            isMarriedCheckbox.checked = true;
        } else {
            notMarriedCheckbox.checked = true;
        }

        departmentSelect.value = data.department;
        console.log(data.department);

        if (data.gender === "F") {
            genderRadioFemale.checked = true;
        } else {
            genderRadioMale.checked = true;
        }
    })
    .catch((error) => {
        console.error('Veri alınırken bir hata oluştu: ', error);
    });

// Form gönderildiğinde güncelleme işlemini yap
kaydetButton.addEventListener('click', function (event) {
    event.preventDefault();

    const isMarried = isMarriedCheckbox.checked;

    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? (genderInput.value === "female" ? "F" : "M") : null;

    const updatedPerson = {
        id: postId,
        firstName: firstNameInput.value,
        surname: surnameInput.value,
        salary: salaryInput.value,
        isMarried: isMarried,
        department: departmentSelect.value,
        gender: gender,
        birthDate: birthDateInput.value,
    };

    fetch('http://localhost:8080/personel/update', {
        method: 'PUT',
        body: JSON.stringify(updatedPerson),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Güncelleme başarısız. Durum Kodu: ' + response.status);
        }
        return response.json();
    })
    .then((json) => {
        console.log('Güncellenen Kişi:', json);
        alert('Kişi bilgileri başarıyla güncellendi!');
    })
    .catch((error) => {
        console.error(error);
    });
});