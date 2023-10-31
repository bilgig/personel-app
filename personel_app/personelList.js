const apiUrl = 'http://localhost:8080/personel';

const personelForm = document.getElementById('personel-form');
personelForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Formdaki id'yi al
    const personelId = document.getElementById('personelId').value;

    // Belirli bir kişinin bilgilerini almak için GET isteği gönder
    fetch(apiUrl + '/' + personelId)
    
        .then((response) => response.json())
        .then((data) => {
            // Dönen veriyi kullanarak tabloyu güncelle
            updateTable([data]);
        })
        .catch((error) => {
            console.error('Veri alınırken bir hata oluştu: ', error);
        });
});

// Tabloyu güncelleyen işlev
function updateTable(posts) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    posts.forEach((post) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.firstName}</td>
            <td>${post.surname}</td>
            <td>${post.salary}</td>
            <td>${post.isMarried}</td>
            <td>${post.department}</td>
            <td>${post.gender}</td>
            <td>${post.birthDate}</td>
            <td>${post.body}</td>
            <td><button class="btn btn-primary delete-button" data-post-id="${post.id}">Sil</button></td>
            <td><button class="btn btn-primary update-button" data-post-id="${post.id}">Güncelle</button></td>
        `;
        tableBody.appendChild(row);
    });
}


const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const deleteId = button.getAttribute('data-post-id');
            if (confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
                // Silme işlemi için DELETE isteği gönder
                fetch(apiUrl + '/' + deleteId, {
                    mode: 'no-cors',
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



// JSON verisini API'den al
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        updateTable(data);
        // Güncelle butonuna tıklamayı dinle
        const detailButtons = document.querySelectorAll('.update-button');
        detailButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const updateId = button.getAttribute('data-post-id');
                window.location.href = `post-update.html?id=${updateId}`;

            });
        });
    })
    .catch((error) => {
        console.error('Veri alınırken bir hata oluştu: ', error);
    });