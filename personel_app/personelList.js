const apiUrl = 'http://localhost:8080/personel';

// Sorgula butonu
const queryButton = document.getElementById('sorgula');
queryButton.addEventListener('click', () => {
    const personelId = document.getElementById('id').value;
    
    fetch(apiUrl + '/' + personelId)
        .then((response) => response.json())
        .then((data) => {
            updateTable([data]);
        })
        .catch((error) => {
            console.error('Veri alınırken bir hata oluştu: ', error);
        });
});

// Tabloyu güncelleyen işlev
function updateTable(personel) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    personel.forEach((personel) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${personel.id}</td>
            <td>${personel.firstName}</td>
            <td>${personel.surname}</td>
            <td>${personel.salary}</td>
            <td>${personel.isMarried}</td>
            <td>${personel.department}</td>
            <td>${personel.gender}</td>
            <td>${personel.birthDate}</td>
            <td><button class="btn btn-danger delete-button" data-personel-id="${personel.id}">Sil</button></td>
            <td><button class="btn btn-primary update-button" data-personel-id="${personel.id}">Güncelle</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Silme işlemi için düğmelere tıklama dinleyici ekleyin
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const personelId = button.getAttribute('data-personel-id');
            if (confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
                fetch(apiUrl + '/' + personelId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            location.reload();
                        } else {
                            console.error('Silme işlemi başarısız oldu.');
                        }
                    })
                    .catch((error) => {
                        console.error('Silme işlemi sırasında bir hata oluştu: ', error);
                    });
            }
        });
    });
    
    // Güncelle butonlarına tıklama dinleyici ekleyin
    const updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const personelId = button.getAttribute('data-personel-id');
            window.location.href = `post-personel.html?id=${personelId}`;
        });
    });
}

// JSON verisini API'den al
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        updateTable(data);
    })
    .catch((error) => {
        console.error('Veri alınırken bir hata oluştu: ', error);
    });