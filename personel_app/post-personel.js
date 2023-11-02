const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const salary = document.getElementById('salary').value;
    
    const isMarriedInput = document.querySelector('input[name="maritalStatus"]:checked');
    const isMarried = isMarriedInput ? isMarriedInput.value === "true" : false;
    
    const department = document.getElementById('department').value;
    
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? (genderInput.value === "Kadın" ? "F" : "M") : null;
    
    const birthDate = document.getElementById('birthDate').value;
    
    fetch('http://localhost:8080/personel/save', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            surname,
            salary,
            isMarried,
            department,
            gender,
            birthDate
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Gönderi oluşturma başarısız. Durum Kodu: ' + response.status);
        }
        return response.json();
    })
    .then((json) => {
        console.log('Oluşturulan Gönderi:', json);
        alert('Gönderi başarıyla oluşturuldu!');
        postForm.reset();
    })
    .catch((error) => {
        console.error(error);
    });
});