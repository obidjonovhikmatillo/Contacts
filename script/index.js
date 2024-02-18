
const elForm = document.querySelector('#form');
const elInputName = document.querySelector('.input-name');
const elInputRel = document.querySelector('.input-rel');
const elInputPhone = document.querySelector('.input-phone');
const elContacts = document.querySelector('#contacts');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

const saveContactsToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
};

const renderContacts = () => {
    elContacts.innerHTML = '';
    contacts.forEach(contact => {
        const checked = contact.completed ? 'checked' : '';
        const lineThrough = contact.completed ? 'text-decoration: line-through;' : '';
        elContacts.innerHTML += `
            <div class="border-2 rounded-lg bg-white border-gray-300 mb-6  w-[500px] h-32 pl-5" style="${lineThrough}">
                <div class="flex justify-between">
                    <h3 class="text-3xl text-slate-700 font-semibold pt-3 pb-2" style="${lineThrough}">${contact.name}</h3>
                    <input class="mt-4 mr-5 form-check-input" type="checkbox" ${checked} data-id="${contact.id}">
                </div>
                <p class="text-gray-600 font-medium pb-2">${contact.rel}</p>
                <p class="text-blue-500 text-xl tracking-wider">${contact.phone}</p>
            </div>`;
    });
};

elForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputName = elInputName.value;
    const inputRel = elInputRel.value;
    const inputPhone = elInputPhone.value;

    const newContact = {
        id: Date.now(),
        name: inputName,
        rel: inputRel,
        phone: inputPhone,
        completed: false
    };

    contacts.push(newContact);
    saveContactsToLocalStorage();
    renderContacts();

    elInputName.value = '';
    elInputRel.value = '';
    elInputPhone.value = '';
});

elContacts.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        const id = parseInt(e.target.dataset.id);
        contacts = contacts.map(contact =>
            contact.id === id ? { ...contact, completed: !contact.completed } : contact
        );
        saveContactsToLocalStorage();
        renderContacts();
    }
});

renderContacts();
