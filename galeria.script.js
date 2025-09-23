document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('img-modal');
    const downloadBtn = document.getElementById('download-btn');
    const fecharBtn = document.querySelector('.fechar-btn');
    const proximoBtn = document.querySelector('.proximo-btn');
    const anteriorBtn = document.querySelector('.anterior-btn');

    const fotos = document.querySelectorAll('.foto-item');
    let currentIndex = 0;

    if (fotos.length > 0) {
        // Função para abrir o modal
        fotos.forEach((foto, index) => {
            foto.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = foto.src;
                currentIndex = index;
                updateDownloadLink();
            });
        });

        // Função para atualizar o link de download
        function updateDownloadLink() {
            downloadBtn.href = fotos[currentIndex].src;
        }

        // Função para mostrar a próxima foto
        proximoBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % fotos.length;
            modalImg.src = fotos[currentIndex].src;
            updateDownloadLink();
        });

        // Função para mostrar a foto anterior
        anteriorBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + fotos.length) % fotos.length;
            modalImg.src = fotos[currentIndex].src;
            updateDownloadLink();
        });

        // Função para fechar o modal
        fecharBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Fechar o modal ao clicar fora da imagem
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});