import fetchData from "./fetchData.js";

interface UsersData {
    name: string;
    action: string;
    info: string;
    src: string;
    time: string;
    message: string;
    src_picture_comment: string;
    unread: boolean
}

async function handleData() {
    const data = await fetchData < UsersData[] > ("data.json");
    if (data) {
        data.forEach((item) => {
            return showDataDOM(item);
        })
    }
}

const containerCard = document.querySelector('.card') as HTMLElement;

function showDataDOM(users: UsersData): void {
    const cardMessage = document.createElement('div');
    cardMessage.classList.add('card__box');
    // cardMessage.setAttribute('id', `${users.name}`)
    users.unread ? cardMessage.classList.add('unread') : "";
    cardMessage.innerHTML = `
        <img src="${users.src}" alt="Avatar ${users.name}" class="card__avatar">
        <div class="card__description">
            <p class="card__p">
                <strong class="card__name">${users.name}</strong><span class="card__action"> ${users.action}</span>
                <b class="card__info">${users.info}</b>
            </p>
            <p class="card__date">${users.time}</p>
        </div>
        ${users.src_picture_comment ? `<img src="${users.src_picture_comment}" alt="Avatar" class="card__avatarchess">` : ""}
    `

    containerCard.appendChild(cardMessage);

    if (users.message) {
        const boxMessage = document.createElement('div');
        boxMessage.classList.add('card__message');
        boxMessage.innerHTML = `
        <p class="card__text">${users.message}</p>`
        containerCard.appendChild(boxMessage)
    }
    unreadAll();
}

handleData();


function unreadAll() {
    const $cardsNotifications = document.querySelectorAll('.card__box') as NodeListOf < Element > ;
    const $numberNotifications = document.querySelector('.header__notifications') as HTMLSpanElement;
    const $markAllRead = document.querySelector('.header__markall') as HTMLParagraphElement;
    $markAllRead.addEventListener('click', () => {
        $cardsNotifications.forEach((element) => {
            element.classList.remove('unread');
        })
        $numberNotifications.innerHTML = `${0}`;
    })
    
    handleRead($cardsNotifications);
}

function handleRead (array: NodeListOf < Element >) {
    array.forEach(element => {
        element.addEventListener('click', read)  
    })
}

function read (e: Event) {
    const buttonTarget = e.currentTarget as HTMLElement;   
    const boxNotifications = document.querySelector('.header__notifications') as HTMLSpanElement;
    let numberRead: number = +boxNotifications.innerHTML;
    
    if (buttonTarget.classList.contains('unread')) {
        buttonTarget.classList.remove('unread');
        boxNotifications.innerHTML = `${numberRead - 1}`;
    } else {
        buttonTarget.classList.add('unread');
        boxNotifications.innerHTML = `${numberRead + 1}`;   
    }
}


const $icon = document.querySelector('.icons') as HTMLDivElement;

$icon.addEventListener('click', () => {
    const $body = document.querySelector('body') as HTMLBodyElement;
    $body.classList.toggle('dark');
    console.log($body)
})


