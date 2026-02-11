// Smooth scroll for scroll-down arrow
const scrollArrow = document.querySelector('.scroll-down');
if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    document.querySelector('.editorial-grid').scrollIntoView({ behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // Ingredients one by one
  // -----------------------------
  const addBtn = document.getElementById('add-ingredient');
  const ingredientInput = document.getElementById('ingredient-input');
  const ingredientsList = document.getElementById('ingredients-list');
  const hiddenInput = document.getElementById('ingredients-hidden');
  let ingredientsArray = [];

  function updateHiddenInput() {
    hiddenInput.value = ingredientsArray.join(',');
  }

  function removeIngredient(index) {
    ingredientsArray.splice(index, 1);
    renderIngredients();
    updateHiddenInput();
  }

  function renderIngredients() {
    ingredientsList.innerHTML = '';
    ingredientsArray.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('ingredient-item');
      div.innerHTML = `${item} <button type="button" onclick="removeIngredient(${index})">x</button>`;
      ingredientsList.appendChild(div);
    });
  }

  addBtn.addEventListener('click', () => {
    const value = ingredientInput.value.trim();
    if (value) {
      ingredientsArray.push(value);
      ingredientInput.value = '';
      renderIngredients();
      updateHiddenInput();
    }
  });

  // Make removeIngredient accessible in global scope for inline onclick
  window.removeIngredient = removeIngredient;

  // -----------------------------
  // Drag & Drop Image
  // -----------------------------
  const dropZone = document.getElementById('drop-zone');
  const imageInput = document.getElementById('image-input');
  const imagePreview = document.getElementById('image-preview');

  dropZone.addEventListener('click', () => imageInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      imageInput.files = e.dataTransfer.files;
      showPreview(e.dataTransfer.files[0]);
    }
  });

  imageInput.addEventListener('change', () => {
    if (imageInput.files.length) {
      showPreview(imageInput.files[0]);
    }
  });

  function showPreview(file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = reader.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

});
