document.addEventListener('DOMContentLoaded', () => {

    //  GALERIA DE FOTOS (FASE 02) 
    const mainPhoto = document.getElementById('main-photo');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainPhoto.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
   
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }


    // REQUISITO 1: Adicionar novas UCs com prompt 
    const addUcBtn = document.getElementById('add-uc-btn');
    const ucList = document.getElementById('uc-list');

    addUcBtn.addEventListener('click', () => {
        const newUcName = prompt("Digite o nome da nova UC:");
        // Verifica se o usuário não cancelou ou deixou o campo em branco
        if (newUcName && newUcName.trim() !== '') {
            const newLi = document.createElement('li');
            // Cria o HTML do novo item da lista, já com os botões de ordenação
            newLi.innerHTML = `${newUcName.trim()} <div class="buttons"><button class="up">▲</button><button class="down">▼</button></div>`;
            ucList.appendChild(newLi);
        }
    });

    //  REQUISITO 2: Ordenação manual das UCs 
    ucList.addEventListener('click', (event) => {
        const target = event.target; // O elemento exato que foi clicado (a seta)
        const currentLi = target.closest('li'); // Encontra o item <li> "pai" da seta clicada

        if (!currentLi) return; // Se não encontrou um <li>, não faz nada

        if (target.classList.contains('up') && currentLi.previousElementSibling) {
            // Move o item para cima, trocando de lugar com o irmão anterior
            currentLi.parentElement.insertBefore(currentLi, currentLi.previousElementSibling);
        }
        else if (target.classList.contains('down') && currentLi.nextElementSibling) {
            // Move o item para baixo, trocando de lugar com o próximo irmão
            currentLi.parentElement.insertBefore(currentLi.nextElementSibling, currentLi);
        }
    });

    //  REQUISITO 3: Validar CPF 
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
       
        cpfInput.addEventListener('blur', () => {
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Expressão regular para o formato 123.456.789-00
            // Testa se o valor digitado corresponde ao formato
            if (cpfRegex.test(cpfInput.value)) {
                cpfInput.classList.remove('invalid');
                cpfInput.classList.add('valid');
            } else {
                cpfInput.classList.remove('valid');
                cpfInput.classList.add('invalid');
            }
        });
    }


    //  REQUISITO 4: Validar E-mail 
    const emailInput = document.getElementById('email');
    if(emailInput) {
        emailInput.addEventListener('blur', () => {
            // Expressão regular simples para validar o formato de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value)) {
                emailInput.classList.remove('invalid');
                emailInput.classList.add('valid');
            } else {
                emailInput.classList.remove('valid');
                emailInput.classList.add('invalid');
            }
        });
    }

    // REQUISITO 5: Adicionar novas informações ao perfil pessoal 
    const addInfoBtn = document.getElementById('add-info-btn');
    const newInfoTextarea = document.getElementById('new-personal-info');
    const descriptionContainer = document.getElementById('personal-description-container');

    if(addInfoBtn) {
        addInfoBtn.addEventListener('click', () => {
            // Pega o texto que o usuário digitou e remove espaços extras do início e do fim
            const newInfo = newInfoTextarea.value.trim();
            // Se o usuário digitou algo...
            if (newInfo) {
                // Cria um novo elemento de parágrafo (<p>)
                const newParagraph = document.createElement('p');
                // Coloca o texto digitado dentro do novo parágrafo
                newParagraph.textContent = newInfo;
                // Adiciona o novo parágrafo card "Sobre Mim"
                descriptionContainer.appendChild(newParagraph);
                // Limpa a caixa de texto para o usuário poder digitar algo novo
                newInfoTextarea.value = '';
            }
        });
    }
});